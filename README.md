# Cineclub Ciudadano 2026

Artefacto digital para la preselección colaborativa de películas del festival Cineclub Ciudadano 2026. Herramienta de trabajo del grupo de Cineclub para distribuir 53 películas entre 5 jurados temáticos y alcanzar un consenso grupal.

## Descripción

La aplicación permite al grupo de trabajo explorar un catálogo de 53 películas de 26 países, crear propuestas individuales de asignación por jurados y compararlas para encontrar puntos de acuerdo. Todo funciona en el navegador, sin necesidad de registro ni backend.

## Páginas

| Página | Ruta | Función |
|--------|------|---------|
| Base de datos | `/` | Catálogo con búsqueda, filtros, sinopsis y datos de cada película |
| Programación | `/programacion` | Kanban de 5 jurados con asignación automática y manual |
| Consenso | `/consenso` | Comparativa de propuestas para encontrar acuerdos |

## Jurados

| Jurado | Público | Criterios de puntuación |
|--------|---------|------------------------|
| Jóvenes | Asociaciones juveniles | Animación, ciencia ficción, comedia |
| Mayores | Personas mayores | Hispanohablante (+5), doblada (+4) |
| Culturales | Cultura y sociales | Temática comunitaria, documental |
| Instagram | Contenido para redes | Visual, tendencia, culto |
| Socies | Esencia de La Quimera | La Quimera (fijada), cine accesible |

## Flujo de uso

1. **Explorar** la base de datos para conocer las películas
2. **Generar propuesta** automática en Programación (asignación inteligente, no al azar)
3. **Ajustar manualmente** moviendo películas entre jurados
4. **Compartir** el enlace de la propuesta en el grupo de WhatsApp
5. **Comparar** todas las propuestas en la página de Consenso
6. **Debatar** las discrepancias y celebrar los acuerdos

## Stack tecnológico

- **Next.js 16** (App Router, Turbopack)
- **TypeScript**
- **Tailwind CSS 4**
- **shadcn/ui** (componentes Radix UI)
- **Framer Motion** (animaciones)
- **localStorage** (persistencia sin backend)

## Instalación y despliegue

```bash
# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Build de producción
npm run build

# Iniciar en producción
npm run start
```

### Despliegue en Vercel

1. Sube el repositorio a GitHub
2. Conecta el repositorio en [vercel.com](https://vercel.com)
3. Despliegue automático, sin configuración adicional

## Estructura del proyecto

```
src/
├── app/
│   ├── page.tsx                  # Base de datos (catálogo principal)
│   ├── programacion/page.tsx     # Kanban de jurados + compartir propuestas
│   ├── consenso/page.tsx         # Comparativa colectiva de propuestas
│   ├── layout.tsx                # Layout raíz (fuentes, metadatos)
│   └── globals.css               # Tema cinematográfico (dark mode)
├── components/ui/                # Componentes shadcn/ui
├── data/
│   └── films.ts                  # Datos de las 53 películas
├── hooks/
│   └── use-mobile.ts             # Hook de detección de móvil
└── lib/
    ├── scoring.ts                # Motor de puntuación y asignación automática
    ├── jury-ui.ts                # Configuración visual de jurados (colores, iconos)
    └── utils.ts                  # Utilidades generales
```

## Notas técnicas

- **Sin backend:** toda la persistencia usa localStorage del navegador
- **Compartir propuestas:** las asignaciones se codifican en base64 dentro de la URL (`?p=...`)
- **Consentimiento:** la página de consenso decodifica múltiples enlaces y cruza las asignaciones
- **Asignación automática:** el motor de scoring puntuca cada película por jurado según géneros, idioma, doblaje y temática
- **La Quimera** siempre se asigna al jurado de Socies

## Licencia

Uso interno del grupo de trabajo de Cineclub.
