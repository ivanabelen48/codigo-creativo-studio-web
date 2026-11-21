// Editá estos valores con tus enlaces reales. Para WhatsApp, usá el número
// internacional sin +, espacios ni guiones (por ejemplo: 5491123456789).
window.STUDIO_CONFIG = {
  whatsappNumber: "5493515155333",
  facebookUrl: "https://www.facebook.com/share/1FmYfrEkW4/",
  whatsappMessage: "Hola Código Creativo Studio, tengo una idea y me gustaría consultarles"
};

// Para sumar un proyecto, duplicá un objeto y completá sus datos:
// - category: "apps", "software" o "ai" (controla los filtros).
// - media.type: "image", "video", "youtube" o "facebook".
// - image: portada opcional en assets/ (JPG, PNG o WebP); también sirve como
//   miniatura para un video local o un enlace de YouTube/Facebook.
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
  }
];
