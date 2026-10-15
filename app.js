'use strict';
/* ════════════════════════════════════════════════════════════
   1) CONFIGURACIÓN GENERAL — editá esto con tu información
   ════════════════════════════════════════════════════════════ */
const CONFIG = {
  estudio: 'LUMA GAMES',                              // nombre del estudio
  tagline: 'Cada juego, un mundo distinto.',
  notaPlataforma: 'DESCARGAS PARA WINDOWS Y LINUX · GRATIS',
  splashSub: 'juegos hechos con amor · un género por vez',
  sobreTexto: 'Somos un estudio independiente que hace juegos de géneros muy distintos entre sí: ' +
              'si un día es un arcade frenético, al siguiente es una historia tranquila en un bosque. ' +
              'Esta página es la puerta de entrada a todos ellos.',
  contactoTexto: '¿Ideas, bugs o ganas de charlar? Escribinos por donde te quede más cómodo.',
  // Link base de descargas por defecto (GitHub Releases recomendado).
  // Podés pisarlo juego por juego en su campo "build".
  buildPorDefecto: 'https://github.com/TU_USUARIO/TU_REPO/releases/latest',
  redes: {
    // Poné tu link real o borrá la línea para ocultarla
    'itch.io':   'https://tuestudio.itch.io',
    'YouTube':   'https://youtube.com/@tucanal',
    'Twitter/X': 'https://x.com/tucuenta',
    'Discord':   'https://discord.gg/tudiscord',
    'Email':     'mailto:hola@ejemplo.com'
  }
};

/* ════════════════════════════════════════════════════════════
   2) TUS JUEGOS — para agregar uno nuevo, copiá un bloque
      completo {...} de la lista, pegalo antes del comentario
      final y editalo. Campos:
        id          → sin espacios ni ñ
        titulo      → nombre del juego
        tagline     → una línea corta
        generos     → lista de géneros (chips)
        plataforma  → texto libre, ej: "Windows · Linux"
        tamano      → texto libre, ej: "~80 MB"
        descripcion → párrafo de la sala
        capturas    → rutas a imágenes (ideal 16:9, ej 1280x720)
        requisitos  → { min: [...], rec: [...] }   (opcional)
        build       → { url, etiqueta }            (opcional)
        tema:
          fondoClase → 'fondo-grid' | 'fondo-niebla' | '' (ver styles.css)
          colores    → paleta de la sala
          fuentes    → { titulo, cuerpo }
   ════════════════════════════════════════════════════════════ */
const JUEGOS = [
  {
    id: 'neon-drift',
    titulo: 'NEON DRIFT',
    tagline: 'Deslizate por la autopista infinita antes de que el sol sintético se apague.',
    generos: ['Arcade', 'Carreras', 'Ritmo'],
    plataforma: 'Windows · Linux',
    tamano: '~80 MB',
    descripcion: 'Un arcade de carreras synthwave donde la velocidad es vida. Esquivá tráfico, ' +
                 'encadená drifts perfectos y bancá la banda sonora mientras la ciudad neón se ' +
                 'derrite detrás de vos. Una sola carrera, infinitas vueltas, récords para batir.',
    capturas: [
      'img/capturas/neon-drift/placeholder-1.svg',
      'img/capturas/neon-drift/placeholder-2.svg',
      'img/capturas/neon-drift/placeholder-3.svg'
    ],
    requisitos: {
      min: ['Windows 10 / Ubuntu 20.04', '4 GB de RAM', 'GPU con soporte WebGL', '500 MB de espacio'],
      rec: ['Windows 11', '8 GB de RAM', 'GPU dedicada', 'auriculares (para el ritmo)']
    },
    tema: {
      fondoClase: 'fondo-grid',
      colores: {
        fondo: '#0b0614', primario: '#ff2fd6', acento: '#2ff3ff',
        texto: '#f2e9ff', borde: 'rgba(255,47,214,.85)'
      },
      fuentes: {
        titulo: "'Trebuchet MS', 'Segoe UI', sans-serif",
        cuerpo: "'Segoe UI', system-ui, sans-serif"
      }
    }
  },
  {
    id: 'hollow-pines',
    titulo: 'HOLLOW PINES',
    tagline: 'Un pueblo olvidado, un bosque que respira y una linterna que se apaga despacio.',
    generos: ['Terror', 'Aventura', 'Exploración'],
    plataforma: 'Windows',
    tamano: '~150 MB',
    descripcion: 'Terror atmosférico sin jumpscares: explorá las Hollow Pines de noche, hablá con ' +
                 'sus últimos habitantes y descubrí por qué el camino del bosque siempre te devuelve ' +
                 'al mismo lugar. Historia lineal, ~2 horas, con final dependiente de tus decisiones.',
    capturas: [
      'img/capturas/hollow-pines/placeholder-1.svg',
      'img/capturas/hollow-pines/placeholder-2.svg',
      'img/capturas/hollow-pines/placeholder-3.svg'
    ],
    requisitos: {
      min: ['Windows 10', '4 GB de RAM', 'DirectX 11', 'auriculares recomendados'],
      rec: ['Windows 11', '8 GB de RAM', 'SSD']
    },
    build: { url: CONFIG.buildPorDefecto, etiqueta: 'DESCARGAR DEMO GRATIS' },
    tema: {
      fondoClase: 'fondo-niebla',
      colores: {
        fondo: '#0a120a', primario: '#c9d8b0', acento: '#ffa33c',
        texto: '#e6e9dd', borde: 'rgba(160,190,130,.8)'
      },
      fuentes: {
        titulo: "Georgia, 'Times New Roman', serif",
        cuerpo: "Georgia, 'Times New Roman', serif"
      }
    }
  }
  /* ── acá va tu próximo juego: copiá un bloque {...} y pegalo acá ── */
];

