import express from 'express';
import type { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { itemsRouter } from './routes/items.routes.js';
import { moveServicesRouter } from './routes/move-services.routes.js';

export function createApp(): Application {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use(morgan('dev'));

  app.get('/health', (_req, res) => {
    res.json({ status: 'ok' });
  });

  app.use('/api/v1/move-services', moveServicesRouter);
  app.use('/api/v1/items', itemsRouter);

  app.use((_req, res) => {
    res.status(404).json({ error: 'Ruta no encontrada' });
  });

  app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
    console.error('Error:', err.message);
    res.status(500).json({ error: 'Error interno del servidor' });
  });

  return app;
}
