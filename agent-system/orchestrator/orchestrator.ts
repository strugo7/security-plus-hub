import * as fs from 'fs';
import * as path from 'path';
import pino from 'pino';
import { reviewSecurity } from '../agents/security-agent';
import { reviewScalability } from '../agents/scalability-agent';
import {
  SecurityReport,
  ScalabilityReport,
  UnifiedReport,
  SeverityBreakdown,
  Severity,
  FileEvent,
  CorrectionContext,
  AgentConfig,
} from '../types';

const logger = pino({ name: 'orchestrator' });

/** Tracks retry counts per file path */
const retryTracker: Map<string, number> = new Map();

/**
 * Counts occurrences of each severity level in a list of issues.
 * @param issues - Array of issues with a severity property
 * @returns SeverityBreakdown with counts for each level
 */
function countSeverities(issues: Array<{ severity: Severity }>): SeverityBreakdown {
  const counts: SeverityBreakdown = { passed: true, critical: 0, high: 0, medium: 0, low: 0 };
  for (const issue of issues) {
    switch (issue.severity) {
      case 'Critical':
        counts.critical++;
        break;
      case 'High':
        counts.high++;
        break;
      case 'Medium':
        counts.medium++;
        break;
      case 'Low':
        counts.low++;
        break;
    }
  }
  counts.passed = issues.length === 0;
  return counts;
}

/**
 * Determines whether any issues should trigger a block (prevent saving).
 * @param securityReport - Report from the security agent
 * @param scalabilityReport - Report from the scalability agent
 * @param blockSeverities - Severity levels that trigger blocking
 * @returns true if the file should be blocked from saving
 */
function shouldBlock(
  securityReport: SecurityReport,
  scalabilityReport: ScalabilityReport,
  blockSeverities: Severity[]
): boolean {
  const allIssues = [
    ...securityReport.issues.map((i) => i.severity),
    ...scalabilityReport.issues.map((i) => i.severity),
  ];
  return allIssues.some((s) => blockSeverities.includes(s));
}

/**
 * Generates a self-correction prompt to send back to the LLM
 * when Critical or High severity issues are found.
 * @param context - Correction context with issues and attempt info
 * @returns Formatted prompt string
 */
function buildCorrectionPrompt(context: CorrectionContext): string {
  let prompt = `The code you just generated has the following issues that must be fixed before saving:\n\n`;

  if (context.securityIssues.length > 0) {
    prompt += `[SECURITY ISSUES]\n`;
    for (const issue of context.securityIssues) {
      prompt += `- [${issue.severity}] Line ${issue.line}: ${issue.description}\n`;
      prompt += `  Principle: ${issue.principle}\n`;
      prompt += `  Fix: ${issue.fix}\n\n`;
    }
  }

  if (context.scalabilityIssues.length > 0) {
    prompt += `[SCALABILITY ISSUES]\n`;
    for (const issue of context.scalabilityIssues) {
      prompt += `- [${issue.severity}] Line ${issue.line}: ${issue.description}\n`;
      prompt += `  Principle: ${issue.principle}\n`;
      prompt += `  Fix: ${issue.fix}\n\n`;
    }
  }

  prompt += `Rewrite the code fixing all Critical and High severity issues.\n`;
  prompt += `Do not change any functionality — only fix the reported problems.\n`;
  prompt += `Reference the exact principle violated in your fix explanation.\n`;
  prompt += `Return only the corrected code, no explanation.\n`;
  prompt += `\n(Attempt ${context.attempt}/${context.maxAttempts})`;

  return prompt;
}

/**
 * Writes the unified report JSON to the agent-reports directory.
 * @param report - The unified report to write
 * @param config - Agent system configuration
 */
async function writeReport(report: UnifiedReport, config: AgentConfig): Promise<void> {
  const reportsDir = path.resolve(config.reportsDir);
  await fs.promises.mkdir(reportsDir, { recursive: true });

  const safeFileName = report.file.replace(/[^a-zA-Z0-9._-]/g, '_');
  const reportPath = path.join(reportsDir, `${safeFileName}-${Date.now()}.json`);

  await fs.promises.writeFile(reportPath, JSON.stringify(report, null, 2), 'utf-8');
  logger.info({ reportPath }, 'Report written');
}

/**
 * Appends a warning comment to the top of the file content.
 * @param content - Original file content
 * @param securityReport - Security findings
 * @param scalabilityReport - Scalability findings
 * @returns Modified content with warning header
 */
function appendWarningComment(
  content: string,
  securityReport: SecurityReport,
  scalabilityReport: ScalabilityReport
): string {
  const warnings: string[] = [];
  for (const issue of securityReport.issues) {
    warnings.push(`//   [Security/${issue.severity}] Line ${issue.line}: ${issue.description}`);
  }
  for (const issue of scalabilityReport.issues) {
    warnings.push(`//   [Scalability/${issue.severity}] Line ${issue.line}: ${issue.description}`);
  }

  const header = [
    '// ⚠️ CODE REVIEW WARNINGS — Medium/Low severity issues detected',
    `// Reviewed: ${new Date().toISOString()}`,
    ...warnings,
    '',
  ].join('\n');

  return header + content;
}

/**
 * Appends an unresolved issues header after max retries are exhausted.
 * @param content - Original file content
 * @returns Modified content with unresolved flag
 */
function appendUnresolvedHeader(content: string): string {
  const header = [
    '// ⚠️ UNRESOLVED SECURITY/SCALABILITY ISSUES',
    `// This file failed automated review after maximum retry attempts.`,
    `// Manual review required. See review-required.log for details.`,
    `// Flagged: ${new Date().toISOString()}`,
    '',
  ].join('\n');

  return header + content;
}

