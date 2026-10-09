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
});

export function guestPhotosAreOpen(now = Date.now(), event = guestPhotos) {
  return now >= Date.parse(event.opensAt);
}
