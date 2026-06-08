# Procesador de Servicios de Mudanza — CLI

Herramienta de línea de comandos construida con **Node.js + TypeScript** que lee, filtra y procesa un catálogo de servicios de mudanza desde un archivo JSON, genera un resumen estadístico y exporta un reporte estructurado.

---

## Dominio: Empresa de Mudanzas

Sistema diseñado para una empresa de servicios de mudanza que ofrece diferentes tipos de traslados y servicios complementarios.

| Recurso | Descripción |
|---------|-------------|
| `MoveService` | Servicio de mudanza individual |
| Categorías | local, nacional, internacional, embalaje, almacenaje, seguro, ensamblaje |

### Estructura del Recurso

```typescript
interface MoveService {
  id: string;
  name: string;
  category: string;
  price: number;
  estimatedHours: number;
  active: boolean;
}
```

---

## Funcionalidades

- **Lectura de datos** desde `data/items.json` usando `fs/promises` con manejo de errores
- **Resumen del catálogo**: total de servicios, activos vs inactivos, precio promedio, servicio más caro y más barato, categorías disponibles
- **Filtro por categoría** mediante argumento CLI `--category`
- **Generación de reporte** en `output/report.json` con formato legible
- **Manejo de errores**: archivo no encontrado, categoría inexistente con lista de disponibles

---

## Arquitectura

```
starter/
├── data/
│   └── items.json          # Catálogo de servicios (12 registros)
├── src/
│   ├── index.ts            # Entry point — orquesta el flujo
│   ├── types.ts            # Interfaces del dominio (MoveService, Report)
│   ├── reader.ts           # Lectura del archivo JSON
│   ├── processor.ts        # Filtrado y cálculo de estadísticas
│   └── writer.ts           # Escritura del reporte en disco
├── output/
│   └── report.json         # Reporte generado (ignorado por git)
├── package.json
├── tsconfig.json
└── .gitignore
```

---

## Requisitos

- Node.js 22+
- pnpm

## Instalación

```bash
cd bootcamp/week-01-nodejs_fundamentals/3-proyecto/starter
pnpm install
```

## Uso

```bash
# Ver todos los servicios
pnpm dev

# Filtrar por categoría
pnpm dev -- --category local
pnpm dev -- --category internacional
pnpm dev -- --category embalaje

# Verificar tipos TypeScript
pnpm build
```

## Ejemplos de Salida

```
=== Resumen de Servicios de Mudanza ===
Total de servicios: 12
Activos: 11
Inactivos: 1
Precio promedio: $1.106.250
Servicio más caro: Mudanza Internacional ($8.500.000)
Servicio más barato: Seguro de Carga ($95.000)
Categorías: local, nacional, internacional, embalaje, almacenaje, seguro, ensamblaje
Reporte guardado en: .../starter/output/report.json
```

### Con filtro por categoría

```
=== Resumen de Servicios de Mudanza ===
Total de servicios: 3
Activos: 3
Inactivos: 0
Precio promedio: $483.333,33
Servicio más caro: Mudanza Local Premium ($650.000)
Servicio más barato: Mudanza Local Básica ($350.000)
Categorías: local
Reporte guardado en: .../starter/output/report.json
```

### Manejo de errores

```
Error: Categoría "inexistente" no encontrada. Categorías disponibles: local, nacional, internacional, embalaje, almacenaje, seguro, ensamblaje
```

---

## Tecnologías

- **Node.js 22** — runtime, `fs/promises`, `process.argv`
- **TypeScript 5.8** — tipado estricto con `strict: true`
- **ES Modules** — `import`/`export` con `"type": "module"`
- **tsx** — ejecución en desarrollo con recarga en caliente
