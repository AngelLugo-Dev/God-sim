# Templo God Sim

MVP de un god sim en pixel art, construido con React, Vite y Tailwind CSS.

El proyecto está pensado para trabajarse siempre con pnpm. Ya existe el lockfile de pnpm y el flujo recomendado es no volver a generar `package-lock.json`.

## Arquitectura rápida

- Estado global en `src/App.tsx` con `fe`, `poblacion`, `recursos` e `historial`.
- Un intérprete de comandos simple procesa la consola inferior.
- El templo y los aldeanos se renderizan con divs y animaciones CSS.
- La fe se genera de forma pasiva cada 5 segundos por ciudadano.
- La documentación ampliada vive en `docs/arquitectura-logica.md` y `docs/informe-implementacion.md`.

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

1. Instala dependencias con `pnpm install`.
2. Ejecuta `pnpm dev`.
3. Compila con `pnpm build` cuando quieras validar el estado del proyecto.

## Informe breve

Se creó la base completa del primer commit del prototipo: scaffold Vite + React + TypeScript + Tailwind, UI principal, intérprete de comandos, sistema de fe pasiva, feedback visual para RAYO y documentación base. El proyecto quedó listo para iterar sin backend y con enfoque de prototipado rápido.

## Notas de implementación

- Toda la lógica jugable vive en `src/App.tsx` para iterar rápido.
- La estructura deja margen para separar estado, parser y render más adelante.
- No se incluyó backend: el MVP es 100% frontend para prototipado rápido.
