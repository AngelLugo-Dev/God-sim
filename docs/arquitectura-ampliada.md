# Arquitectura ampliada - Backend + Sistema de creyentes y bárbaros

## Cambios principales

### 1. División Frontend/Backend

```
/frontend   → React Vite (UI y consola)
/backend    → Node.js Express (lógica del juego)
```

El backend ahora contiene **toda la lógica del juego**, incluyendo:

- Estado persistente del juego
- Cálculos de fe
- Oleadas de bárbaros
- Conversiones de creyentes

### 2. Sistema de ciudadanos refinado

#### Tipos de ciudadanos

- **BELIEVER (Creyente)**: Genera fe. Los primeros 5 ciudadanos son automáticamente creyentes.
- **UNBELIEVER (No-creyente)**: Ocupa vivienda pero no genera fe. El jugador debe convertirlos.

**Código:**

```typescript
export enum CitizenType {
  BELIEVER = "believer", // Genera fe
  UNBELIEVER = "unbeliever", // No genera fe
}
```

**Mecánica:**

- Primer ciudadano: Creyente automáticamente
- Ciudadanos 2-5: Creyentes automáticamente
- Ciudadano 6+: No-creyentes (deben convertirse)
- Conversión: Requiere fe o actividades especiales

### 3. Sistema de bárbaros

**Regla de spawn:**

- Se generan **cuando hay 5+ ciudadanos**
- Primera oleada aparece automáticamente
- Cada oleada trae 2 bárbaros cada ~8 segundos

**Comportamiento:**

- Eligen ciudadano al azar como objetivo
- Atacan cada tick
- Mueren si reciben un RAYO
- El jugador debe defender su población

**Lógica de combate simplificada:**

```typescript
barbarian.health = 10;
barbarian.damage = 3;
playerLightning.damage = barbarian.health; // Mata en un golpe
```

### 4. Flujo de ticks de tiempo real

El backend ejecuta dos bucles en paralelo:

**Tick de Fe (cada 5 segundos):**

```
- Suma: fe += (número de creyentes) * 1
- Log: "La fe crece..."
```

**Tick de bárbaros (cada 8 segundos):**

```
- Genera nuevos bárbaros si se cumple condición
- Procesa ataques a ciudadanos
- Elimina bárbaros muertos
- Aumenta contador de oleadas
```

### 5. Puntos de extensión natural

**Fácil agregar:**

- Nuevos tipos de ciudadanos (sabios, guerreros, etc.)
- Nuevos tipos de enemigos
- Sistemas de construcción (viviendas, defensas)
- Eventos aleatorios
- Guardado de partida en BD

## Cambios de entrada en el frontend

El frontend ahora **NO calcula**, solo **envía comandos** y **recibe estado**:

**Antes:**

```javascript
// Todo en React
setGame((prev) => ({
  ...prev,
  fe: prev.fe + creyentes.length,
}));
```

**Ahora:**

```javascript
// Envía al backend
await fetch("/api/game/citizen/create", { method: "POST", body: { nombre } });
const state = await fetch("/api/game/state").then((r) => r.json());
```

## Stack completo

| Capa         | Tecnología              | Responsabilidad       |
| ------------ | ----------------------- | --------------------- |
| **Frontend** | React + Vite + Tailwind | UI, consola, render   |
| **Backend**  | Node.js + Express       | Lógica, estado, ticks |
| **API**      | REST sobre HTTP         | Comunicación F/B      |
| **Data**     | En memoria (por ahora)  | Estado del juego      |

## Próximos pasos naturales

1. **Persistencia**: Guardar estado en SQLite o PostgreSQL
2. **Multijugador**: WebSockets para múltiples templos
3. **Eventos emergentes**: Sistemas de sucesos aleatorios
4. **IA de ciudadanos**: Comportamiento autónomo
5. **Modulos backend alternos**: Go, Rust, Python para comparar

## Recomendaciones

- **Para prototipado rápido**: Mantén todo en memoria (ahora)
- **Para producción pequeña**: Agrega SQLite
- **Para escalar**: PostgreSQL + Redis
