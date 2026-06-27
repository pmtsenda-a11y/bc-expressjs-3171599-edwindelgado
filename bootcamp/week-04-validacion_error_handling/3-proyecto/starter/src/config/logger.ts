// ============================================
// CONFIG — logger de Winston + stream para Morgan
// ============================================
import { createLogger, format, transports } from 'winston';
import morgan from 'morgan';

const isDev = process.env['NODE_ENV'] !== 'production';

// TODO: Implementar el logger de Winston
// 1. Usar createLogger con:
//    - level: 'http' en desarrollo, 'warn' en producción
//    - format.combine + format.timestamp en todos los entornos
//    - En desarrollo: format.colorize + format.printf con timestamp, level, message
//    - En producción: format.json
// 2. Transports:
//    - Console siempre
//    - File({ filename: 'logs/error.log', level: 'error' }) solo en producción
//
// Ejemplo de la estructura esperada:
// export const logger = createLogger({ ... });

const devFormat = format.printf(({ timestamp, level, message, ...rest }) => {
  return `${timestamp} [${level}]: ${message} ${Object.keys(rest).length ? JSON.stringify(rest) : ''}`;
});

export const logger = createLogger({
  level: isDev ? 'http' : 'warn',
  format: format.combine(
    format.timestamp(),
    isDev
      ? format.combine(format.colorize(), devFormat)
      : format.json()
  ),
  transports: [
    new transports.Console(),
    ...(isDev ? [] : [new transports.File({ filename: 'logs/error.log', level: 'error' })]),
  ],
});

export const morganStream = { write: (message: string) => logger.http(message.trim()) };

const morganFormat = isDev ? 'dev' : 'combined';
export const morganMiddleware = morgan(morganFormat, { stream: morganStream });
