# Guía de herramientas de IA para generar recursos

## Opciones recomendadas por ranking

### 1. ⭐ Midjourney (MEJOR CALIDAD)

**Pros:**

- Mejor calidad de pixel art
- Consistencia visual excelente
- Control fino con parámetros
- Comunidad grande de gamers

**Contras:**

- Requiere pago ($10-20/mes)
- Requiere Discord
- Cuota de generaciones

**Cómo usar:**

```
1. Ve a https://midjourney.com
2. Únete al Discord
3. Usa comando /imagine
4. Copia el prompt de visual-prompts.md
5. Agrega parámetros: --niji --ar 1:1 --style raw
```

**Parámetros útiles:**

```
--niji        → Estilo anime/pixel art mejorado
--ar 1:1      → Cuadrado (ideal para sprites)
--style raw   → Sin post-procesamiento
--s 250       → Estilo (0-1000)
--q 2         → Calidad máxima
```

---

### 2. 🔥 Stable Diffusion (RECOMENDADO PARA MVP)

**Pros:**

- Gratis (en HuggingFace)
- Rápido (5-30 seg)
- Control muy fino
- Fácil reproducción

**Contras:**

- Requiere algo de setup técnico
- Calidad variable
- Necesita VRAM de GPU

**Opciones sin instalar localmente:**

#### A. Hugging Face Spaces (GRATUITO)

```
1. Ve a https://huggingface.co/spaces/
2. Busca: "Stable Diffusion"
3. Usa cualquier space público (Dreambooth, etc.)
4. Pega el prompt
5. Espera el resultado
```

#### B. Leonardo AI (RECOMENDADO)

```
1. Ve a https://leonardo.ai
2. Regístrate gratis
3. Crea proyecto "God Sim"
4. Usa "Pixel Art" preset
5. Pega prompts de visual-prompts.md
6. Descarga spritesheet
```

**Ventajas Leonardo:**

- UI muy amigable
- Optimizado para game assets
- Presets de pixel art
- Generación rápida
- Créditos mensuales gratis

---

### 3. 💎 DALL-E 3 (ChatGPT Plus)

**Pros:**

- Interfaz súper simple
- Excelente para iteraciones
- Buen seguimiento de prompts

**Contras:**

- Requiere ChatGPT+ ($20/mes)
- Menos especializado en pixel art

**Cómo usar:**

```
1. Ve a https://chat.openai.com
2. Abre GPT-4 Vision
3. Pega el prompt
4. Pide: "Este prompt es para pixel art de 8-bit"
5. Descarga la imagen
```

---

### 4. 🎨 itch.io Asset Packs (GRATIS, SIN GENERAR)

Si prefieres no generar, usa packs existentes:

```
https://itch.io/game-assets/tag-pixelart

Busca:
- "fantasy characters"
- "medieval sprites"
- "barbarian"
- "temple"
- "effects"
```

---

## Flujo recomendado según tu caso

### Opción A: Máxima calidad (MIDJOURNEY)

```
1. Compra Midjourney ($10)
2. Usa Discord con los prompts
3. Itera 2-3 veces hasta que quede perfecto
4. Descarga en máxima resolución
5. Usa Aseprite para últimos ajustes
6. Exporta como PNG 32-bit
```

### Opción B: Rápido y gratis (STABLE DIFFUSION + LEONARDO)

```
1. Ve a Leonardo AI
2. Copia prompts de visual-prompts.md
3. Genera cada sprite en <1 min
4. Descarga PNG con transparencia
5. Coloca en /frontend/src/assets/sprites/
6. Importa en App.tsx
```

### Opción C: Híbrido (STABLE DIFFUSION + LEONARDO + DALL-E)

```
1. Genera concept con Leonardo (rápido)
2. Refina con DALL-E si no queda bien
3. Ajusta manualmente en Aseprite si necesitas
4. Usa itch.io assets como fallback
```

### Opción D: Sin generar (ITCH.IO)

```
1. Busca en itch.io/game-assets
2. Descarga packs que coincidan con el estilo
3. Modifica colores si necesitas
4. Úsalos directamente
```

