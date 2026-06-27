// ============================================
// REPOSITORY — Capa de acceso a datos
// ============================================
// Reglas de esta capa:
// - Único punto de acceso al store (array, DB, archivo)
// - Todos los métodos deben ser async Promise<T>
// - Retornar copias defensivas (no la referencia interna)
// - Si no encuentra un elemento, retornar undefined
//
// TODO: Renombra "Item" por el modelo de tu dominio
// TODO: Agrega datos iniciales coherentes con tu dominio

import { Item, CreateItemDto, UpdateItemDto } from '../types';

const store: Item[] = [
  { id: 1, name: 'Laptop Gamer', description: 'High-performance gaming laptop with RTX 4070', active: true, createdAt: new Date().toISOString() },
  { id: 2, name: 'Monitor 27\" 4K', description: '27-inch UHD IPS monitor for professional editing', active: true, createdAt: new Date().toISOString() },
  { id: 3, name: 'Teclado Mecánico RGB', description: 'Mechanical keyboard with Cherry MX switches', active: true, createdAt: new Date().toISOString() },
  { id: 4, name: 'Mouse Inalámbrico Pro', description: 'Wireless ergonomic mouse with 16000 DPI', active: false, createdAt: new Date().toISOString() },
];
let nextId = 5;

export async function findAll(): Promise<Item[]> {
  return [...store];
}

export async function findById(id: number): Promise<Item | undefined> {
  return store.find((item) => item.id === id);
}

export async function create(dto: CreateItemDto): Promise<Item> {
  const item: Item = { id: nextId++, ...dto, createdAt: new Date().toISOString() };
  store.push(item);
  return { ...item };
}

export async function update(id: number, dto: UpdateItemDto): Promise<Item | undefined> {
  const index = store.findIndex((item) => item.id === id);
  if (index === -1) return undefined;
  store[index] = { ...store[index]!, ...dto };
  return { ...store[index]! };
}

export async function remove(id: number): Promise<boolean> {
  const index = store.findIndex((item) => item.id === id);
  if (index === -1) return false;
  store.splice(index, 1);
  return true;
}