/* ════════════════════════════════════════════════════════════
   3) SONIDOS (Web Audio, sin archivos). Si querés usar tus
      propios .wav/.mp3, reemplazá cada sndX por:
      const sndHover = () => new Audio('SFX/tu-sonido.wav').play().catch(() => {});
   ════════════════════════════════════════════════════════════ */
let audioCtx = null;
function initAudio() {
  try { audioCtx = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) { audioCtx = null; }
}
function tono(freq, dur, tipo, vol, retardo) {
  if (!audioCtx) return;
  try {
    const t = audioCtx.currentTime + (retardo || 0);
    const osc = audioCtx.createOscillator();
    const gan = audioCtx.createGain();
    osc.type = tipo || 'square';
    osc.frequency.value = freq;
    gan.gain.setValueAtTime(vol || 0.04, t);
    gan.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    osc.connect(gan).connect(audioCtx.destination);
    osc.start(t);
    osc.stop(t + dur + 0.02);
  } catch (e) { /* silencio */ }
}
const sndHover  = () => tono(660, 0.06, 'square', 0.035);
const sndSelect = () => { tono(440, 0.08, 'square', 0.05); tono(880, 0.12, 'square', 0.05, 0.08); };
const sndVolver = () => { tono(520, 0.08, 'square', 0.045); tono(330, 0.12, 'square', 0.045, 0.08); };

/* ════════════════════════════════════════════════════════════
   4) SPLASH DE ENTRADA
   ════════════════════════════════════════════════════════════ */
const splash = document.getElementById('splash');
let splashListo = false;

function entrarAlSitio() {
  if (splashListo) return;
  splashListo = true;
  initAudio();
  sndSelect();
  splash.style.transition = 'opacity .7s ease';
  splash.style.opacity = '0';
  document.body.classList.remove('bloquear-scroll');
  setTimeout(() => splash.remove(), 750);
  document.getElementById('main-navbar').classList.add('visible');
}
splash.addEventListener('click', entrarAlSitio);
splash.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); entrarAlSitio(); }
});
window.addEventListener('keydown', (e) => {
  if (!splashListo) { entrarAlSitio(); e.preventDefault(); }
});

/* ════════════════════════════════════════════════════════════
   5) FONDO DE ESTRELLAS (canvas) + APLICAR TEMA POR JUEGO
   ════════════════════════════════════════════════════════════ */
const canvas = document.getElementById('void-canvas');
const ctx2d  = canvas.getContext('2d');
const reducirMovimiento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
let estrellas = [];
let colorEstrellas = 'rgba(255,255,255,';
let colorFondo = '#050507';

