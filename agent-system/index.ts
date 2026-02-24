import * as dotenv from 'dotenv';
import * as path from 'path';
import express from 'express';
import pino from 'pino';
import { startWatcher, stopWatcher, getWatcherStatus } from './watcher/file-watcher';
import { AgentConfig, Severity } from './types';

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '.env') });

const logger = pino({
  name: 'agent-system',
  level: process.env.LOG_LEVEL || 'info',
});

/**
 * Loads and validates configuration from environment variables.
 * @returns AgentConfig with all settings resolved from .env
 */
function loadConfig(): AgentConfig {
  return {
    watchPath: process.env.WATCH_PATH || '../src',
    maxRetries: parseInt(process.env.MAX_RETRIES || '3', 10),
    debounceMs: parseInt(process.env.DEBOUNCE_MS || '500', 10),
    blockSeverities: (process.env.BLOCK_SEVERITIES || 'Critical,High').split(',') as Severity[],
    healthPort: parseInt(process.env.HEALTH_PORT || '4200', 10),
    reportsDir: process.env.REPORTS_DIR || './agent-reports',
    reviewLog: process.env.REVIEW_LOG || './review-required.log',
    logLevel: process.env.LOG_LEVEL || 'info',
  };
}

/**
 * Creates and starts the Express health endpoint server.
 * Reports watcher status and agent availability.
 *
 * @param config - Agent system configuration
 * @returns The Express server instance
 */
function startHealthServer(config: AgentConfig) {
  const app = express();

  app.get('/health', (_req, res) => {
    const watcherInfo = getWatcherStatus();

    const healthResponse = {
      status: 'ok',
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
      watcher: watcherInfo,
      agents: {
        security: { available: true, name: 'Security Reviewer (10 principles)' },
        scalability: { available: true, name: 'Scalability Reviewer (10 principles)' },
      },
      config: {
        watchPath: config.watchPath,
        maxRetries: config.maxRetries,
        debounceMs: config.debounceMs,
        blockSeverities: config.blockSeverities,
      },
    };

    res.json(healthResponse);
  });

  const server = app.listen(config.healthPort, () => {
    logger.info({ port: config.healthPort }, `Health endpoint available at http://localhost:${config.healthPort}/health`);
  });

  return server;
}

/**
 * Entry point: loads config, starts the health server and file watcher.
 * Handles graceful shutdown on SIGINT/SIGTERM.
 */
async function main(): Promise<void> {
  logger.info('=== Agent System Starting ===');

  const config = loadConfig();

  logger.info({
    watchPath: path.resolve(config.watchPath),
    maxRetries: config.maxRetries,
    debounceMs: config.debounceMs,
    blockSeverities: config.blockSeverities,
  }, 'Configuration loaded');

  // Start health endpoint
  const server = startHealthServer(config);

  // Start file watcher
  const watcher = startWatcher(config);

  // Graceful shutdown
  const shutdown = async (signal: string) => {
    logger.info({ signal }, 'Shutdown signal received — cleaning up');

    await stopWatcher(watcher);
    server.close();

    logger.info('Agent system shut down gracefully');
    process.exit(0);
  };

  process.on('SIGINT', () => shutdown('SIGINT'));
  process.on('SIGTERM', () => shutdown('SIGTERM'));

  logger.info('=== Agent System Ready ===');
  logger.info('Watching for file changes... Press Ctrl+C to stop.');
}

main().catch((error) => {
  logger.fatal({ error }, 'Failed to start agent system');
  process.exit(1);
});