---

## Herramientas complementarias para editar

### Aseprite (RECOMENDADO)

- **Costo**: $20 (o gratis si lo compras en itch.io)
- **Uso**: Editar, animar, exportar spritesheet
- **Comando**: Exportar como PNG con transparencia

```bash
# Batch export si tienes múltiples
aseprite -b input.ase --save-as output.png
```

### Piskel (GRATIS)

- **URL**: https://piskelapp.com
- **Uso**: Editor pixel art online
- **Ventaja**: No requiere instalación

### ImageMagick (GRATIS, CLI)

- **Comando**: Resize, batch convert, optimizar

```bash
# Resize a 32x32
convert input.png -resize 32x32\! output.png

# Batch convert a PNG
for f in *.jpg; do convert "$f" "${f%.jpg}.png"; done
```

---

## Pasos prácticos para generar tus sprites

### 1️⃣ Prepara los prompts

```
Copia cada prompt de docs/visual-prompts.md a un archivo:
prompts.txt
```

### 2️⃣ Genera con Leonardo AI (RECOMENDADO)

```
1. Ve a https://leonardo.ai
2. Crea proyecto "God Sim Sprites"
3. Copia primer prompt (Templo)
4. Cambia modelo a "Leonardo Diffusion" (mejor pixel art)
5. Genera 2-3 variaciones
6. Selecciona la mejor
7. Descarga PNG
8. Repite para cada sprite
```

### 3️⃣ Organiza archivos

```
frontend/src/assets/
├── sprites/
│   ├── temple.png       (256x256)
│   ├── believer.png     (32x32)
│   ├── unbeliever.png   (32x32)
│   ├── barbarian.png    (32x32)
│   ├── lightning.png    (64x128)
│   ├── garlic.png       (32x32)
│   └── altar.png        (128x96)
└── sfx/
    ├── lightning.wav
    ├── death.wav
    └── victory.wav
```

### 4️⃣ Importa en React

```typescript
import templeSprite from '@/assets/sprites/temple.png'
import believerSprite from '@/assets/sprites/believer.png'
// etc...

export function App() {
  return (
    <img src={templeSprite} className="w-64 h-64" />
  )
}
```

### 5️⃣ Valida colores

```typescript
// Si el fondo no es transparente, ajusta en CSS
.sprite {
  image-rendering: pixelated;  // Mantiene pixeles crispí
  image-rendering: crisp-edges;  // Alternative
}
```

---

## Comparación rápida

| Herramienta          | Costo      | Calidad    | Velocidad  | Facilidad  |
| -------------------- | ---------- | ---------- | ---------- | ---------- |
| **Midjourney**       | $10-20/mes | ⭐⭐⭐⭐⭐ | ⭐⭐⭐     | ⭐⭐⭐     |
| **Leonardo AI**      | Gratis     | ⭐⭐⭐⭐   | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| **Stable Diffusion** | Gratis     | ⭐⭐⭐     | ⭐⭐⭐⭐   | ⭐⭐⭐     |
| **DALL-E 3**         | $20/mes    | ⭐⭐⭐⭐   | ⭐⭐⭐     | ⭐⭐⭐⭐⭐ |
| **itch.io packs**    | Gratis-$5  | Variable   | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐   |

---

## Mi recomendación personal

Para este MVP: **Leonardo AI (gratis) + itch.io packs como backup**

```
Razón:
1. Gratis (importante para prototipos)
2. Rápido (itera en 5 min)
3. UI muy amigable
4. Excelente para game assets
5. Créditos mensuales gratis
6. Si algo falla, descargas asset pack de itch.io
```

---

## Next steps

1. Elige tu herramienta (recomiendo Leonardo)
2. Genera sprites usando prompts de `visual-prompts.md`
3. Organiza en `/frontend/src/assets/sprites/`
4. Importa en `App.tsx`
5. Reemplaza divs de colores por imágenes
6. Haz commit con los sprites nuevos

---

**¡Diviértete generando los recursos!** 🎨
