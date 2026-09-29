export const ivanErnestina = {
  slug: "ivan-y-ernestina",
  templateKey: "ivan-ernestina-coral",
  couple: { partner1: "Iván", partner2: "Ernestina" },
  date: "2026-12-30T13:00:00-06:00",
  timezone: "America/Mexico_City",
  rsvpDeadline: "2026-12-20T23:59:00-06:00",
  maxCompanions: 5,
  hero: {
    subtitle: "Nuestra boda",
    quote: "Sería una gran alegría para nosotros si pudieras acompañarnos en esta ocasión tan especial.",
    image: "/images/events/ivan-ernestina/hero.png",
  },
  ceremony: {
    name: "Parroquia de la Santa Cruz",
    time: "1:00 p. m.",
    address: "Calle 4 S/N, Industrial Aviación 1ra Sección, 78140 San Luis Potosí, S.L.P.",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Parroquia+de+la+Santa+Cruz+Calle+4+Industrial+Aviacion+San+Luis+Potosi",
    image: "/images/events/ivan-ernestina/church.png",
  },
  reception: {
    name: "Balneario San Fernando",
    time: "A partir de las 3:00 p. m.",
    address: "Km 2, Puente Superior Vehicular Cerro Prieto, Mexquitic de Carmona, S.L.P.",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Balneario+San+Fernando+Cerro+Prieto+Mexquitic+de+Carmona+San+Luis+Potosi",
    image: "/images/events/ivan-ernestina/reception.png",
  },
  families: {
    parents: ["Domingo Morales", "Albertina Hernández", "Ignacio Pérez Z.", "Eva Romero V."],
    godparents: ["Ma. Angélica Zapata F.", "Guillermo Hernández"],
  },
  gallery: Array.from({ length: 5 }, (_, index) => ({
    src: `/images/events/ivan-ernestina/foto-${index + 1}.webp`,
    alt: `Momento de Iván y Ernestina ${index + 1}`,
  })),
  registry: {
    number: "60037225",
    url: "https://mesaderegalos.liverpool.com.mx/milistaderegalos/60037225",
  },
  music: {
    enabled: true,
    url: "/audio/ivan-ernestina.mp3",
    label: "Nuestra canción",
  },
};
