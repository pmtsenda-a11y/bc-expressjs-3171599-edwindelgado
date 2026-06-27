import { Request, Response, NextFunction } from 'express';
import * as service from '../services/items.service';
import { createItemSchema, updateItemSchema } from '../schemas/items.schema';

export async function getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const page = Math.max(1, Number(req.query['page']) || 1);
    const limit = Math.min(100, Math.max(1, Number(req.query['limit']) || 10));
    res.json(await service.listItems(page, limit));
  } catch (err) { next(err); }
}

export async function getById(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    res.json(await service.getItem(Number(req.params['id'])));
  } catch (err) { next(err); }
}

export async function create(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const parsed = createItemSchema.safeParse(req.body);
    if (!parsed.success) { res.status(400).json({ status: 'error', message: parsed.error.flatten() }); return; }
    res.status(201).json(await service.createItem(parsed.data));
  } catch (err) { next(err); }
}

export async function update(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const parsed = updateItemSchema.safeParse(req.body);
    if (!parsed.success) { res.status(400).json({ status: 'error', message: parsed.error.flatten() }); return; }
    res.json(await service.updateItem(Number(req.params['id']), parsed.data));
  } catch (err) { next(err); }
}

export async function remove(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    await service.deleteItem(Number(req.params['id']));
    res.status(204).send();
  } catch (err) { next(err); }
}
