// Editá estos valores con tus enlaces reales. Para WhatsApp, usá el número
// internacional sin +, espacios ni guiones (por ejemplo: 5491123456789).
window.STUDIO_CONFIG = {
  whatsappNumber: "5493515155333",
  facebookUrl: "https://www.facebook.com/share/1FmYfrEkW4/",
  whatsappMessage: "¡Hola! Bienvenido a Código Creativo Studio. Contanos tu idea con tranquilidad y confianza así podemos organizar una reunión y hacer realidad tu proyecto."
};

// Credifi se muestra en su propio bloque destacado y usa esta galería en el modal.
window.FEATURED_PROJECT = {
  id: "credifi",
  title: "Credifi — La App del Barrio",
  category: "apps",
  categoryLabel: "Apps móviles",
  description: "Desarrollamos Credifi íntegramente desde cero: una solución real para digitalizar cuentas corrientes y el cuaderno de fiado de comercios, emprendedores, spas y profesionales. Permite cobrar con QR, acreditar pagos en efectivo, validar transferencias y enviar recordatorios automáticos por WhatsApp.",
  image: "assets/credifi-1.png",
  media: { type: "image", src: "assets/credifi-1.png", alt: "Credifi — pantalla principal de la app del barrio" },
  gallery: [
    { src: "assets/credifi-1.png", alt: "Credifi — pantalla principal de la app del barrio" },
    { src: "assets/credifi-2.png", alt: "Credifi — gestión de cuentas y saldos" },
    { src: "assets/credifi-3.png", alt: "Credifi — herramientas de gestión para comercios" }
  ]
};

// Para sumar un ejemplo a la grilla, duplicá un objeto y completá sus datos:
// - category: "webs", "apps", "software" o "ai" (controla los filtros).
// - media.type: "image", "video", "youtube" o "facebook".
// - image: portada opcional en assets/ (JPG, PNG o WebP); también sirve como
//   miniatura para un video local o un enlace de YouTube/Facebook.
// - gallery: lista opcional de imágenes { src, alt } para navegar en el modal.
// - video: guardá el MP4 en assets/ y poné la ruta en media.src; media.poster
//   acepta una miniatura opcional. Sin portada, se muestra una vista del video.
// - youtube/facebook: poné el enlace público en media.src; se abrirá incrustado.
//   Sin image, la tarjeta mostrará una portada gráfica de reemplazo.
// Guardá primero las fotos o videos nuevos en assets/ y mantené el resto de
// la estructura de cada objeto. Las imágenes actuales son archivos PNG.
window.PROJECTS = [
  {
    id: "app-pedidos-delivery",
    title: "App de Pedidos y Delivery",
    category: "apps",
    categoryLabel: "Apps móviles",
    description: "Ideal para gastronomía, tiendas o emprendedores. Tus clientes piden desde el celular, pagan rápido y vos recibís todo ordenado sin comisiones de terceros.",
    image: "assets/ejemplo-delivery.png",
    media: { type: "image", src: "assets/ejemplo-delivery.png", alt: "Ejemplo de app de pedidos y delivery" },
    tag: "APP MÓVIL"
  },
  {
    id: "sistema-turnos-online",
    title: "Sistema de Turnos Online",
    category: "software",
    categoryLabel: "Software",
    description: "Ideal para consultorios, estética, peluquerías o canchas. Tus clientes reservan solos las 24 horas y el sistema envía recordatorios automáticos por WhatsApp.",
    image: "assets/ejemplo-turnos.png",
    media: { type: "image", src: "assets/ejemplo-turnos.png", alt: "Ejemplo de sistema de turnos online" },
    tag: "SISTEMA WEB"
  },
  {
    id: "sistema-stock-ventas",
    title: "Sistema de Stock y Ventas",
    category: "software",
    categoryLabel: "Software",
    description: "Ideal para comercios y empresas. Controlá tu caja, mercadería, clientes y ganancias desde cualquier computadora o celular en tiempo real.",
    image: "assets/ejemplo-stock.png",
    media: { type: "image", src: "assets/ejemplo-stock.png", alt: "Ejemplo de sistema de stock y ventas" },
    tag: "SISTEMA WEB"
  },
  {
    id: "asistente-virtual-whatsapp",
    title: "Asistente Virtual con IA para WhatsApp",
    category: "ai",
    categoryLabel: "IA / Automatización",
    description: "Ideal para atención al cliente 24/7. Responde consultas frecuentes, envía catálogos y agenda turnos automáticamente conectando inteligencia artificial con tu WhatsApp.",
    image: "assets/project-ai.svg",
    media: { type: "image", src: "assets/project-ai.svg", alt: "Ilustración de asistente virtual con inteligencia artificial" },
    tag: "IA / AUTOMATIZACIÓN"
  },
  {
    id: "arqce-construcciones",
    title: "Arqce Construcciones — Estudio de Arquitectura",
    category: "webs",
    categoryLabel: "Webs a medida",
    description: "Sitio web institucional y catálogo interactivo de obras y proyectos desarrollado a medida para estudio de arquitectura en Villa Carlos Paz, con fichas técnicas, oficina técnica y consultas directas a WhatsApp.",
    tag: "CLIENTE REAL · VILLA CARLOS PAZ",
    url: "https://arqceconstrucciones.com.ar/",
    linkLabel: "Visitar arqceconstrucciones.com.ar →"
  }
];
