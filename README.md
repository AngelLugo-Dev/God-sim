# Templo God Sim

**God Sim pixel art** con backend real, sistema de creyentes vs no-creyentes, y oleadas de bárbaros que atacan cuando alcanzas 5 pobladores.

Stack: **Frontend** React + Vite + Tailwind CSS | **Backend** Node.js + Express + TypeScript

Usa **pnpm** en ambas carpetas. El proyecto se divide en `/frontend` y `/backend` para separar responsabilidades.

## Inicio rápido

```bash
# Instalar y ejecutar backend (puerto 3001)
cd backend && pnpm install && pnpm dev

# En otra terminal: instalar y ejecutar frontend (puerto 5173)
cd frontend && pnpm install && pnpm dev
```

Accede a `http://localhost:5173` y comienza a jugar.

## Arquitectura

- **Backend**: Lógica del juego, ticks de fe/bárbaros, conversión de ciudadanos, oleadas
- **Frontend**: UI, consola de comandos, render en pixel art, WebSocket sync con backend
- **API**: REST endpoints en `/api/game/*`

Lee más en [docs/arquitectura-ampliada.md](docs/arquitectura-ampliada.md)

## Loop principal

- **Creyentes generan fe** (solo los primeros 5 ciudadanos son automáticamente creyentes).
- **Ciudadanos 6+** son no-creyentes y deben convertirse para generar fe.
- **Bárbaros atacan** cuando alcanzas 5+ pobladores.
- **Cada 5 seg**: +1 fe por creyente (desde backend).
- **Cada 8 seg**: Nueva oleada de bárbaros (2 por oleada).
- Usa `RAYO` para eliminar bárbaros (cuesta 10 fe).

## Comandos

- `CREAR_CIUDADANO nombre`: Añade ciudadano (primeros 5 son creyentes por defecto).
- `CONVERTIR id`: Convierte no-creyente a creyente (requiere fe/lógica).
- `RAYO`: Destruye el primer bárbaro en pantalla. Cuesta 10 fe.
- `DAR_AJO`: Ofrenda en el altar.
- `AYUDA`: Lista de comandos.
- `ESTADO`: Estado actual del juego.

## Estructura del proyecto

```
├── frontend/            # React + Vite (UI y consola)
│   ├── src/
│   │   ├── App.tsx
│   │   ├── index.css
│   │   └── main.tsx
│   └── package.json
├── backend/             # Node.js + Express (lógica del juego)
│   ├── src/
│   │   ├── api/
│   │   ├── models/
│   │   └── index.ts
│   └── package.json
├── docs/                # Documentación
│   ├── arquitectura-ampliada.md
│   ├── visual-prompts.md
│   └── ...
└── README.md
```

## Setup completo

### Backend (puerto 3001)

```bash
cd backend
pnpm install
pnpm dev
```

El backend expone endpoints en `http://localhost:3001/api/game/*`

### Frontend (puerto 5173)

```bash
cd frontend
pnpm install
pnpm dev
```

Abre `http://localhost:5173` en tu navegador.

## Flujo de desarrollo

1. Ambas carpetas tienen su propio `package.json` y lockfile.
2. Usa **siempre pnpm** en ambas.
3. El frontend envía comandos al backend via HTTP.
4. El backend ejecuta ticks de simulación cada 5-8 segundos.
5. Los cambios se sincronizan automáticamente.

## Generación de recursos visuales

Ver [docs/visual-prompts.md](docs/visual-prompts.md) para prompts de Midjourney/Stable Diffusion.

Recomendaciones:

- **Midjourney**: Mejor calidad pixel art
- **Stable Diffusion**: Iteraciones rápidas, gratis
- **Leonardo AI**: Especializado en game assets

Instrucciones de prompt en el archivo de docs.

## Notas de implementación

- El **backend** contiene toda la lógica de juego (creyentes, bárbaros, fe).
- El **frontend** es 100% UI y consola: envía comandos y recibe estado.
- Usa **Node.js + Express** en backend (fácil de iterar, ideal para MVP).
- Considera **Go o Rust** después si necesitas performance.
- El estado vive en memoria (próximo paso: SQLite/PostgreSQL).
- Alternativas: Ver documentación sobre opciones de backend en otros lenguajes.
