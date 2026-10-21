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

export const isabelaPhotos = Object.freeze({
  ...guestPhotos,
  slug: "xv-isabela-lopez", names: "Isabela", partner1: "Isabela", partner2: "",
  path: "/eventos/xv-isabela-lopez/fotos", apiPath: "/api/public/event-photos/xv-isabela-lopez",
  folder: "momently-events/xv-isabela-lopez/guest-photos",
  floral: "/images/events/xv-isabela-lopez/floral.png",
  opensAt: "2027-03-14T00:00:00-06:00", opensDateLabel: "14 de marzo de 2027",
  uploadEyebrow: "Recuerdos de mis XV años",
  uploadIntro: "Comparte las fotos que tomaste y ayúdame a guardar cada momento de este día.",
  galleryTitle: "Las fotos de mis invitados",
  galleryIntro: "Aquí reuniremos los recuerdos que compartan de mis XV años.",
  galleryEmpty: "Aún no hay fotos compartidas. ¡El día del evento comenzaremos a reunir nuestros recuerdos!",
  photoTheme: { "--photo-page": "#fff4ef", "--photo-paper": "#fffcf9", "--photo-dark": "#684c42", "--photo-accent": "#b48a46", "--photo-muted": "#6c655c", "--photo-border": "#e3c88f", "--photo-surface": "#f7d6cf", "--photo-shadow": "#684c4212" },
});

export const abigailPhotos = Object.freeze({
  ...guestPhotos,
  slug: "xv-abigail", names: "Abigail", partner1: "Abigail", partner2: "",
  path: "/eventos/xv-abigail/fotos", apiPath: "/api/public/event-photos/xv-abigail",
  folder: "momently-events/xv-abigail/guest-photos",
  floral: "/images/events/xv-abigail/floral.png",
  opensAt: "2026-12-12T00:00:00-06:00", opensDateLabel: "12 de diciembre de 2026",
  uploadEyebrow: "Recuerdos de mis XV años",
  uploadIntro: "Comparte tus fotos y ayúdame a guardar cada momento de esta noche especial.",
  galleryTitle: "Las fotos de mis invitados",
  galleryIntro: "Aquí reuniremos los recuerdos que compartan de mis XV años.",
  galleryEmpty: "Aún no hay fotos compartidas. ¡Comparte el primer recuerdo!",
  photoTheme: { "--photo-page": "#fff3f7", "--photo-paper": "#fffcf8", "--photo-dark": "#65334a", "--photo-accent": "#b66080", "--photo-muted": "#816574", "--photo-border": "#dfc693", "--photo-surface": "#edc2d3", "--photo-shadow": "#65334a12" },
});

export function guestPhotosAreOpen(now = Date.now(), event = guestPhotos) {
  return now >= Date.parse(event.opensAt) && (!event.closesAt || now < Date.parse(event.closesAt));
}

export const claudiaPorfirioPhotos = Object.freeze({
 ...guestPhotos, slug:"claudia-y-porfirio", names:"Claudia y Porfirio", partner1:"Claudia", partner2:"Porfirio",
 path:"/eventos/claudia-y-porfirio/fotos", apiPath:"/api/public/event-photos/claudia-y-porfirio",
 folder:"momently-events/claudia-y-porfirio/guest-photos", floral:"/images/events/claudia-y-porfirio/floral.png",
 opensAt:"2026-11-07T00:00:00-06:00", opensDateLabel:"7 de noviembre de 2026",
 photoTheme:{"--photo-page":"#f6efe6","--photo-paper":"#fffcf7","--photo-dark":"#49352d","--photo-accent":"#8e7062","--photo-muted":"#8e7062","--photo-border":"#c6aa82","--photo-surface":"#e7dbcf","--photo-shadow":"#49352d12"},
});