function hexArgba(hex) {
  const h = hex.replace('#', '');
  const n = parseInt(h.length === 3 ? h.split('').map(ch => ch + ch).join('') : h, 16);
  return 'rgba(' + ((n >> 16) & 255) + ',' + ((n >> 8) & 255) + ',' + (n & 255) + ',';
}

function ajustarCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const cantidad = Math.min(140, Math.floor((canvas.width * canvas.height) / 14000));
  estrellas = Array.from({ length: cantidad }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 1.4 + 0.3,
    v: Math.random() * 0.25 + 0.04,
    p: Math.random() * Math.PI * 2
  }));
}
function animarEstrellas(t) {
  ctx2d.fillStyle = colorFondo;
  ctx2d.fillRect(0, 0, canvas.width, canvas.height);
  for (const s of estrellas) {
    if (!reducirMovimiento) {
      s.y += s.v;
      if (s.y > canvas.height) { s.y = -4; s.x = Math.random() * canvas.width; }
    }
    const brillo = 0.35 + 0.35 * Math.sin(t / 600 + s.p);
    ctx2d.fillStyle = colorEstrellas + brillo.toFixed(2) + ')';
    ctx2d.beginPath();
    ctx2d.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx2d.fill();
  }
  requestAnimationFrame(animarEstrellas);
}
window.addEventListener('resize', ajustarCanvas);
ajustarCanvas();
requestAnimationFrame(animarEstrellas);

/* Aplica una paleta al sitio entero (canvas + variables CSS).
   tema = null → paleta neutra del menú principal. */
function aplicarTema(tema) {
  const root = document.documentElement.style;
  if (!tema) {
    colorFondo = '#050507';
    colorEstrellas = 'rgba(255,255,255,';
    root.setProperty('--void', '#050507');
    root.setProperty('--texto', '#f5f5f7');
    root.setProperty('--texto-dim', '#9a9aa5');
    root.setProperty('--primario', '#ffffff');
    root.setProperty('--acento', '#8ab4ff');
    root.setProperty('--borde', 'rgba(255,255,255,.9)');
    root.setProperty('--fuente-titulo', "ui-monospace, 'Cascadia Mono', 'Consolas', 'Courier New', monospace");
    root.setProperty('--fuente-cuerpo', "'Segoe UI', system-ui, -apple-system, sans-serif");
    return;
  }
  const c = tema.colores;
  colorFondo = c.fondo;
  colorEstrellas = hexArgba(c.acento);
  root.setProperty('--void', c.fondo);
  root.setProperty('--texto', c.texto);
  root.setProperty('--texto-dim', c.texto + 'b3');
  root.setProperty('--primario', c.primario);
  root.setProperty('--acento', c.acento);
  root.setProperty('--borde', c.borde || c.acento);
  root.setProperty('--fuente-titulo', tema.fuentes.titulo);
  root.setProperty('--fuente-cuerpo', tema.fuentes.cuerpo);
}

/* ════════════════════════════════════════════════════════════
   6) NAVEGACIÓN SPA + TRANSICIONES
   ════════════════════════════════════════════════════════════ */
const transicion  = document.getElementById('transicion');
const transTitulo = document.getElementById('trans-titulo');
const pageHome    = document.getElementById('page-home');
const pageJuego   = document.getElementById('page-juego');
let juegoActual   = null;   // id del juego abierto, o null si estamos en home
let navegando     = false;

function cambiarPagina(nueva, alTerminar) {
  const actual = document.querySelector('.page.active');
  if (!actual || actual === nueva) { if (alTerminar) alTerminar(); return; }
  actual.classList.add('leaving');
  setTimeout(() => {
    actual.classList.remove('active', 'leaving');
    nueva.classList.add('active');
    window.scrollTo({ top: 0 });
    observarReveals(nueva);
    if (alTerminar) alTerminar();
  }, 380);
}

function irAHome() {
  if (navegando || (!juegoActual && pageHome.classList.contains('active'))) return;
  navegando = true;
  sndVolver();
  juegoActual = null;
  aplicarTema(null); // volvemos a la paleta neutra
  cambiarPagina(pageHome, () => { navegando = false; });
}

