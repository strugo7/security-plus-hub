import { ScalabilityReport, ScalabilityIssue, Severity, Impact } from '../types';
import pino from 'pino';

const logger = pino({ name: 'scalability-agent' });

/** Pattern definition for scalability checks */
interface ScalabilityPattern {
  pattern: RegExp;
  principle: string;
  impact: Impact;
  severity: Severity;
  description: string;
  fix: string;
}

/**
 * Patterns that detect in-memory state breaking horizontal scaling.
 * Principle 1: Design Stateless Services.
 */
const STATELESS_PATTERNS: ScalabilityPattern[] = [
  {
    pattern: /(?:let|var|const)\s+\w+\s*=\s*(?:new\s+Map|new\s+Set|\{\}|\[\])\s*;?\s*(?:\/\/.*(?:cache|store|session|state))?/gi,
    principle: '1. Design Stateless Services',
    impact: 'Scalability',
    severity: 'High',
    description: 'Module-level mutable state detected — breaks horizontal scaling',
    fix: 'Move state to an external store (Redis, database). Ensure no in-memory state is shared between requests.',
  },
  {
    pattern: /global\.\w+\s*=/g,
    principle: '1. Design Stateless Services',
    impact: 'Scalability',
    severity: 'Critical',
    description: 'Global state assignment detected — prevents stateless scaling',
    fix: 'Remove global state. Use Redis or a database for shared state across instances.',
  },
  {
    pattern: /(?:req|request)\.session\.\w+\s*=/g,
    principle: '1. Design Stateless Services',
    impact: 'Scalability',
    severity: 'Medium',
    description: 'In-memory session state being set — will not persist across instances',
    fix: 'Use a Redis session store (connect-redis) so sessions work behind a load balancer.',
  },
];

/**
 * Patterns for database optimization issues.
 * Principle 2: Database Optimization.
 */
const DB_PATTERNS: ScalabilityPattern[] = [
  {
    pattern: /\.find(?:All|Many)?\s*\(\s*\)\s*\.then\s*\([^)]*=>\s*[^)]*\.map/gs,
    principle: '2. Database Optimization',
    impact: 'Performance',
    severity: 'High',
    description: 'Potential N+1 query — fetching all records then mapping over them',
    fix: 'Use eager loading (include/populate), batch queries, or database JOINs to avoid N+1.',
  },
  {
    pattern: /for\s*\([^)]*\)\s*\{[^}]*(?:await\s+)?(?:\w+\.(?:find|query|select|update|delete))/gs,
    principle: '2. Database Optimization',
    impact: 'Performance',
    severity: 'High',
    description: 'Database query inside a loop — likely N+1 pattern',
    fix: 'Batch database operations. Use WHERE IN, bulk operations, or eager loading instead of querying per iteration.',
  },
  {
    pattern: /createConnection\s*\(/g,
    principle: '2. Database Optimization',
    impact: 'Performance',
    severity: 'Medium',
    description: 'Direct connection creation without pooling detected',
    fix: 'Use connection pooling (createPool) with appropriate max pool size for expected load.',
  },
];

/**
 * Patterns for synchronous/blocking I/O.
 * Principle 3: Async & Non-Blocking Code.
 */
