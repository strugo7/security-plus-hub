import * as chokidar from 'chokidar';
import * as fs from 'fs';
import * as path from 'path';
import pino from 'pino';
import { FileEvent, AgentConfig } from '../types';
import { orchestrate } from '../orchestrator/orchestrator';

const logger = pino({ name: 'file-watcher' });

/** Debounce timers keyed by file path */
const debounceTimers: Map<string, NodeJS.Timeout> = new Map();

/** Tracks watcher status for the /health endpoint */
let watcherStatus: 'starting' | 'ready' | 'error' | 'closed' = 'starting';
let filesProcessed = 0;
let lastEventTimestamp: string | null = null;

/**
 * Returns the current status of the file watcher.
 * Used by the /health endpoint to report system state.
 * @returns Object with watcher status, file count, and last event timestamp
 */
export function getWatcherStatus(): {
  status: string;
  filesProcessed: number;
  lastEventTimestamp: string | null;
} {
  return {
    status: watcherStatus,
    filesProcessed,
    lastEventTimestamp,
  };
}

/**
 * Handles a file event by reading its content and passing it to the orchestrator.
 * Applies debouncing to avoid processing rapid successive saves.
 *
 * @param eventType - The type of change ('add' or 'change')
 * @param filePath - Absolute path to the changed file
 * @param config - Agent system configuration
 */
function handleFileEvent(eventType: string, filePath: string, config: AgentConfig): void {
  // Clear any existing debounce timer for this file
  const existing = debounceTimers.get(filePath);
  if (existing) {
    clearTimeout(existing);
  }

  // Set new debounce timer
  const timer = setTimeout(async () => {
    debounceTimers.delete(filePath);

    const triggerType: 'new file' | 'modified' = eventType === 'add' ? 'new file' : 'modified';
    const timestamp = new Date().toISOString();

    logger.info({
      file: path.basename(filePath),
      triggerType,
      timestamp,
    }, `File ${triggerType}: ${path.basename(filePath)}`);

    try {
      const content = await fs.promises.readFile(filePath, 'utf-8');

      const event: FileEvent = {
        filePath,
        content,
        triggerType,
        timestamp,
      };

      const result = await orchestrate(event, config);

      filesProcessed++;
      lastEventTimestamp = timestamp;

      if (result.correctionPrompt) {
        logger.warn({
          file: path.basename(filePath),
          decision: result.report.decision,
        }, 'Self-correction prompt generated — awaiting LLM fix');

        // In a full integration, this prompt would be sent back to the LLM.
        // For now, log it for visibility.
        logger.info({ correctionPrompt: result.correctionPrompt }, 'Correction prompt');
      } else {
        logger.info({
          file: path.basename(filePath),
          decision: result.report.decision,
          saved: result.saved,
        }, 'File processing complete');
      }
    } catch (error) {
      logger.error({ file: filePath, error }, 'Error processing file event');
    }
  }, config.debounceMs);

  debounceTimers.set(filePath, timer);
}

/**
 * Starts the file watcher on the configured directory.
 * Monitors .ts, .tsx, .js, .jsx files recursively, ignoring
 * node_modules, .git, dist, and build folders.
 *
 * @param config - Agent system configuration
 * @returns The chokidar FSWatcher instance
 */
export function startWatcher(config: AgentConfig): chokidar.FSWatcher {
  const watchPath = path.resolve(config.watchPath);

  logger.info({ watchPath }, 'Starting file watcher');

  const watcher = chokidar.watch(watchPath, {
    ignored: [
      '**/node_modules/**',
      '**/.git/**',
      '**/dist/**',
      '**/build/**',
      '**/agent-reports/**',
    ],
    persistent: true,
    ignoreInitial: true,
    awaitWriteFinish: {
      stabilityThreshold: 200,
      pollInterval: 100,
    },
  });

  // Filter for supported file extensions
  const supportedExtensions = ['.ts', '.tsx', '.js', '.jsx'];

  watcher.on('add', (filePath: string) => {
    const ext = path.extname(filePath);
    if (supportedExtensions.includes(ext)) {
      handleFileEvent('add', filePath, config);
    }
  });

  watcher.on('change', (filePath: string) => {
    const ext = path.extname(filePath);
    if (supportedExtensions.includes(ext)) {
      handleFileEvent('change', filePath, config);
    }
  });

  watcher.on('ready', () => {
    watcherStatus = 'ready';
    logger.info('File watcher ready and listening for changes');
  });

  watcher.on('error', (error: Error) => {
    watcherStatus = 'error';
    logger.error({ error }, 'File watcher error');
  });

  return watcher;
}

/**
 * Stops the file watcher and cleans up debounce timers.
 * @param watcher - The chokidar FSWatcher instance to close
 */
export async function stopWatcher(watcher: chokidar.FSWatcher): Promise<void> {
  watcherStatus = 'closed';

  // Clear all debounce timers
  for (const timer of debounceTimers.values()) {
    clearTimeout(timer);
  }
  debounceTimers.clear();

  await watcher.close();
  logger.info('File watcher stopped');
}
