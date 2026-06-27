# API REST de Servicios de Mudanza — Express 5

API REST construida con **Express 5 + TypeScript** que expone un CRUD completo para gestionar servicios de mudanza. Los datos se almacenan en memoria (sin base de datos).

---

## Dominio: Empresa de Mudanzas

Sistema para administrar el catálogo de servicios ofrecidos por una empresa de mudanzas.

| Recurso | Descripción |
|---------|-------------|
| `MoveService` | Servicio de mudanza individual |
| Endpoint base | `/api/v1/move-services` |

### Estructura del Recurso

```typescript
interface MoveService {
  id: number;
  name: string;
  category: string;
  price: number;
  estimatedHours: number;
  active: boolean;
}
```

---

## Endpoints

| Método | Ruta | Descripción | Status |
|--------|------|-------------|--------|
| GET | `/api/v1/move-services` | Listar todos los servicios | 200 |
| GET | `/api/v1/move-services/:id` | Obtener servicio por ID | 200 / 404 |
| POST | `/api/v1/move-services` | Crear nuevo servicio | 201 |
| PUT | `/api/v1/move-services/:id` | Actualizar servicio completo | 200 / 404 |
| DELETE | `/api/v1/move-services/:id` | Eliminar servicio | 204 / 404 |
| GET | `/health` | Health check | 200 |

---

## Middlewares

- **express.json()** — parseo de body
- **Logger** — registra método, URL, status code y tiempo de respuesta
- **404 handler** — rutas no encontradas
- **Error handler global** — captura errores inesperados

---

## Arquitectura

```
starter/
├── .env.example
├── package.json
├── tsconfig.json
└── src/
    ├── server.ts                       # Entry point con graceful shutdown
    ├── app.ts                          # Configuración de Express
    ├── types.ts                        # Interfaces del dominio
    ├── store.ts                        # CRUD en memoria
    └── routes/
        └── move-services.routes.ts     # 5 endpoints REST
```

---

## Requisitos

- Node.js 22+
- pnpm

## Instalación

```bash
cd bootcamp/week-02-express_intro/3-proyecto/starter
pnpm install
```

## Uso

```bash
# Iniciar servidor en desarrollo con recarga automática
pnpm dev
```

### Probar endpoints con curl

```bash
# Health check
curl http://localhost:3000/health

# Listar servicios
curl http://localhost:3000/api/v1/move-services

# Crear servicio
curl -X POST http://localhost:3000/api/v1/move-services \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Mudanza Local Express",
    "category": "local",
    "price": 450000,
    "estimatedHours": 3,
    "active": true
  }'

# Obtener por ID
curl http://localhost:3000/api/v1/move-services/1

# Actualizar
curl -X PUT http://localhost:3000/api/v1/move-services/1 \
  -H "Content-Type: application/json" \
  -d '{"price": 500000}'

# Eliminar
curl -X DELETE http://localhost:3000/api/v1/move-services/1
```

---

## Tecnologías

- **Express 5** — framework web
- **TypeScript 5.8** — tipado estricto con `strict: true`
- **ES Modules** — `import`/`export`
- **tsx** — ejecución en desarrollo con recarga en caliente