export const lizIvannaPhotos = Object.freeze({
  ...guestPhotos,
  slug:"xv-liz-ivanna", names:"Liz Ivanna", partner1:"Liz Ivanna", partner2:"",
  path:"/eventos/xv-liz-ivanna/fotos", apiPath:"/api/public/event-photos/xv-liz-ivanna",
  folder:"momently-events/xv-liz-ivanna/guest-photos", floral:"/images/events/xv-liz-ivanna/floral.png",
  opensAt:"2027-02-13T00:00:00-06:00", closesAt:"2027-02-14T00:00:00-06:00", opensDateLabel:"13 de febrero de 2027",
  closedMessage:"La carga de fotos está disponible únicamente el 13 de febrero de 2027, día de mis XV años.",
  uploadEyebrow:"Recuerdos de mis XV años", uploadIntro:"Comparte tus fotos y ayúdame a guardar cada momento de este día especial.",
  galleryTitle:"Las fotos de mis invitados", galleryIntro:"Aquí reuniremos los recuerdos que compartan de mis XV años.", galleryEmpty:"Aún no hay fotos compartidas. ¡Comparte el primer recuerdo!",
  photoTheme:{"--photo-page":"#F3EADF","--photo-paper":"#FFF9ED","--photo-dark":"#123D33","--photo-accent":"#075044","--photo-muted":"#63745D","--photo-border":"#BA995C","--photo-surface":"#E9DCC6","--photo-shadow":"#123D3312"},
});

export const yoatzinAldoPhotos = Object.freeze({
  ...guestPhotos,
  slug:"yoatzin-y-aldo", names:"Yoatzin y Aldo", partner1:"Yoatzin", partner2:"Aldo",
  path:"/eventos/yoatzin-y-aldo/fotos", apiPath:"/api/public/event-photos/yoatzin-y-aldo",
  folder:"momently-events/yoatzin-y-aldo/guest-photos", floral:"/images/events/yoatzin-y-aldo/floral.png",
  opensAt:"2026-12-19T00:00:00-06:00", closesAt:"2026-12-20T00:00:00-06:00", opensDateLabel:"19 de diciembre de 2026",
  closedMessage:"La carga de fotos está disponible únicamente el 19 de diciembre de 2026, día de nuestra boda.",
  uploadEyebrow:"Recuerdos de nuestra boda", uploadIntro:"Comparte tus fotos y ayúdanos a guardar cada momento de este día especial.",
  galleryTitle:"Las fotos de mis invitados", galleryIntro:"Aquí reuniremos los recuerdos que compartan de nuestra boda.", galleryEmpty:"Aún no hay fotos compartidas. ¡Comparte el primer recuerdo!",
  photoTheme:{"--photo-page":"#F3EDDF","--photo-paper":"#FFF9ED","--photo-dark":"#16263B","--photo-accent":"#20344E","--photo-muted":"#63745D","--photo-border":"#BA9B58","--photo-surface":"#E9DCC6","--photo-shadow":"#16263B12"},
});

export const calebCiriamEnlacePhotos = Object.freeze({
  ...guestPhotos, slug:"caleb-y-ciriam-enlace", names:"Caleb y Ciriam", partner1:"Caleb", partner2:"Ciriam",
  path:"/eventos/caleb-y-ciriam-enlace/fotos", apiPath:"/api/public/event-photos/caleb-y-ciriam-enlace",
  folder:"momently-events/caleb-y-ciriam-enlace/guest-photos", opensAt:"2026-11-15T00:00:00-06:00", opensDateLabel:"15 de noviembre de 2026",
  photoTheme:{"--photo-page":"#fbf6eb","--photo-paper":"#fffaf4","--photo-dark":"#303822","--photo-accent":"#657044","--photo-muted":"#6c6c50","--photo-border":"#dac9a5","--photo-surface":"#cbd0b9","--photo-shadow":"#30382212"},
});

