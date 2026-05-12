# Prompts para generar recursos visuales - Pixel Art

Este archivo contiene los prompts necesarios para generar todos los recursos visuales del juego using IA. Se recomienda usar:

- **Midjourney** (mejor calidad de pixel art)
- **Stable Diffusion** (rápido, control fino)
- **OpenAI DALL-E 3** (consistencia visual)

## Recursos principales

### 1. Templo (Icónica central)

**Prompt para Midjourney:**

```
pixel art medieval temple, 8-bit style, stone walls, golden ornaments,
mystical aura, overhead view, 256x256px, game sprite, atmospheric lighting,
by Paul Robertsen, detailed, isometric view, wooden doors, carved columns
```

**Prompt alternativo (Stable Diffusion):**

```
pixel art stone temple, 16-bit retro game, top-down view,
fantasy architecture, glowing altar, mystical energy,
clean lines, vibrant colors, game asset
```

### 2. Creyentes (Aldeanos azules/verdes)

**Prompt para Midjourney:**

```
pixel art villager believer, 8-bit, top-down view, religious outfit,
holding staff or candle, calm expression, blue and green robes,
32x32px sprite, medieval fantasy, by Paul Robertsen,
peaceful demeanor, glowing aura, asset
```

**Prompt alternativo:**

```
pixel art fantasy character believer, 16-bit game sprite,
small person with robe, blue color palette, 32x32px,
calm animation pose, religious symbol on chest, top-down
```

### 3. No-creyentes (Aldeanos grises/marrones)

**Prompt para Midjourney:**

```
pixel art villager unbeliever, 8-bit, top-down view, peasant clothes,
confused expression, brown and grey robes, 32x32px sprite,
medieval fantasy, skeptical demeanor, asset
```

**Prompt alternativo:**

```
pixel art fantasy character skeptic, 16-bit game sprite,
small person with plain clothes, grey color palette, 32x32px,
confused animation pose, uncertain gesture, top-down
```

### 4. Bárbaros (Enemigos rojos/oscuros)

**Prompt para Midjourney:**

```
pixel art barbarian warrior, 8-bit, top-down view, aggressive stance,
red and black armor, holding axe or mace, 32x32px sprite,
medieval dark fantasy, menacing expression, battle-ready pose,
by Paul Robertsen, threatening aura, asset
```

**Prompt alternativo:**

```
pixel art enemy barbarian, 16-bit game sprite, muscular creature,
red and black colors, holding weapon (axe), 32x32px,
attack pose, threatening expression, pixel perfect
```

### 5. Rayo (Efecto visual)

**Prompt para Midjourney:**

```
pixel art lightning bolt, 8-bit, overhead shot, golden yellow color,
electric effect, magical energy, 64x128px animation frame,
glowing impact, mystical spell, game effect, asset,
bright yellow #FFD700, add electrical particles
```

**Prompt alternativo:**

```
pixel art lightning strike effect, 16-bit, vertical bolt,
golden color, 3-4 animation frames, electrical particles,
magical effect, game sprite asset
```

### 6. Ajo (Ofrenda pequeña)

**Prompt para Midjourney:**

```
pixel art garlic, 8-bit, top-down view, golden yellow color,
cloves visible, holy glow around it, 32x32px sprite,
food item, mystical aura, sacred offering, by Paul Robertsen,
asset
```

**Prompt alternativo:**

```
pixel art garlic bulb, 16-bit, 32x32px, golden color,
overhead view, glowing effect, holy aura, food item,
game asset
```

### 7. Altar (Centro del templo)

**Prompt para Midjourney:**

```
pixel art stone altar, 8-bit, top-down view, carved patterns,
golden decorations, mystical glow, 128x96px,
religious ceremonial structure, medieval fantasy,
by Paul Robertsen, detailed, sacred energy, game asset
```

**Prompt alternativo:**

```
pixel art altar, 16-bit overhead view, stone construction,
golden ornaments, 128x96px game sprite, mystical glow,
religious iconography, fantasy game asset
```

### 8. Criaturas especiales (Opcional - futuras oleadas)

**Prompt para bárbaros chamanes:**

```
pixel art shaman barbarian, 8-bit, dark purple and black,
staff with skull, 32x32px, magical aura, threatening,
game sprite asset
```

**Prompt para bárbaros con magia:**

```
pixel art dark mage enemy, 16-bit, purple robes, glowing staff,
32x32px sprite, mystical particles, threatening posture
```

## Estilos recomendados

- **Paul Robertsen** (estilo pixel art clásico)
- **Aseprite-style** (animaciones limpias)
- **NES/SNES** (retro authenticity)
- **Game Boy Color** (limitaciones de paleta, muy pixelado)

## Variaciones de colores sugeridas

| Elemento     | Color Primario           | Color Secundario           | Acentos                     |
| ------------ | ------------------------ | -------------------------- | --------------------------- |
| Templo       | `#8B4513` (marrón)       | `#D4A574` (dorado claro)   | `#FFD700` (oro)             |
| Creyentes    | `#2E8B57` (verde oscuro) | `#90EE90` (verde claro)    | `#FFD700` (halo)            |
| No-creyentes | `#696969` (gris)         | `#A9A9A9` (gris claro)     | `#BEBEBE` (neutral)         |
| Bárbaros     | `#8B0000` (rojo oscuro)  | `#DC143C` (escarlata)      | `#FF4500` (naranja rojo)    |
| Rayos        | `#FFD700` (dorado)       | `#FFFF00` (amarillo)       | `#FFA500` (naranja)         |
| Ajo          | `#FFD700` (dorado)       | `#FFFACD` (amarillo claro) | `#FF6347` (tomate - sombra) |

## Alternativas de IA si no tienes acceso a Midjourney

1. **Stable Diffusion (Recomendado)**
   - Gratis en HuggingFace
   - Control fino con LoRA
   - Mejor para iteraciones rápidas
2. **Leonardo AI**
   - Especializado en assets de juegos
   - Generación rápida
   - Buen control de estilo

3. **Adobe Firefly**
   - Integración con Creative Cloud
   - Buena calidad
   - Herramientas de edición integradas

4. **Itch.io asset packs**
   - Busca packs pixel art retro
   - Usar como base y modificar localmente

## Workflow recomendado

1. **Generar** con Midjourney/Stable Diffusion según prompts
2. **Refinar** con Aseprite o similar si necesitas
3. **Optimizar** colores para paleta del juego
4. **Animar** si es necesario (bárbaros, aldeanos)
5. **Exportar** como PNG 32-bit con transparencia

## Tips para mejores resultados

- Especificar siempre el tamaño en píxeles (32x32, 64x64, etc.)
- Incluir "pixel art", "8-bit" o "16-bit" en el prompt
- Especificar "top-down view" u "overhead"
- Usar "game sprite" o "game asset" al final
- Incluir a artistas conocidos de pixel art (Paul Robertsen, Aseprite autores)
- Pedir "clean lines" para mejor definición
- Especificar paleta de colores si es importante

## Próximos pasos

Una vez generes los sprites:

1. Guardalos en `/frontend/src/assets/sprites/`
2. Actualiza las importaciones en `src/App.tsx`
3. Reemplaza los divs de colores por imágenes
4. Añade animaciones si generaste frames múltiples
