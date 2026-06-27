import { prisma } from '../lib/prisma';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { AppError } from '../errors/AppError';
import { CreateItemDto, UpdateItemDto } from '../schemas/items.schema';

export async function findAll(page: number, limit: number) {
  const [items, total] = await Promise.all([
    prisma.book.findMany({
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { createdAt: 'desc' },
      include: { author: true },
    }),
    prisma.book.count(),
  ]);
  return { data: items, total, page, limit };
}

export async function findById(id: number) {
  const item = await prisma.book.findUnique({
    where: { id },
    include: { author: true },
  });
  return item;
}

export async function create(data: CreateItemDto) {
  try {
    return await prisma.book.create({ data });
  } catch (err) {
    if (err instanceof PrismaClientKnownRequestError && err.code === 'P2002') {
      throw new AppError(409, 'Ya existe un libro con ese ISBN');
    }
    throw err;
  }
}

export async function update(id: number, data: UpdateItemDto) {
  try {
    return await prisma.book.update({ where: { id }, data });
  } catch (err) {
    if (err instanceof PrismaClientKnownRequestError && err.code === 'P2025') {
      throw new AppError(404, 'Libro no encontrado');
    }
    throw err;
  }
}

export async function remove(id: number) {
  try {
    await prisma.book.delete({ where: { id } });
  } catch (err) {
    if (err instanceof PrismaClientKnownRequestError && err.code === 'P2025') {
      throw new AppError(404, 'Libro no encontrado');
    }
    throw err;
  }
}