const ASYNC_PATTERNS: ScalabilityPattern[] = [
  {
    pattern: /fs\.(?:readFileSync|writeFileSync|appendFileSync|mkdirSync|readdirSync|statSync|existsSync|unlinkSync|copyFileSync|renameSync)/g,
    principle: '3. Async & Non-Blocking Code',
    impact: 'Performance',
    severity: 'High',
    description: 'Synchronous filesystem operation — blocks the event loop',
    fix: 'Replace with fs.promises equivalent (e.g., fs.promises.readFile) and await the result.',
  },
  {
    pattern: /child_process\.(?:execSync|spawnSync)/g,
    principle: '3. Async & Non-Blocking Code',
    impact: 'Performance',
    severity: 'High',
    description: 'Synchronous child process execution — blocks the event loop',
    fix: 'Replace with async child_process.exec or child_process.spawn with promise wrapper.',
  },
  {
    pattern: /\.(?:forEach|map)\s*\(\s*async/g,
    principle: '3. Async & Non-Blocking Code',
    impact: 'Reliability',
    severity: 'Medium',
    description: 'Async callback in forEach/map — promises are not awaited',
    fix: 'Use Promise.all(array.map(async ...)) or for...of with await for sequential processing.',
  },
  {
    pattern: /while\s*\(\s*true\s*\)/g,
    principle: '3. Async & Non-Blocking Code',
    impact: 'Performance',
    severity: 'High',
    description: 'Infinite loop detected — will block the event loop',
    fix: 'Use event-driven patterns, setInterval, or worker threads for long-running loops.',
  },
];

/**
 * Patterns for missing rate limiting.
 * Principle 4: Rate Limiting & Throttling.
 */
const RATE_LIMIT_PATTERNS: ScalabilityPattern[] = [
  {
    pattern: /app\.(?:post|put|patch|delete)\s*\(\s*['"]\/(?:auth|login|register|signup|reset)/g,
    principle: '4. Rate Limiting & Throttling',
    impact: 'Reliability',
    severity: 'High',
    description: 'Authentication endpoint without visible rate limiting',
    fix: 'Add express-rate-limit with strict limits on auth endpoints (e.g., 5 requests per 15 minutes). Return 429 with Retry-After header.',
  },
];

/**
 * Patterns for missing caching.
 * Principle 5: Caching Strategy.
 */
const CACHE_PATTERNS: ScalabilityPattern[] = [
  {
    pattern: /app\.get\s*\([^)]+(?:req|request)\s*,\s*(?:res|response)[^}]*(?:\.find|\.query|\.select|\.aggregate)/gs,
    principle: '5. Caching Strategy',
    impact: 'Performance',
    severity: 'Medium',
    description: 'GET endpoint performs database query without caching',
    fix: 'Add a Redis caching layer with appropriate TTL. Use cache-aside pattern with invalidation on writes.',
  },
];

/**
 * Patterns for heavy tasks running in-request.
 * Principle 6: Queue Heavy Tasks.
 */
const QUEUE_PATTERNS: ScalabilityPattern[] = [
  {
    pattern: /(?:sendMail|sendEmail|transporter\.send|sgMail\.send)/g,
    principle: '6. Queue Heavy Tasks',
    impact: 'Performance',
    severity: 'Medium',
    description: 'Email sending executed within request handler — should be queued',
    fix: 'Offload to a background job queue (BullMQ/RabbitMQ). Return a job ID immediately and process async.',
  },
  {
    pattern: /(?:sharp|jimp|gm|imagemagick|canvas)\s*\(/g,
    principle: '6. Queue Heavy Tasks',
    impact: 'Performance',
    severity: 'Medium',
    description: 'Image processing in request handler — CPU-intensive task should be queued',
    fix: 'Move image processing to a background worker. Return a job ID and provide a status polling endpoint.',
  },
  {
    pattern: /(?:createReport|generatePDF|generateCSV|exportData)/g,
    principle: '6. Queue Heavy Tasks',
    impact: 'Performance',
    severity: 'Medium',
    description: 'Report generation in request handler — should be a background job',
    fix: 'Offload report generation to a background queue with retry logic and dead-letter queue.',
  },
];

/**
 * Patterns for missing health check and containerization readiness.
 * Principle 7: Horizontal Scalability Mindset.
 */
const HORIZONTAL_PATTERNS: ScalabilityPattern[] = [
  {
    pattern: /app\.listen\s*\(/g,
    principle: '7. Horizontal Scalability Mindset',
    impact: 'Scalability',
    severity: 'Low',
    description: 'Server startup detected — verify a /health endpoint exists',
    fix: 'Add a GET /health endpoint returning { status: "ok" } for load balancer health checks.',
  },
];

/**
 * Patterns for missing resilience patterns.
 * Principle 8: Graceful Error Handling Under Load.
 */
const RESILIENCE_PATTERNS: ScalabilityPattern[] = [
  {
    pattern: /(?:axios|fetch|got|superagent|node-fetch)\s*(?:\.\w+)?\s*\(/g,
    principle: '8. Graceful Error Handling Under Load',
    impact: 'Reliability',
    severity: 'Medium',
    description: 'External HTTP call without visible timeout or retry logic',
    fix: 'Add timeout limits, retry with exponential backoff and jitter (max 3 retries), and circuit breaker logic.',
  },
];

/**
 * Patterns for missing observability.
 * Principle 9: Monitor & Observe Early.
 */
const OBSERVABILITY_PATTERNS: ScalabilityPattern[] = [
  {
    pattern: /console\.(log|error|warn|info|debug)\s*\(/g,
    principle: '9. Monitor & Observe Early',
    impact: 'Observability',
    severity: 'Low',
    description: 'Using console.log instead of structured logging',
    fix: 'Replace with structured JSON logging using Pino or Winston. Include request ID, timestamp, level, and context.',
  },
];

/** All scalability patterns combined */
const ALL_PATTERNS: ScalabilityPattern[] = [
  ...STATELESS_PATTERNS,
  ...DB_PATTERNS,
  ...ASYNC_PATTERNS,
  ...RATE_LIMIT_PATTERNS,
  ...CACHE_PATTERNS,
  ...QUEUE_PATTERNS,
  ...HORIZONTAL_PATTERNS,
  ...RESILIENCE_PATTERNS,
  ...OBSERVABILITY_PATTERNS,
];

/**
 * Finds the 1-based line number where a regex match occurs in the source.
 * @param content - Full file content
 * @param matchIndex - Character index of the match
 * @returns 1-based line number
 */
function getLineNumber(content: string, matchIndex: number): number {
  return content.substring(0, matchIndex).split('\n').length;
}

/**
 * Scans file content for all matches of a regex pattern.
 * @param content - Full file content
 * @param pattern - RegExp to match against
 * @returns Array of { index, match } for each occurrence
 */
function findAllMatches(content: string, pattern: RegExp): Array<{ index: number; match: string }> {
  const results: Array<{ index: number; match: string }> = [];
  const regex = new RegExp(pattern.source, pattern.flags);
  let match: RegExpExecArray | null;
  while ((match = regex.exec(content)) !== null) {
    results.push({ index: match.index, match: match[0] });
  }
  return results;
}

/**
 * Checks if the file is a server/route file (for context-aware checks).
 * @param content - Full file content
 * @returns true if file contains Express or HTTP handler patterns
 */
function isServerFile(content: string): boolean {
  return /(?:express\(\)|createServer|app\.(?:get|post|put|delete|use|listen)|router\.(?:get|post|put|delete))/g.test(content);
}

/**
 * Agent 2: Scalability Reviewer.
 * Analyzes source code against the 10 scalability principles from the vibe-coding guide.
 * Returns a structured ScalabilityReport with all identified issues.
 *
 * @param filePath - Path to the file being analyzed
 * @param content - Full source code content of the file
 * @returns ScalabilityReport with findings
 */
export async function reviewScalability(filePath: string, content: string): Promise<ScalabilityReport> {
  const issues: ScalabilityIssue[] = [];
  const fileName = filePath.split('/').pop() || filePath;

  logger.info({ file: fileName }, 'Starting scalability review');

  for (const def of ALL_PATTERNS) {
    // Skip server-specific checks for non-server files
    if (
      (def.principle.includes('Rate Limiting') ||
        def.principle.includes('Caching') ||
        def.principle.includes('Horizontal')) &&
      !isServerFile(content)
    ) {
      continue;
    }

    const matches = findAllMatches(content, def.pattern);
    for (const m of matches) {
      issues.push({
        principle: def.principle,
        impact: def.impact,
        severity: def.severity,
        line: getLineNumber(content, m.index),
        description: `${def.description}: "${m.match.substring(0, 60)}"`,
        fix: def.fix,
      });
    }
  }

  // Principle 4: Check for rate limiting presence in server files
  if (isServerFile(content)) {
    const hasRateLimiter = /rateLimit|rateLimiter|express-rate-limit|rate_limit/i.test(content);
    const hasRoutes = /app\.(?:get|post|put|delete)\s*\(/g.test(content);
    if (hasRoutes && !hasRateLimiter) {
      issues.push({
        principle: '4. Rate Limiting & Throttling',
        impact: 'Reliability',
        severity: 'Medium',
        line: 1,
        description: 'No rate limiting middleware detected in server file with routes',
        fix: 'Add express-rate-limit middleware with appropriate limits per endpoint. Stricter limits on auth routes.',
      });
    }
  }

  // Principle 7: Check for health endpoint in server files
  if (isServerFile(content)) {
    const hasHealthEndpoint = /['"]\/health['"]/i.test(content);
    const hasListen = /app\.listen\s*\(/g.test(content);
    if (hasListen && !hasHealthEndpoint) {
      issues.push({
        principle: '7. Horizontal Scalability Mindset',
        impact: 'Scalability',
        severity: 'Medium',
        line: 1,
        description: 'Server file without /health endpoint — needed for load balancer checks',
        fix: 'Add a GET /health endpoint returning { status: "ok", uptime, timestamp } for Docker/LB health checks.',
      });
    }
  }

  const passed = issues.length === 0;
  logger.info({ file: fileName, passed, issueCount: issues.length }, 'Scalability review complete');

  return {
    agent: 'scalability',
    file: fileName,
    issues,
    passed,
  };
}
