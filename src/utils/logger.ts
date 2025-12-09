import winston from 'winston';
import { env, isDev } from '../config/index.js';

const { combine, timestamp, printf, colorize, errors } = winston.format;

const logFormat = printf(({ level, message, timestamp, stack }) => {
  return `${timestamp} [${level}]: ${stack || message}`;
});

export const logger = winston.createLogger({
  level: env.LOG_LEVEL,
  format: combine(
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    errors({ stack: true }),
    logFormat
  ),
  transports: [
    new winston.transports.Console({
      format: combine(
        colorize(),
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        errors({ stack: true }),
        logFormat
      ),
    }),
    ...(isDev
      ? []
      : [
          new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
          new winston.transports.File({ filename: 'logs/combined.log' }),
        ]),
  ],
  exceptionHandlers: [
    new winston.transports.Console(),
    ...(isDev ? [] : [new winston.transports.File({ filename: 'logs/exceptions.log' })]),
  ],
  rejectionHandlers: [
    new winston.transports.Console(),
    ...(isDev ? [] : [new winston.transports.File({ filename: 'logs/rejections.log' })]),
  ],
});

