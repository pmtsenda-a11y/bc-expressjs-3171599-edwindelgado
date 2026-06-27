// ============================================
// CONTROLLER — Interfaz HTTP
// ============================================
// Reglas de esta capa:
// - Exactamente 3 pasos: extraer → llamar service → responder
// - Sin lógica de negocio (no ifs de dominio, no cálculos)
// - Maneja los 404 cuando el service retorna undefined
// - Siempre usar try/catch y pasar errores a next(err)
//
// TODO: Renombra "Item" e "items" por el modelo de tu dominio

import { Request, Response, NextFunction } from 'express';
import * as service from '../services/items.service';
import { CreateItemDto, UpdateItemDto } from '../types';

export async function getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const page = parseInt(req.query['page'] as string) || 1;
    const limit = parseInt(req.query['limit'] as string) || 10;
    const result = await service.findAll({ page, limit });
    res.json(result);
  } catch (err) {
    next(err);
  }
}

export async function getById(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const id = Number(req.params['id']);
    const item = await service.findById(id);
    if (!item) {
      res.status(404).json({ error: 'Not Found', message: `Item ${id} not found` });
      return;
    }
    res.json({ data: item });
  } catch (err) {
    next(err);
  }
}

export async function create(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const dto = req.body as CreateItemDto;
    const item = await service.create(dto);
    res.status(201).json({ data: item });
  } catch (err) {
    next(err);
  }
}

export async function update(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const id = Number(req.params['id']);
    const dto = req.body as UpdateItemDto;
    const item = await service.update(id, dto);
    if (!item) {
      res.status(404).json({ error: 'Not Found', message: `Item ${id} not found` });
      return;
    }
    res.json({ data: item });
  } catch (err) {
    next(err);
  }
}

export async function remove(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const id = Number(req.params['id']);
    const deleted = await service.remove(id);
    if (!deleted) {
      res.status(404).json({ error: 'Not Found', message: `Item ${id} not found` });
      return;
    }
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}
