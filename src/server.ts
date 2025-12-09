import app from './app.js';
import { env, isDev } from './config/index.js';
import { logger } from './utils/index.js';

const server = app.listen(env.PORT, () => {
  logger.info(`🚀 Server running on port ${env.PORT} in ${env.NODE_ENV} mode`);
  logger.info(`📍 API available at http://localhost:${env.PORT}${env.API_PREFIX}`);
  
  if (isDev) {
    logger.info(`🏥 Health check: http://localhost:${env.PORT}${env.API_PREFIX}/health`);
  }
});

// Graceful shutdown
const gracefulShutdown = (signal: string): void => {
  logger.info(`${signal} received. Starting graceful shutdown...`);
  
  server.close(() => {
    logger.info('HTTP server closed');
    
    // Add cleanup for database connections, etc.
    // await mongoose.connection.close();
    // await redis.quit();
    
    logger.info('Graceful shutdown completed');
    process.exit(0);
  });

  // Force shutdown after 30 seconds
  setTimeout(() => {
    logger.error('Could not close connections in time, forcefully shutting down');
    process.exit(1);
  }, 30000);
};

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

// Handle uncaught exceptions
process.on('uncaughtException', (err: Error) => {
  logger.error('Uncaught Exception:', err);
  process.exit(1);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason: unknown) => {
  logger.error('Unhandled Rejection:', reason);
  process.exit(1);
});

export default server;