function irAJuego(id) {
  if (navegando) return;
  const juego = JUEGOS.find(j => j.id === id);
  if (!juego) return;
  navegando = true;
  sndSelect();

  // Pantalla de transición con la estética del juego entrante
  transTitulo.textContent = juego.titulo;
  aplicarTema(juego.tema);
  transicion.classList.add('activa');

  setTimeout(() => {
    renderSala(juego);
    juegoActual = id;
    cambiarPagina(pageJuego);
    setTimeout(() => {
      transicion.classList.remove('activa');
      navegando = false;
    }, 550);
  }, 1300);
}

/* ════════════════════════════════════════════════════════════
   7) RENDER DE LA SALA DEL JUEGO
   ════════════════════════════════════════════════════════════ */
function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }

function renderSala(j) {
  const build = j.build || { url: CONFIG.buildPorDefecto, etiqueta: 'DESCARGAR' };
  const req = j.requisitos || null;

  const html = `
    <div class="sala">
      <div class="sala-hero">
        <div class="sala-fondo ${j.tema.fondoClase || ''}"></div>
        <div class="sala-generos">${j.generos.map(g => `<span class="chip">${esc(g)}</span>`).join('')}</div>
        <h1 class="sala-titulo">${esc(j.titulo)}</h1>
        <p class="sala-tagline">${esc(j.tagline)}</p>
        <div class="sala-meta">
          <span>${esc(j.plataforma)}</span>
          <span>${esc(j.tamano || '')}</span>
          <span>DESCARGA DIRECTA</span>
        </div>
      </div>

      <div class="sala-bloque reveal">
        <h2>EL JUEGO</h2>
        <p>${esc(j.descripcion).replace(/\n/g, '<br>')}</p>
      </div>

      ${j.capturas && j.capturas.length ? `
      <div class="sala-bloque reveal">
        <h2>CAPTURAS</h2>
        <div class="galeria">
          ${j.capturas.map((src, i) => `<img src="${esc(src)}" alt="Captura ${i + 1} de ${esc(j.titulo)}" loading="lazy">`).join('')}
        </div>
      </div>` : ''}

      ${req ? `
      <div class="sala-bloque reveal">
        <h2>REQUISITOS</h2>
        <div class="specs-grid">
          <div class="spec-caja"><h3>Mínimos</h3><ul>${req.min.map(r => `<li>${esc(r)}</li>`).join('')}</ul></div>
          ${req.rec ? `<div class="spec-caja"><h3>Recomendados</h3><ul>${req.rec.map(r => `<li>${esc(r)}</li>`).join('')}</ul></div>` : ''}
        </div>
      </div>` : ''}

      <div class="sala-bloque reveal">
        <div class="bloque-descarga">
          <div class="aviso-movil">⚠ Este juego es de escritorio. Podés descargarlo igual desde tu PC o mandarte el link a tu mail.</div>
          <a class="btn-descarga" href="${esc(build.url)}" target="_blank" rel="noopener">${esc(build.etiqueta || 'DESCARGAR')}</a>
          <p class="descarga-nota">${esc(j.plataforma)} · ${esc(j.tamano || '')} · el link abre en una pestaña nueva</p>
        </div>
      </div>

      <button class="btn-volver" id="btn-volver">◀ VOLVER AL MENÚ</button>
    </div>`;

  pageJuego.innerHTML = html;
  document.getElementById('btn-volver').addEventListener('click', irAHome);

  // Lightbox: clic en una captura → vista ampliada
  pageJuego.querySelectorAll('.galeria img').forEach(img => {
    img.addEventListener('click', () => {
      document.getElementById('lightbox-img').src = img.src;
      document.getElementById('lightbox').classList.add('abierto');
    });
  });
}

const lightbox = document.getElementById('lightbox');
lightbox.addEventListener('click', () => lightbox.classList.remove('abierto'));

/* ════════════════════════════════════════════════════════════
   8) ARMADO DEL HOME (botones, textos, redes, footer)
   ════════════════════════════════════════════════════════════ */
const menuJuegos = document.getElementById('menu-juegos');
JUEGOS.forEach(j => {
  const btn = document.createElement('button');
  btn.className = 'nav-button';
  btn.id = 'btn-' + j.id;
  btn.innerHTML = `<span>${esc(j.titulo)}</span><span class="btn-genero">${esc(j.generos.join(' · '))}</span>`;
  btn.addEventListener('click', () => irAJuego(j.id));
  btn.addEventListener('mouseenter', sndHover);
  btn.addEventListener('focus', sndHover);
  menuJuegos.appendChild(btn);
});

