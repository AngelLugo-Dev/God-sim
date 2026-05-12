# Arquitectura lógica

## Objetivo

El juego se diseñó como un prototipo rápido de God Sim en pixel art con una sola pantalla, una terminal como entrada principal y una simulación ligera en tiempo real.

## Capas lógicas

### 1. Estado del juego

El estado vive en `src/App.tsx` y se concentra en un único objeto `game` con estos bloques:

- `fe`: moneda espiritual del juego.
- `poblacion`: lista de ciudadanos con nombre e identificador.
- `recursos`: recursos simples del templo, por ahora `ajo` y `artefactos`.
- `historial`: log narrativo de eventos y acciones.

### 2. Entrada del jugador

La consola inferior recibe texto libre. Un intérprete transforma el texto a mayúsculas y resuelve los comandos soportados:

- `CREAR_CIUDADANO`
- `RAYO`
- `DAR_AJO`
- `AYUDA`
- `ESTADO`

### 3. Simulación

La simulación se basa en dos bucles temporales:

- Cada 5 segundos, cada ciudadano aporta 1 punto de fe.
- Cada cierto intervalo, los aldeanos cambian de posición para dar vida al templo.

### 4. Render

La escena superior se construye con divs, gradientes y utilidades de Tailwind. El templo usa formas básicas tipo pixel art y los aldeanos son círculos pequeños con movimiento suave.

### 5. Feedback visual

El comando `RAYO` activa un flash amarillo. `DAR_AJO` añade ofrendas visibles en el altar. El historial muestra el resultado de cada acción.

## Decisiones de diseño

- Mantener todo en `App.tsx` para acelerar iteración temprana.
- Evitar dependencias innecesarias para no frenar el primer ciclo del prototipo.
- Separar la lógica en funciones pequeñas para poder extraerlas luego a hooks o módulos si el proyecto crece.

## Próximos cortes naturales

- Separar parser de comandos en un módulo propio.
- Extraer el estado del juego a un reducer.
- Añadir eventos aleatorios, muerte o conversión de aldeanos.
- Convertir el templo en una escena tileada si el prototipo se expande.
