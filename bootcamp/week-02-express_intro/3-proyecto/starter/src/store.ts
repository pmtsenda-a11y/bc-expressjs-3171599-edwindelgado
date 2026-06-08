import type { MoveService, CreateMoveServiceDto, UpdateMoveServiceDto } from './types.js';

const items: MoveService[] = [];
let nextId = 1;

export function getAll(): MoveService[] {
  return items;
}

export function getById(id: number): MoveService | undefined {
  return items.find(item => item.id === id);
}

export function create(data: CreateMoveServiceDto): MoveService {
  const newItem: MoveService = { id: nextId++, ...data };
  items.push(newItem);
  return newItem;
}

export function update(id: number, data: UpdateMoveServiceDto): MoveService | undefined {
  const index = items.findIndex(item => item.id === id);
  if (index === -1) return undefined;
  items[index] = { ...items[index], ...data };
  return items[index];
}

export function remove(id: number): boolean {
  const index = items.findIndex(item => item.id === id);
  if (index === -1) return false;
  items.splice(index, 1);
  return true;
}
