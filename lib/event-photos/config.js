// Only these explicit event routes enable guest photos.
export const guestPhotos = Object.freeze({
  slug: "caleb-y-ciriam",
  names: "Caleb y Ciriam",
  path: "/eventos/caleb-y-ciriam/fotos",
  apiPath: "/api/public/event-photos/caleb-y-ciriam",
  folder: "momently-events/caleb-y-ciriam/guest-photos",
  opensAt: "2026-11-14T00:00:00-06:00",
  opensDateLabel: "14 de noviembre de 2026",
  partner1: "Caleb",
  partner2: "Ciriam",
  floral: "/images/events/caleb-y-ciriam/floral.png",
  maxBatch: 5,
  maxFileBytes: 3 * 1024 * 1024,
  maxSourceBytes: 25 * 1024 * 1024,
  maxDimension: 2400,
});

export const alejandraDavidPhotos = Object.freeze({
  ...guestPhotos,
  slug: "alejandra-y-david",
  names: "Alejandra y David",
  partner1: "Alejandra",
  partner2: "David",
  path: "/eventos/alejandra-y-david/fotos",
  apiPath: "/api/public/event-photos/alejandra-y-david",
  folder: "momently-events/alejandra-y-david/guest-photos",
  floral: "/images/events/alejandra-y-david/floral.png",
  opensAt: "2026-12-27T00:00:00-06:00",
  opensDateLabel: "27 de diciembre de 2026",
});

export const joannaRubenPhotos = Object.freeze({
  ...guestPhotos,
  slug: "joanna-y-ruben", names: "Joanna y Rubén", partner1: "Joanna", partner2: "Rubén",
  path: "/eventos/joanna-y-ruben/fotos", apiPath: "/api/public/event-photos/joanna-y-ruben",
  folder: "momently-events/joanna-y-ruben/guest-photos", floral: "/images/events/joanna-y-ruben/floral-cattleya.png",
  opensAt: "2027-01-16T00:00:00-06:00", opensDateLabel: "16 de enero de 2027",
  photoTheme: { "--photo-page": "#f3e6e3", "--photo-paper": "#fffaf6", "--photo-dark": "#462330", "--photo-accent": "#792b40", "--photo-muted": "#906e79", "--photo-border": "#e4d3b4", "--photo-surface": "#efd0d8", "--photo-shadow": "#46233012" },
});

export const zoeValentinaPhotos = Object.freeze({
  ...guestPhotos,
  slug: "xv-zoe-valentina",
  names: "Zoé Valentina",
  partner1: "Zoé Valentina",
  partner2: "",
  path: "/eventos/xv-zoe-valentina/fotos",
  apiPath: "/api/public/event-photos/xv-zoe-valentina",
  folder: "momently-events/xv-zoe-valentina/guest-photos",
  floral: "/images/events/xv-zoe-valentina/floral.png",
  opensAt: "2026-11-21T00:00:00-06:00",
  opensDateLabel: "21 de noviembre de 2026",
  uploadEyebrow: "Recuerdos de mis XV años",
  uploadIntro: "Comparte las fotos que tomaste y ayúdame a guardar cada momento de este día.",
  galleryTitle: "Las fotos de mis invitados",
  galleryIntro: "Los recuerdos que compartan aparecerán aquí.",
  galleryEmpty: "Aún no hay fotos compartidas. ¡Aquí reuniremos los recuerdos de mis XV años!",
  photoTheme: { "--photo-page": "#f5eee5", "--photo-paper": "#fffaf3", "--photo-dark": "#374633", "--photo-accent": "#8f5663", "--photo-muted": "#746a61", "--photo-border": "#d8bd78", "--photo-surface": "#d7dfc1", "--photo-shadow": "#37463318" },
});

export function guestPhotosAreOpen(now = Date.now(), event = guestPhotos) {
  return now >= Date.parse(event.opensAt);
}
