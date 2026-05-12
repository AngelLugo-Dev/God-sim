# Templo God Sim

MVP de un god sim en pixel art, construido con React, Vite y Tailwind CSS.

## Loop principal

- Escribe comandos en la consola inferior.
- Gestiona `fe`, `poblacion`, `recursos` e `historial`.
- El templo genera fe de forma pasiva por ciudadano cada 5 segundos.
- Los aldeanos se mueven de forma aleatoria sobre el mapa.

## Comandos

- `CREAR_CIUDADANO`: añade un ciudadano si no se alcanzó el límite de 5.
- `RAYO`: consume 10 de fe y dispara un flash visual.
- `DAR_AJO`: añade un ajo al altar.
- `AYUDA`: muestra la lista de comandos.

## Arranque

1. Instala dependencias con `npm install`.
2. Ejecuta `npm run dev`.
3. Compila con `npm run build` cuando quieras validar el estado del proyecto.

## Notas de implementación

- Toda la lógica jugable vive en `src/App.tsx` para iterar rápido.
- La estructura deja margen para separar estado, parser y render más adelante.
- No se incluyó backend: el MVP es 100% frontend para prototipado rápido.
