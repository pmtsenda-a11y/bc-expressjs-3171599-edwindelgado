import { Router } from 'express';
import * as store from '../store.js';
import type { CreateMoveServiceDto as CreateItemDto, UpdateMoveServiceDto as UpdateItemDto } from '../types.js';

export const itemsRouter = Router();

// GET /items — Listar todos los recursos
// TODO: Implementar usando store.getAll()
// Status: 200
itemsRouter.get('/', (_req, res) => {
  res.json(store.getAll());
});

// GET /items/:id — Obtener recurso por ID
// TODO: Implementar usando store.getById(id)
// Status: 200 si existe | 404 si no existe
itemsRouter.get('/:id', (req, res) => {
  const id = Number(req.params.id);
  const item = store.getById(id);
  if (!item) {
    res.status(404).json({ error: 'Item not found' });
    return;
  }
  res.json(item);
});

// POST /items — Crear nuevo recurso
// TODO: Implementar usando store.create(dto)
// Status: 201 con el recurso creado
itemsRouter.post('/', (req, res) => {
  const dto: CreateItemDto = req.body;
  const newItem = store.create(dto);
  res.status(201).json(newItem);
});

// PUT /items/:id — Actualizar recurso completo
// TODO: Implementar usando store.update(id, dto)
// Status: 200 con el recurso actualizado | 404 si no existe
itemsRouter.put('/:id', (req, res) => {
  const id = Number(req.params.id);
  const dto: UpdateItemDto = req.body;
  const updated = store.update(id, dto);
  if (!updated) {
    res.status(404).json({ error: 'Item not found' });
    return;
  }
  res.json(updated);
});

// DELETE /items/:id — Eliminar recurso
// TODO: Implementar usando store.remove(id)
// Status: 204 sin body | 404 si no existe
itemsRouter.delete('/:id', (req, res) => {
  const id = Number(req.params.id);
  const removed = store.remove(id);
  if (!removed) {
    res.status(404).json({ error: 'Item not found' });
    return;
  }
  res.status(204).send();
});
