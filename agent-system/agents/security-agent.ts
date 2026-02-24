import { SecurityReport, SecurityIssue, Severity } from '../types';
import pino from 'pino';

const logger = pino({ name: 'security-agent' });

/**
 * Regex patterns for detecting hardcoded secrets.
 * Matches common patterns like API keys, tokens, passwords assigned as string literals.
 */
const SECRET_PATTERNS: Array<{ pattern: RegExp; label: string }> = [
  { pattern: /(?:api[_-]?key|apikey)\s*[:=]\s*['"][^'"]{8,}['"]/gi, label: 'API key' },
  { pattern: /(?:secret|token|password|passwd|pwd)\s*[:=]\s*['"][^'"]{4,}['"]/gi, label: 'secret/token/password' },
  { pattern: /(?:AWS_ACCESS_KEY_ID|AWS_SECRET_ACCESS_KEY)\s*[:=]\s*['"][^'"]+['"]/gi, label: 'AWS credential' },
  { pattern: /(?:PRIVATE_KEY|private_key)\s*[:=]\s*['"][^'"]+['"]/gi, label: 'private key' },
  { pattern: /Bearer\s+[A-Za-z0-9\-._~+\/]{20,}/g, label: 'Bearer token' },
  { pattern: /(?:mongodb\+srv|postgres|mysql):\/\/[^'")\s]+/gi, label: 'database connection string' },
];

/**
 * Patterns indicating missing input validation / sanitization vulnerabilities.
 */
const INPUT_VALIDATION_PATTERNS: Array<{ pattern: RegExp; label: string; severity: Severity }> = [
  { pattern: /req\.(?:body|query|params)\.[a-zA-Z_]+(?!\s*\?\s*\.\s*trim)/g, label: 'Unvalidated request input used directly', severity: 'High' },
  { pattern: /innerHTML\s*=\s*(?!['"]<)/g, label: 'Direct innerHTML assignment (potential XSS)', severity: 'Critical' },
  { pattern: /\$\{.*req\.(?:body|query|params)/g, label: 'Template literal with unsanitized user input (potential SQL injection/XSS)', severity: 'Critical' },
  { pattern: /eval\s*\(/g, label: 'Use of eval() — code injection risk', severity: 'Critical' },
  { pattern: /dangerouslySetInnerHTML/g, label: 'dangerouslySetInnerHTML usage (potential XSS)', severity: 'High' },
  { pattern: /document\.write\s*\(/g, label: 'document.write usage (potential XSS)', severity: 'High' },
  { pattern: /\.query\s*\(\s*['"`].*\$\{/g, label: 'String interpolation in SQL query (SQL injection risk)', severity: 'Critical' },
  { pattern: /\.query\s*\(\s*['"`].*\+\s*/g, label: 'String concatenation in SQL query (SQL injection risk)', severity: 'Critical' },
];

/**
 * Patterns for auth/authz mixing and other security concerns.
 */
const AUTH_PATTERNS: Array<{ pattern: RegExp; label: string; severity: Severity; principle: string }> = [
  {
    pattern: /(?:isAuthenticated|isLoggedIn|verifyToken).*(?:isAdmin|hasRole|canAccess|isAuthorized)/g,
    label: 'Authentication and authorization checks mixed in the same function',
    severity: 'Medium',
    principle: '7. Authentication & Authorization Separation',
  },
];

/**
 * Patterns for error handling that leaks information.
 */
const ERROR_LEAK_PATTERNS: Array<{ pattern: RegExp; label: string; severity: Severity }> = [
  { pattern: /res\.(?:json|send)\s*\(\s*(?:err|error)(?:\s*\)|\.message|\.stack)/g, label: 'Error details sent directly to client', severity: 'High' },
  { pattern: /catch\s*\(\s*\w+\s*\)\s*\{[^}]*res\.status\(\d+\)\.(?:json|send)\(\s*\{[^}]*(?:stack|trace|message:\s*\w+\.message)/gs, label: 'Stack trace or internal error message exposed in response', severity: 'High' },
  { pattern: /console\.\w+\(.*(?:password|secret|token|key)/gi, label: 'Sensitive data logged to console', severity: 'Medium' },
];

/**
 * Patterns for missing security headers.
 */
const HEADER_PATTERNS: Array<{ pattern: RegExp; present: boolean; label: string; severity: Severity }> = [
  { pattern: /helmet\s*\(/g, present: false, label: 'No helmet middleware detected — missing security headers', severity: 'Medium' },
  { pattern: /cors\s*\(\s*\)/g, present: true, label: 'CORS configured with no restrictions (open to all origins)', severity: 'Medium' },
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
 * Scans file content for all matches of a regex pattern and returns match details.
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
 * Checks if the file appears to be an Express/HTTP server file
 * (used for context-aware checks like helmet/CORS).
 * @param content - Full file content
 * @returns true if the file contains Express or HTTP server patterns
 */
function isServerFile(content: string): boolean {
  return /(?:express\(\)|createServer|app\.(?:get|post|put|delete|use|listen))/g.test(content);
}

/**
 * Agent 1: Security Reviewer.
 * Analyzes source code against the 10 security principles from the vibe-coding guide.
 * Returns a structured SecurityReport with all identified issues.
 *
 * @param filePath - Path to the file being analyzed
 * @param content - Full source code content of the file
 * @returns SecurityReport with findings
 */
export async function reviewSecurity(filePath: string, content: string): Promise<SecurityReport> {
  const issues: SecurityIssue[] = [];
  const fileName = filePath.split('/').pop() || filePath;

  logger.info({ file: fileName }, 'Starting security review');

  // Principle 2: Secrets Management — detect hardcoded secrets
  for (const { pattern, label } of SECRET_PATTERNS) {
    const matches = findAllMatches(content, pattern);
    for (const m of matches) {
      issues.push({
        principle: '2. Secrets Management',
        severity: 'Critical',
        line: getLineNumber(content, m.index),
        description: `Hardcoded ${label} detected: "${m.match.substring(0, 40)}..."`,
        fix: 'Move to process.env and add to .env.example. Ensure .env is in .gitignore.',
      });
    }
  }

  // Principle 3: Input Validation & Sanitization — detect unvalidated inputs
  for (const { pattern, label, severity } of INPUT_VALIDATION_PATTERNS) {
    const matches = findAllMatches(content, pattern);
    for (const m of matches) {
      issues.push({
        principle: '3. Input Validation & Sanitization',
        severity,
        line: getLineNumber(content, m.index),
        description: `${label}: "${m.match.substring(0, 60)}"`,
        fix: 'Validate and sanitize all user inputs using zod, joi, or express-validator. Prevent XSS and SQL injection.',
      });
    }
  }

  // Principle 4: Least Privilege — detect overprivileged patterns
  const adminPatterns = findAllMatches(content, /(?:role|permission)\s*[:=]\s*['"](?:admin|superadmin|root)['"]/gi);
  for (const m of adminPatterns) {
    issues.push({
      principle: '4. Principle of Least Privilege',
      severity: 'Medium',
      line: getLineNumber(content, m.index),
      description: `Overprivileged role assignment detected: "${m.match}"`,
      fix: 'Use scoped, minimal permissions. Replace admin-level access with role-specific scoped permissions.',
    });
  }

  // Principle 5: Dependency Awareness — detect require/import of risky patterns
  const wildcardImports = findAllMatches(content, /require\s*\(\s*['"][^'"]*['"]\s*\)/g);
  // We flag dynamic requires as they can load arbitrary modules
  const dynamicRequires = findAllMatches(content, /require\s*\(\s*(?!['"])[^)]+\)/g);
  for (const m of dynamicRequires) {
    issues.push({
      principle: '5. Dependency Awareness',
      severity: 'High',
      line: getLineNumber(content, m.index),
      description: `Dynamic require detected — can load arbitrary modules: "${m.match}"`,
      fix: 'Use static imports only. If dynamic loading is needed, whitelist allowed module names.',
    });
  }

  // Principle 7: Auth & Authz Separation
  for (const { pattern, label, severity, principle } of AUTH_PATTERNS) {
    const matches = findAllMatches(content, pattern);
    for (const m of matches) {
      issues.push({
        principle,
        severity,
        line: getLineNumber(content, m.index),
        description: label,
        fix: 'Separate authentication (who you are) and authorization (what you can do) into distinct middleware layers.',
      });
    }
  }

  // Principle 8: Error Handling Without Information Leakage
  for (const { pattern, label, severity } of ERROR_LEAK_PATTERNS) {
    const matches = findAllMatches(content, pattern);
    for (const m of matches) {
      issues.push({
        principle: '8. Error Handling Without Information Leakage',
        severity,
        line: getLineNumber(content, m.index),
        description: `${label}: "${m.match.substring(0, 60)}"`,
        fix: 'Return a generic error message with a unique error ID to the client. Log full details server-side only.',
      });
    }
  }

  // Principle 9: HTTPS & Secure Headers — only check in server files
  if (isServerFile(content)) {
    for (const { pattern, present, label, severity } of HEADER_PATTERNS) {
      const matches = findAllMatches(content, pattern);
      if (present && matches.length > 0) {
        // Pattern found but shouldn't be (e.g., open CORS)
        for (const m of matches) {
          issues.push({
            principle: '9. HTTPS & Secure Headers',
            severity,
            line: getLineNumber(content, m.index),
            description: label,
            fix: 'Configure CORS to allow only trusted origins. Use helmet() for security headers. Enforce HTTPS.',
          });
        }
      } else if (!present && matches.length === 0) {
        // Pattern not found but should be (e.g., no helmet)
        issues.push({
          principle: '9. HTTPS & Secure Headers',
          severity,
          line: 1,
          description: label,
          fix: 'Add helmet middleware: app.use(helmet()). Configure Content-Security-Policy, X-Frame-Options, etc.',
        });
      }
    }
  }

  // Principle 10 / OWASP: detect CSRF vulnerability patterns
  const csrfPatterns = findAllMatches(content, /app\.(?:post|put|patch|delete)\s*\(/g);
  if (csrfPatterns.length > 0) {
    const hasCsrf = /csrf|csurf|csrfProtection/i.test(content);
    if (!hasCsrf && isServerFile(content)) {
      issues.push({
        principle: '10. Shift-Left Security Reviews (OWASP)',
        severity: 'Medium',
        line: csrfPatterns[0] ? getLineNumber(content, csrfPatterns[0].index) : 1,
        description: 'State-changing HTTP endpoints detected without CSRF protection',
        fix: 'Add CSRF protection middleware (e.g., csurf) to all POST/PUT/PATCH/DELETE routes.',
      });
    }
  }

  const passed = issues.length === 0;
  logger.info({ file: fileName, passed, issueCount: issues.length }, 'Security review complete');

  return {
    agent: 'security',
    file: fileName,
    issues,
    passed,
  };
}
