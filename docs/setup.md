# Setup del proyecto

## Requisitos previos

- Node.js 18+
- pnpm 10+
- Git

## Instalación rápida

### 1. Clonar y entrar al repo

```bash
git clone https://github.com/AngelLugo-Dev/God-sim.git
cd God-sim
```

### 2. Backend (Node.js + Express)

```bash
cd backend
pnpm install
pnpm dev
```

**Output esperado:**

```
🏛️ Templo God Sim backend escuchando en puerto 3001
📡 Ambiente: development
🎮 API disponible en http://localhost:3001/api/game
```

### 3. Frontend (React + Vite) - En otra terminal

```bash
cd frontend
pnpm install
pnpm dev
```

**Output esperado:**

```
  ➜  Local:   http://localhost:5173/
  ➜  press h to show help
```

### 4. Acceder al juego

Abre `http://localhost:5173` en tu navegador.

## Verificación de setup

### Comprobar que el backend está disponible

```bash
curl http://localhost:3001/health
# Debe devolver: {"status":"ok","timestamp":"..."}
```

### Comprobar que el frontend puede comunicarse

En la consola del navegador (F12), ejecuta:

```javascript
fetch("http://localhost:3001/api/game/state")
  .then((r) => r.json())
  .then(console.log);
```

Debe devolver el estado del juego (fe, poblacion, etc.).

## Comandos útiles

### Backend

```bash
cd backend

# Desarrollo (watch mode con tsx)
pnpm dev

# Compilar a JavaScript
pnpm build

# Ejecutar compilado
pnpm start

# Limpiar build
rm -rf dist
```

### Frontend

```bash
cd frontend

# Desarrollo (Vite dev server)
pnpm dev

# Build para producción
pnpm build

# Preview del build
pnpm preview

# Limpiar dist
rm -rf dist
```

## Estructura de carpetas

```
God-sim/
├── backend/                    # Node.js + Express
│   ├── src/
│   │   ├── api/
│   │   │   └── gameRoutes.ts   # Endpoints REST
│   │   ├── models/
│   │   │   ├── GameState.ts    # Tipos y constantes
│   │   │   └── GameEngine.ts   # Lógica del juego
│   │   └── index.ts            # Servidor principal
│   ├── package.json
│   ├── tsconfig.json
│   └── .env.example
│
├── frontend/                   # React + Vite
│   ├── src/
│   │   ├── App.tsx             # Componente principal
│   │   ├── index.css           # Estilos Tailwind
│   │   └── main.tsx            # Entry point
│   ├── index.html
│   ├── package.json
│   ├── vite.config.ts
│   └── tsconfig.json
│
├── docs/                       # Documentación
│   ├── arquitectura-ampliada.md
│   ├── visual-prompts.md
│   ├── setup.md                ← Tú estás aquí
│   └── ...
│
└── README.md
```

## Configuración avanzada

### Variables de entorno - Backend

Copiar `.env.example` a `.env`:

```bash
cd backend
cp .env.example .env
```

Editar `backend/.env`:

```
PORT=3001
NODE_ENV=development
```

### Variables de entorno - Frontend

Si necesitas cambiar la URL del backend, edita el URL base en `src/App.tsx`:

```typescript
const API_BASE = process.env.VITE_API_BASE || "http://localhost:3001";
```

O crea `frontend/.env`:

```
VITE_API_BASE=http://localhost:3001
```

## Solución de problemas

### Error: "ENOENT: no such file or directory"

**Causa**: No instalaste las dependencias.

```bash
cd backend && pnpm install
cd ../frontend && pnpm install
```

### Error: "Port 3001 is already in use"

Cambia el puerto en `backend/.env`:

```
PORT=3002
```

O mata el proceso anterior:

```bash
# Linux/Mac
lsof -i :3001 | grep LISTEN | awk '{print $2}' | xargs kill -9

# Windows PowerShell
Get-Process -Id (Get-NetTCPConnection -LocalPort 3001).OwningProcess | Stop-Process -Force
```

### Error: "Cannot find module"

Asegúrate de que estés en la carpeta correcta y con la rama correcta:

```bash
pwd  # Debe terminar en /God-sim/backend o /God-sim/frontend
git status
pnpm install
```

### El frontend no se conecta al backend

1. Verifica que el backend está corriendo: `curl http://localhost:3001/health`
2. Revisa la consola del navegador (F12) para ver errores CORS
3. Asegúrate de que ambos están en el mismo host/puerto correcto

## Próximos pasos

1. Genera recursos visuales usando [docs/visual-prompts.md](visual-prompts.md)
2. Reemplaza los divs de colores en `frontend/src/App.tsx` con sprites
3. Añade animaciones si tienes frames múltiples
4. Agrupa sprites en `/frontend/src/assets/sprites/`

## Ayuda y comunidad

- Revisa los logs de ambos servidores si algo falla
- Usa `curl` para testear endpoints del backend directamente
- Abre Issues en GitHub si encuentras bugs

---

**¡Diviértete desarrollando el templo!** 🏛️
