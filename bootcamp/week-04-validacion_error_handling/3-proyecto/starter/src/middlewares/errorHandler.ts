// ============================================
// MIDDLEWARES — errorHandler (4 parámetros)
// ============================================
import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { AppError } from '../errors/AppError';
import { logger } from '../config/logger';

// TODO: Implementar el errorHandler con exactamente 4 parámetros.
// ⚠️ Express detecta los error handlers por la cantidad de parámetros.
//    Con 3 parámetros lo trataría como middleware normal.
//
// Debe distinguir tres tipos de error:
//
// 1. ZodError → 400
//    { error: 'Validation Error', message: '...', issues: [{ field, message }] }
//
// 2. AppError → err.statusCode
//    { error: 'Application Error', message: err.message }
//    Usar logger.warn() para registrar errores operacionales
//
// 3. Error genérico → 500
//    { error: 'Internal Server Error', message: '...' }
//    Ocultar stack en producción, enviarlo en desarrollo
//    Usar logger.error() para registrar errores no controlados

export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  if (err instanceof ZodError) {
    res.status(400).json({
      error: 'Validation Error',
      message: 'Datos de entrada inválidos',
      issues: err.issues.map((issue) => ({
        field: issue.path.join('.'),
        message: issue.message,
      })),
    });
    return;
  }

  if (err instanceof AppError) {
    logger.warn(err.message);
    res.status(err.statusCode).json({
      error: 'Application Error',
      message: err.message,
    });
    return;
  }

  const isProduction = process.env['NODE_ENV'] === 'production';
  const message = isProduction ? 'Error interno del servidor' : (err as Error).message;
  logger.error(message, { stack: (err as Error).stack });
  res.status(500).json({
    error: 'Internal Server Error',
    message,
    ...(isProduction ? {} : { stack: (err as Error).stack }),
  });
}
