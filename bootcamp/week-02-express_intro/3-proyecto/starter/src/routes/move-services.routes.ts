import { Router } from 'express';
import * as store from '../store.js';
import type { CreateMoveServiceDto, UpdateMoveServiceDto } from '../types.js';

export const moveServicesRouter = Router();

moveServicesRouter.get('/', (_req, res) => {
  res.json(store.getAll());
});

moveServicesRouter.get('/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const service = store.getById(id);
  if (!service) {
    res.status(404).json({ error: 'Servicio de mudanza no encontrado' });
    return;
  }
  res.json(service);
});

moveServicesRouter.post('/', (req, res) => {
  const dto = req.body as CreateMoveServiceDto;
  const service = store.create(dto);
  res.status(201).json(service);
});

moveServicesRouter.put('/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const dto = req.body as UpdateMoveServiceDto;
  const service = store.update(id, dto);
  if (!service) {
    res.status(404).json({ error: 'Servicio de mudanza no encontrado' });
    return;
  }
  res.json(service);
});

moveServicesRouter.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const removed = store.remove(id);
  if (!removed) {
    res.status(404).json({ error: 'Servicio de mudanza no encontrado' });
    return;
  }
  res.status(204).send();
});