// Textos desde CONFIG
document.getElementById('splash-titulo').textContent = CONFIG.estudio;
document.querySelector('#splash .splash-sub').textContent = CONFIG.splashSub;
document.getElementById('home-logo').textContent = CONFIG.estudio;
document.getElementById('navbar-marca').textContent = CONFIG.estudio;
document.getElementById('home-tagline').textContent = CONFIG.tagline;
document.getElementById('home-nota-plataforma').textContent = CONFIG.notaPlataforma;
document.getElementById('sobre-texto').textContent = CONFIG.sobreTexto;
document.getElementById('contacto-texto').textContent = CONFIG.contactoTexto;
document.getElementById('footer-texto').innerHTML =
  '© <span>' + new Date().getFullYear() + '</span> ' + esc(CONFIG.estudio) + ' · Hecho con ♥ y mucho café';

// Redes: lista del home + links del footer
const redesLista = document.getElementById('redes-lista');
const footerTexto = document.getElementById('footer-texto');
Object.entries(CONFIG.redes).forEach(([nombre, url]) => {
  const a = document.createElement('a');
  a.href = url; a.textContent = nombre;
  a.target = '_blank'; a.rel = 'noopener';
  a.addEventListener('mouseenter', sndHover);
  const li = document.createElement('li');
  li.appendChild(a);
  redesLista.appendChild(li);

  footerTexto.appendChild(document.createTextNode(' · '));
  footerTexto.appendChild(a.cloneNode(true));
});

/* ════════════════════════════════════════════════════════════
   9) EVENTOS GLOBALES (navbar, anclas, teclado)
   ════════════════════════════════════════════════════════════ */
document.querySelectorAll('[data-ir-home]').forEach(el => {
  el.addEventListener('click', (e) => { e.preventDefault(); irAHome(); });
});
document.querySelectorAll('.navbar-link').forEach(el => {
  el.addEventListener('mouseenter', sndHover);
});

// Links a secciones del home: si estamos dentro de un juego, volvemos primero
document.querySelectorAll('.navbar-link[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const destino = document.querySelector(link.getAttribute('href'));
    if (!destino) return;
    const irYScroll = () => destino.scrollIntoView({ behavior: 'smooth', block: 'start' });
    if (pageHome.classList.contains('active')) { irYScroll(); return; }
    juegoActual = null;
    aplicarTema(null);
    cambiarPagina(pageHome, irYScroll);
  });
});

// Teclado: Esc para volver, ↑ ↓ Enter en el menú (estilo Deltarune)
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    if (lightbox.classList.contains('abierto')) { lightbox.classList.remove('abierto'); return; }
    if (juegoActual) irAHome();
    return;
  }
  if (!pageHome.classList.contains('active') || !splashListo) return;
  const botones = Array.from(menuJuegos.querySelectorAll('.nav-button'));
  if (!botones.length) return;
  let idx = botones.indexOf(document.activeElement);
  if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
    e.preventDefault();
    idx = e.key === 'ArrowDown'
      ? (idx + 1) % botones.length
      : (idx <= 0 ? botones.length - 1 : idx - 1);
    botones.forEach(b => b.classList.remove('teclado-seleccion'));
    botones[idx].classList.add('teclado-seleccion');
    botones[idx].focus({ preventScroll: false });
    sndHover();
  } else if (e.key === 'Enter' && idx >= 0) {
    e.preventDefault();
    botones[idx].click();
  }
});

/* ════════════════════════════════════════════════════════════
   10) REVEALS AL HACER SCROLL + MÓVIL
   ════════════════════════════════════════════════════════════ */
let observer = null;
function observarReveals(contenedor) {
  if (observer) observer.disconnect();
  observer = new IntersectionObserver((entradas) => {
    entradas.forEach(ent => {
      if (ent.isIntersecting) { ent.target.classList.add('visible'); observer.unobserve(ent.target); }
    });
  }, { threshold: 0.12 });
  contenedor.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}
observarReveals(pageHome);

if (/Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent)) {
  document.body.classList.add('es-movil');
}







