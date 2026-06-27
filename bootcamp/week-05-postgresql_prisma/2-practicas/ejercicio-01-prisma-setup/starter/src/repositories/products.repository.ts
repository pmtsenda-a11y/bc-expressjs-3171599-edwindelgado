// src/repositories/products.repository.ts — Acceso a datos con Prisma
// Toda interacción con la base de datos ocurre aquí

import { prisma } from '../lib/prisma';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { AppError } from '../errors/AppError';
import { CreateProductDto, UpdateProductDto } from '../schemas/product.schema';

// ============================================================
// PASO 4A: findAll — Listado paginado de productos
// Descomenta la implementación de abajo
// ============================================================

export async function findAll(page: number, limit: number) {
  const [products, total] = await Promise.all([
    prisma.product.findMany({
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { createdAt: 'desc' },
    }),
    prisma.product.count(),
  ]);
  return { data: products, total, page, limit };
}

// ============================================================
// PASO 4B: findById — Buscar un producto por ID
// Descomenta la implementación de abajo
// ============================================================

export async function findById(id: number) {
  const product = await prisma.product.findUnique({ where: { id } });
  return product;
}

// ============================================================
// PASO 5A: create — Crear un producto nuevo
// Descomenta la implementación de abajo
// ============================================================

export async function create(data: CreateProductDto) {
  try {
    return await prisma.product.create({ data });
  } catch (err) {
    if (err instanceof PrismaClientKnownRequestError && err.code === 'P2002') {
      throw new AppError(409, 'El SKU ya existe');
    }
    throw err;
  }
}

// ============================================================
// PASO 5B: update — Actualizar un producto existente
// Descomenta la implementación de abajo
// ============================================================

export async function update(id: number, data: UpdateProductDto) {
  try {
    return await prisma.product.update({ where: { id }, data });
  } catch (err) {
    if (err instanceof PrismaClientKnownRequestError && err.code === 'P2025') {
      throw new AppError(404, 'Producto no encontrado');
    }
    throw err;
  }
}

// ============================================================
// PASO 5C: remove — Eliminar un producto
// Descomenta la implementación de abajo
// ============================================================

export async function remove(id: number) {
  try {
    await prisma.product.delete({ where: { id } });
  } catch (err) {
    if (err instanceof PrismaClientKnownRequestError && err.code === 'P2025') {
      throw new AppError(404, 'Producto no encontrado');
    }
    throw err;
  }
}
