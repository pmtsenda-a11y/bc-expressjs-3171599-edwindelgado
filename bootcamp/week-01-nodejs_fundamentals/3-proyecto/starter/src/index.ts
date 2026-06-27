import { readItems } from './reader.js';
import { filterByCategory, calculateSummary } from './processor.js';
import { writeReport } from './writer.js';
import type { Report } from './types.js';

function formatCOP(price: number): string {
  return '$' + Math.round(price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

async function main(): Promise<void> {
  const args = process.argv.slice(2);
  const categoryIndex = args.indexOf('--category');
  const categoryFilter: string | null = categoryIndex !== -1 ? args[categoryIndex + 1] : null;

  const items = await readItems();
  const filteredItems = filterByCategory(items, categoryFilter);
  const summary = calculateSummary(filteredItems);

  const report: Report = {
    generatedAt: new Date().toISOString(),
    appliedFilter: categoryFilter,
    summary,
    items: filteredItems,
  };

  console.log('=== Resumen de Servicios de Mudanza ===');
  console.log(`Total de servicios: ${summary.total}`);
  console.log(`Activos: ${summary.active}`);
  console.log(`Inactivos: ${summary.inactive}`);
  console.log(`Precio promedio: ${formatCOP(summary.averagePrice)}`);
  console.log(`Servicio más caro: ${summary.mostExpensive.name} (${formatCOP(summary.mostExpensive.price)})`);
  console.log(`Servicio más barato: ${summary.cheapest.name} (${formatCOP(summary.cheapest.price)})`);
  console.log(`Categorías: ${summary.categories.join(', ')}`);

  await writeReport(report);
}

main().catch((err) => {
  console.error('Error:', (err as Error).message);
  process.exit(1);
});
