import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../utils/index.js';

export const notFoundHandler = (
  req: Request,
  _res: Response,
  next: NextFunction
): void => {
  next(ApiError.notFound(`Route ${req.method} ${req.path} not found`));
};