export const angelaKarolPhotos = Object.freeze({
  ...guestPhotos, slug:"xv-angela-karol", names:"Ángela Karol", partner1:"Ángela Karol", partner2:"",
  path:"/eventos/xv-angela-karol/fotos", apiPath:"/api/public/event-photos/xv-angela-karol",
  folder:"momently-events/xv-angela-karol/guest-photos", floral:"/images/events/xv-angela-karol/floral.png",
  opensAt:"2026-12-26T00:00:00-06:00", closesAt:"2026-12-27T00:00:00-06:00", opensDateLabel:"26 de diciembre de 2026",
  closedMessage:"La carga de fotos está disponible únicamente el 26 de diciembre de 2026, día de mis XV años.",
  uploadEyebrow:"Recuerdos de mis XV años", uploadIntro:"Comparte las fotos que tomaste y ayúdame a guardar cada momento de este día especial.",
  galleryTitle:"Las fotos de mis invitados", galleryIntro:"Aquí reuniremos los recuerdos que compartan de mis XV años.", galleryEmpty:"Aún no hay fotos compartidas. ¡Comparte el primer recuerdo!",
  photoTheme:{"--photo-page":"#F2E8DC","--photo-paper":"#FFFAF2","--photo-dark":"#48252E","--photo-accent":"#752A40","--photo-muted":"#725C55","--photo-border":"#B99559","--photo-surface":"#EDE1D0","--photo-shadow":"#48252E12"},
});

export const andreyLeiraPhotos = Object.freeze({
  ...guestPhotos, slug:"andrey-y-leira", names:"Andrey y Leira", partner1:"Andrey", partner2:"Leira",
  path:"/eventos/andrey-y-leira/fotos", apiPath:"/api/public/event-photos/andrey-y-leira",
  folder:"momently-events/andrey-y-leira/guest-photos", floral:"/images/events/andrey-y-leira/floral.png",
  opensAt:"2026-12-19T00:00:00-06:00", closesAt:"2026-12-20T00:00:00-06:00", opensDateLabel:"19 de diciembre de 2026",
  closedMessage:"La carga de fotos está disponible únicamente el 19 de diciembre de 2026, día de nuestra boda.",
  uploadEyebrow:"Recuerdos de nuestra boda", uploadIntro:"Comparte tus fotos y ayúdanos a guardar cada momento de este día especial.",
  galleryTitle:"Las fotos de nuestros invitados", galleryIntro:"Aquí reuniremos los recuerdos que compartan de nuestra boda.", galleryEmpty:"Aún no hay fotos compartidas. ¡Comparte el primer recuerdo!",
  photoTheme:{"--photo-page":"#FFF8EC","--photo-paper":"#FFFCF5","--photo-dark":"#253F2A","--photo-accent":"#B51258","--photo-muted":"#64735B","--photo-border":"#C59B52","--photo-surface":"#F1C0BF","--photo-shadow":"#253F2A12"},
});

export const kristellRicardoPhotos = Object.freeze({
  ...guestPhotos, slug:"kristell-y-ricardo", names:"Kristell y Ricardo", partner1:"Kristell", partner2:"Ricardo",
  path:"/eventos/kristell-y-ricardo/fotos", apiPath:"/api/public/event-photos/kristell-y-ricardo",
  folder:"momently-events/kristell-y-ricardo/guest-photos", floral:"/images/events/kristell-y-ricardo/floral.png",
  opensAt:"2026-12-26T00:00:00-06:00", closesAt:"2026-12-27T03:00:00-06:00", opensDateLabel:"26 de diciembre de 2026",
  closedMessage:"Podrás compartir fotos el 26 de diciembre de 2026 y hasta las 3:00 a. m. del día siguiente, cuando termina nuestra celebración.",
  uploadEyebrow:"Recuerdos de nuestra boda", uploadIntro:"Comparte tus fotos y ayúdanos a guardar cada momento de este día especial.",
  galleryTitle:"Las fotos de nuestros invitados", galleryIntro:"Aquí reuniremos los recuerdos que compartan de nuestra boda.", galleryEmpty:"Aún no hay fotos compartidas. ¡Comparte el primer recuerdo!",
  photoTheme:{"--photo-page":"#F1F3E9","--photo-paper":"#FFFEF9","--photo-dark":"#35432B","--photo-accent":"#68794D","--photo-muted":"#64735B","--photo-border":"#C59B52","--photo-surface":"#D9DEC9","--photo-shadow":"#35432B12"},
});
