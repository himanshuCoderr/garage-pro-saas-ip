import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { ApiError, ApiResponse, logger } from '../utils/index.js';
import { isDev } from '../config/index.js';

export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): Response => {
  // Log the error
  logger.error(err.message, { stack: err.stack });

  // Handle ApiError
  if (err instanceof ApiError) {
    return ApiResponse.error(res, err.message, err.statusCode, err.errors);
  }

  // Handle Zod validation errors
  if (err instanceof ZodError) {
    const errors: Record<string, string[]> = {};
    err.errors.forEach((error) => {
      const path = error.path.join('.');
      if (!errors[path]) {
        errors[path] = [];
      }
      errors[path].push(error.message);
    });
    return ApiResponse.error(res, 'Validation error', 400, errors);
  }

  // Handle syntax errors (invalid JSON)
  if (err instanceof SyntaxError && 'body' in err) {
    return ApiResponse.error(res, 'Invalid JSON', 400);
  }

  // Default error response
  const message = isDev ? err.message : 'Internal server error';
  return ApiResponse.error(res, message, 500);
};

