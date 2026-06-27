// prisma/seed.ts — Datos iniciales del dominio
// Ejecutar con: pnpm dlx prisma db seed

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main(): Promise<void> {
  console.log('🌱 Iniciando seed...');

  await prisma.book.deleteMany();
  await prisma.author.deleteMany();

  const tolkien = await prisma.author.create({
    data: { name: 'J.R.R. Tolkien', nationality: 'British' },
  });
  const orwell = await prisma.author.create({
    data: { name: 'George Orwell', nationality: 'British' },
  });
  const herbert = await prisma.author.create({
    data: { name: 'Frank Herbert', nationality: 'American' },
  });

  const result = await prisma.book.createMany({
    data: [
      { title: 'El Señor de los Anillos', isbn: '978-84-450-0001-2', year: 1954, pages: 1178, available: true, authorId: tolkien.id },
      { title: 'El Hobbit', isbn: '978-84-450-0002-9', year: 1937, pages: 310, available: true, authorId: tolkien.id },
      { title: '1984', isbn: '978-84-450-0003-6', year: 1949, pages: 328, available: true, authorId: orwell.id },
      { title: 'Rebelión en la Granja', isbn: '978-84-450-0004-3', year: 1945, pages: 152, available: false, authorId: orwell.id },
      { title: 'Dune', isbn: '978-84-450-0005-0', year: 1965, pages: 688, available: true, authorId: herbert.id },
      { title: 'El Mesías de Dune', isbn: '978-84-450-0006-7', year: 1969, pages: 480, available: true, authorId: herbert.id },
    ],
  });

  console.log(`✅ ${result.count} libros creados`);
}

main()
  .catch((err: unknown) => {
    console.error('❌ Error en seed:', err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
