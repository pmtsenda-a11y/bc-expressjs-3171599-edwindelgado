import type { MoveService, MoveServiceSummary } from './types.js';

export function filterByCategory(items: MoveService[], categoryFilter: string | null): MoveService[] {
  if (categoryFilter === null) {
    return items;
  }

  const filtered = items.filter(item =>
    item.category.toLowerCase() === categoryFilter.toLowerCase()
  );

  if (filtered.length === 0) {
    const available = [...new Set(items.map(item => item.category))].join(', ');
    throw new Error(`Categoría "${categoryFilter}" no encontrada. Categorías disponibles: ${available}`);
  }

  return filtered;
}

export function calculateSummary(items: MoveService[]): MoveServiceSummary {
  if (items.length === 0) {
    throw new Error('Cannot calculate summary: no items provided');
  }

  const total = items.length;
  const active = items.filter(item => item.active).length;
  const inactive = items.filter(item => !item.active).length;

  const totalPrice = items.reduce((sum, item) => sum + item.price, 0);
  const averagePrice = Math.round((totalPrice / total) * 100) / 100;

  const sorted = [...items].sort((a, b) => a.price - b.price);
  const cheapest = sorted[0];
  const mostExpensive = sorted[sorted.length - 1];

  const categories = [...new Set(items.map(item => item.category))];

  return { total, active, inactive, averagePrice, mostExpensive, cheapest, categories };
}
