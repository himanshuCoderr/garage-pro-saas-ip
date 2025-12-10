import app from './app.js';
import { env, isDev } from './config/index.js';
import { logger } from './utils/index.js';
import { prisma } from './db/index.js';

// Connect to database then start server
prisma.$connect()
  .then(() => {
    logger.info('✅ Database connected');
    
    const server = app.listen(env.PORT, () => {
      logger.info(`🚀 Server running on port ${env.PORT} in ${env.NODE_ENV} mode`);
      logger.info(`📍 API available at http://localhost:${env.PORT}${env.API_PREFIX}`);
      
      if (isDev) {
        logger.info(`🏥 Health check: http://localhost:${env.PORT}${env.API_PREFIX}/health`);
      }
    });

    setupGracefulShutdown(server);
  })
  .catch((err) => {
    logger.error('❌ Database connection failed:', err);
    process.exit(1);
  });

function setupGracefulShutdown(server: ReturnType<typeof app.listen>) {
  const gracefulShutdown = (signal: string): void => {
    logger.info(`${signal} received. Starting graceful shutdown...`);
    
    server.close(async () => {
      logger.info('HTTP server closed');
      await prisma.$disconnect();
      logger.info('Database disconnected');
      process.exit(0);
    });

    setTimeout(() => {
      logger.error('Could not close connections in time, forcefully shutting down');
      process.exit(1);
    }, 30000);
  };

  process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
  process.on('SIGINT', () => gracefulShutdown('SIGINT'));
}

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

