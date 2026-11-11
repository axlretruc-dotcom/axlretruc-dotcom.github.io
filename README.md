# 🎮 LUMA GAMES — catálogo de juegos

Portal estático (HTML + CSS + JS vanilla, sin frameworks ni builds) con juegos
destacados, populares, filtros por género y búsqueda. Los juegos web se pueden
jugar dentro del portal en una sala adaptable, con un enlace para abrirlos en
otra pestaña; los juegos descargables conservan su sala e información.

## ▶ Cómo verla

Doble clic en `index.html` (funciona sin servidor), o con VS Code usá
"Open with Live Server" para verlo en el navegador.

## 🗂 Estructura

```
game-portfolio/
├── index.html      ← estructura de la página (rara vez lo tocás)
├── styles.css      ← estilos, temas y fondos animados
├── app.js          ← ★ ACÁ VIVEN TUS JUEGOS (CONFIG + lista JUEGOS)
├── favicon.svg
├── descargas/
│   ├── B.O.L.U.D.O.zip
├── robots.txt      ← editar TU_DOMINIO antes de publicar
├── sitemap.xml     ← editar TU_DOMINIO antes de publicar
├── img/
│   └── capturas/
│       ├── neon-drift/      (placeholder-1/2/3.svg ← reemplazar)
│       └── hollow-pines/    (placeholder-1/2/3.svg ← reemplazar)
├── fonts/          ← acá van tus .ttf/.woff propios (opcional)
└── SFX/            ← acá van tus .wav/.mp3 propios (opcional)
```

## ✏️ Qué editar

### 1. Tu información general — bloque `CONFIG` en `app.js`
Estudio, tagline, link base de descargas (`buildPorDefecto`, idealmente un
[GitHub Release](https://github.com/tu-usuario/tu-repo/releases/latest)) y redes.

### 2. Tus juegos — lista `JUEGOS` en `app.js`
Para agregar un juego: copiá un bloque `{ ... }` completo, pegalo en la lista y
editá sus datos. Los juegos con `url` se muestran dentro de la sala mediante un
iframe; los que solo tienen `build` conservan la sala y descarga.

| Campo | Qué es |
|---|---|
| `id` | sin espacios ni ñ (identificador) |
| `titulo`, `tagline`, `descripcion` | textos de tarjeta y sala |
| `generos`, `plataforma`, `tamano` | filtros, chips y metadatos |
| `url` | dirección del juego web (opcional) |
| `portada`, `portadaClase` | imagen de tarjeta y fondo de respaldo |
| `popular`, `destacado`, `badge` | presencia en secciones y etiqueta |
| `capturas` | rutas a imágenes (ideal 16:9, ej. 1280×720) |
| `requisitos` | `{ min: [...], rec: [...] }` (opcional) |
| `build` | `{ url, etiqueta }` del botón de descarga (opcional) |
| `tema` | **lo que cambia la estética**: paleta, fuentes y fondo |

El catálogo incluye los juegos web **Breachpoint** y **Larry 2.0**, y conserva
**B.O.L.U.D.O** y **The Nightmare True Live** como juegos descargables. El ZIP de
**B.O.L.U.D.O** está en `descargas/`; **The Nightmare True Live** se descarga
desde Google Drive. Descargá los archivos de la carpeta y mantené el `.exe` y
el `.pck` juntos al ejecutarlo. Así el archivo grande no necesita estar
dentro del repositorio de GitHub Pages.

### 3. Fondos animados por tema — en `styles.css`
Viene `fondo-grid` (synthwave) y `fondo-niebla` (terror). Para crear otro:
agregá `.fondo-tunombre { ... }` en la sección FONDOS TEMÁTICOS y usalo como
`tema.fondoClase: 'fondo-tunombre'`.

## 🖼 Reemplazar las capturas placeholder

Exportá tus capturas como PNG/JPG (recomendado 1280×720) dentro de
`img/capturas/<id-del-juego>/` y actualizá las rutas en `capturas` de cada
juego. El lightbox (vista ampliada al clickear) funciona solo.

## 🔤 Fuentes propias (opcional)

1. Copiá los `.ttf`/`.woff` a `fonts/`.
2. Agregá al inicio de `styles.css`:
   ```css
   @font-face {
     font-family: 'MiFuente';
     src: url('fonts/MiFuente.ttf') format('truetype');
     font-display: swap;
   }
   ```
3. Usala en el tema del juego: `fuentes: { titulo: "'MiFuente', serif", cuerpo: "..." }`.

Por defecto usa fuentes del sistema (nada de CDNs, funciona 100% offline).

## 🔊 Sonidos propios (opcional)

Los sonidos de menú son sintetizados con Web Audio (sin archivos). Para usar
archivos tuyos, en `app.js` (sección 3) reemplazá el contenido de
`sndHover` / `sndSelect` / `sndVolver` por:
```js
const sndHover = () => new Audio('SFX/tu-hover.wav').play().catch(() => {});
```

## 🌐 Publicar gratis en GitHub Pages

1. Creá un repo nuevo en GitHub (ej. `tusjuegos`).
2. Subí el contenido de esta carpeta:
   ```bash
   git init
   git add .
   git commit -m "primer commit"
   git remote add origin https://github.com/TU_USUARIO/tusjuegos.git
   git push -u origin main
   ```
3. En el repo: *Settings → Pages → Branch: main → Save*.
4. En unos minutos queda en `https://TU_USUARIO.github.io/tusjuegos/`.
5. Actualizá `robots.txt`, `sitemap.xml` y el título/descripción del
   `<head>` de `index.html` con tu URL real (descomentá las meta OG cuando
   tengas una imagen 1200×630 para compartir).

## 💡 Tips

- **Escritorio**: las descargas son de escritorio; en móvil aparece un aviso
  automático en cada sala.
- **Teclado**: los controles del catálogo son botones y enlaces accesibles;
  `Esc` vuelve desde la sala de un juego o cierra una captura ampliada.
- **Movimiento reducido**: si el sistema pide menos animaciones, se respetan.
- Material con derechos de terceros (música, fuentes, arte): solo usá lo que
  tengas derecho a usar (propio, CC0, o con licencia que lo permita).
