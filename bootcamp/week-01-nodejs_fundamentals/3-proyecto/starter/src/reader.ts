import { readFile } from 'fs/promises';
import { join } from 'path';
import type { MoveService } from './types.js';

export async function readItems(): Promise<MoveService[]> {
  const filePath = join(import.meta.dirname, '..', 'data', 'items.json');
  try {
    const raw = await readFile(filePath, 'utf-8');
    return JSON.parse(raw) as MoveService[];
  } catch (err) {
    throw new Error(`No se pudo leer el archivo de datos: ${(err as Error).message}`);
  }
}