/**
 * Logs a file to the review-required.log when it fails after max retries.
 * @param filePath - Path to the flagged file
 * @param report - The unified report
 * @param config - Agent system configuration
 */
async function logReviewRequired(
  filePath: string,
  report: UnifiedReport,
  config: AgentConfig
): Promise<void> {
  const logPath = path.resolve(config.reviewLog);
  const entry = [
    `[${new Date().toISOString()}] REVIEW REQUIRED: ${filePath}`,
    `  Security: ${report.security.critical} critical, ${report.security.high} high, ${report.security.medium} medium, ${report.security.low} low`,
    `  Scalability: ${report.scalability.critical} critical, ${report.scalability.high} high, ${report.scalability.medium} medium, ${report.scalability.low} low`,
    `  Decision: ${report.decision}`,
    '',
  ].join('\n');

  await fs.promises.appendFile(logPath, entry, 'utf-8');
  logger.warn({ filePath }, 'File added to review-required.log');
}

/**
 * Main orchestrator function. Receives a file event, runs both agents in parallel,
 * applies decision logic, and handles the save/block/retry flow.
 *
 * @param event - File event from the watcher containing path, content, and metadata
 * @param config - Agent system configuration
 * @returns Object with the unified report and the correction prompt (if blocking)
 */
export async function orchestrate(
  event: FileEvent,
  config: AgentConfig
): Promise<{ report: UnifiedReport; correctionPrompt: string | null; saved: boolean }> {
  const { filePath, content } = event;
  const currentRetry = retryTracker.get(filePath) || 0;

  logger.info({ file: filePath, attempt: currentRetry + 1 }, 'Orchestrator processing file');

  // Run both agents in parallel
  const [securityReport, scalabilityReport] = await Promise.all([
    reviewSecurity(filePath, content),
    reviewScalability(filePath, content),
  ]);

  // Build severity breakdowns
  const securityBreakdown = countSeverities(securityReport.issues);
  const scalabilityBreakdown = countSeverities(scalabilityReport.issues);

  // Determine decision
  const hasBlockingIssues = shouldBlock(securityReport, scalabilityReport, config.blockSeverities);
  const hasAnyIssues = securityReport.issues.length > 0 || scalabilityReport.issues.length > 0;
  const maxRetriesReached = currentRetry >= config.maxRetries;

  let decision: string;
  let correctionPrompt: string | null = null;
  let saved = false;

  if (hasBlockingIssues && !maxRetriesReached) {
    // BLOCK — send back for self-correction
    const newRetry = currentRetry + 1;
    retryTracker.set(filePath, newRetry);

    decision = `BLOCK — sent to LLM for self-correction (attempt ${newRetry}/${config.maxRetries})`;

    correctionPrompt = buildCorrectionPrompt({
      securityIssues: securityReport.issues,
      scalabilityIssues: scalabilityReport.issues,
      attempt: newRetry,
      maxAttempts: config.maxRetries,
    });

    logger.warn({ file: filePath, attempt: newRetry }, 'File blocked — correction required');
  } else if (hasBlockingIssues && maxRetriesReached) {
    // MAX RETRIES REACHED — save with unresolved header and log
    decision = `FORCE SAVE — max retries (${config.maxRetries}) exhausted. Manual review required.`;

    const flaggedContent = appendUnresolvedHeader(content);
    await fs.promises.writeFile(filePath, flaggedContent, 'utf-8');

    retryTracker.delete(filePath);
    saved = true;

    logger.error({ file: filePath }, 'Max retries reached — file saved with unresolved flag');
  } else if (hasAnyIssues) {
    // WARN — save with warning comments
    decision = `PASS WITH WARNINGS — ${securityReport.issues.length + scalabilityReport.issues.length} medium/low issues noted`;

    const warnedContent = appendWarningComment(content, securityReport, scalabilityReport);
    await fs.promises.writeFile(filePath, warnedContent, 'utf-8');

    retryTracker.delete(filePath);
    saved = true;

    logger.info({ file: filePath }, 'File saved with warning comments');
  } else {
    // CLEAN PASS — save immediately
    decision = 'PASS — no issues found';

    await fs.promises.writeFile(filePath, content, 'utf-8');

    retryTracker.delete(filePath);
    saved = true;

    logger.info({ file: filePath }, '✅ File passed all checks — saved');
  }

  // Build unified report
  const report: UnifiedReport = {
    file: path.basename(filePath),
    timestamp: new Date().toISOString(),
    security: securityBreakdown,
    scalability: scalabilityBreakdown,
    decision,
    retries: retryTracker.get(filePath) || 0,
  };

  // Write report to agent-reports directory
  await writeReport(report, config);

  // Log to review-required.log if max retries were exhausted
  if (hasBlockingIssues && maxRetriesReached) {
    await logReviewRequired(filePath, report, config);
  }

  return { report, correctionPrompt, saved };
}

/**
 * Resets the retry counter for a specific file.
 * Used when a file is successfully corrected.
 * @param filePath - Path to the file
 */
export function resetRetryCounter(filePath: string): void {
  retryTracker.delete(filePath);
}

/**
 * Gets the current retry count for a file.
 * @param filePath - Path to the file
 * @returns Current retry count (0 if not tracked)
 */
export function getRetryCount(filePath: string): number {
  return retryTracker.get(filePath) || 0;
}
