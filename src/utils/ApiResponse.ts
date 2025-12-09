import { Response } from 'express';

interface SuccessResponse<T> {
  success: true;
  data: T;
  message?: string;
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
    totalPages?: number;
  };
}

interface ErrorResponse {
  success: false;
  message: string;
  errors?: Record<string, string[]>;
}

export class ApiResponse {
  static success<T>(res: Response, data: T, message?: string, statusCode = 200): Response {
    const response: SuccessResponse<T> = {
      success: true,
      data,
      ...(message && { message }),
    };
    return res.status(statusCode).json(response);
  }

  static created<T>(res: Response, data: T, message = 'Created successfully'): Response {
    return this.success(res, data, message, 201);
  }

  static noContent(res: Response): Response {
    return res.status(204).send();
  }

  static paginated<T>(
    res: Response,
    data: T[],
    page: number,
    limit: number,
    total: number,
    message?: string
  ): Response {
    const response: SuccessResponse<T[]> = {
      success: true,
      data,
      ...(message && { message }),
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
    return res.status(200).json(response);
  }

  static error(
    res: Response,
    message: string,
    statusCode = 500,
    errors?: Record<string, string[]>
  ): Response {
    const response: ErrorResponse = {
      success: false,
      message,
      ...(errors && { errors }),
    };
    return res.status(statusCode).json(response);
  }
}

