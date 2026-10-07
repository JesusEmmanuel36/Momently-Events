// This feature is deliberately enabled for this event only.
export const guestPhotos = Object.freeze({
  slug: "caleb-y-ciriam",
  names: "Caleb y Ciriam",
  path: "/eventos/caleb-y-ciriam/fotos",
  apiPath: "/api/public/event-photos/caleb-y-ciriam",
  folder: "momently-events/caleb-y-ciriam/guest-photos",
  opensAt: "2026-11-14T00:00:00-06:00",
  opensDateLabel: "14 de noviembre de 2026",
  maxBatch: 5,
  maxFileBytes: 3 * 1024 * 1024,
  maxSourceBytes: 25 * 1024 * 1024,
  maxDimension: 2400,
});

export function guestPhotosAreOpen(now = Date.now()) {
  return now >= Date.parse(guestPhotos.opensAt);
}
