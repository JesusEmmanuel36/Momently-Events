const images = "/images/events/rogelio-y-blanca-bautizo";

export const rogelioBlancaBautizo = {
  slug: "rogelio-y-blanca-bautizo",
  templateKey: "rogelio-blanca-wedding-baptism",
  eventTitle: "Boda de Rogelio y Blanca Silvana · Bautizo de Rogelio",
  couple: { partner1: "Rogelio Garduño", partner2: "Blanca Silvana Rosalino" },
  displayNames: { partner1: "Rogelio", partner2: "Blanca Silvana" },
  baptism: { name: "Rogelio Garduño", godparents: ["Fernando", "Margarita"] },
  date: "2026-11-07T15:00:00-06:00",
  timezone: "America/Mexico_City",
  maxCompanions: 0,
  rsvpEnabled: true,
  dateStamp: "07 · 11 · 2026",
  dateDisplay: "Sábado · 7 de noviembre · 2026",
  calendarDate: "7 de noviembre de 2026",
  timelineDate: "7 de noviembre",
  hero: {
    subtitle: "Nuestra boda y su bautizo",
    quote: "Unimos nuestras vidas y celebramos la fe de nuestro pequeño Rogelio. Dos bendiciones, una familia y una alegría que queremos compartir contigo.",
    image: `${images}/hero.png`,
  },
  ceremony: { enabled: true, name: "San Isidro La Rosa", time: "3:00 p. m.", address: "", mapsUrl: "", image: `${images}/floral.png` },
  reception: { enabled: true, name: "Celebración familiar", time: "4:30 p. m.", address: "", mapsUrl: "", image: `${images}/floral.png` },
  family: { groups: [
    { title: "Padres de Rogelio", names: ["Miguel Garduño", "Ma. Félix Riqueño"] },
    { title: "Padres de Blanca Silvana", names: ["Juan Manuel Rosalino", "Claudia Casiano"] },
    { title: "Padrinos de la boda", names: ["Gustavo", "Teresa"] },
  ] },
  gallery: [],
  gifts: [],
  contact: {},
  music: { enabled: true, url: "/audio/rogelioyblancabautizo.mpeg", label: "Nuestra canción" },
  itinerary: [
    { time: "15:00", title: "Misa", description: "San Isidro La Rosa", icon: "church" },
    { time: "16:30", title: "Celebración", description: "Compartamos juntos esta alegría", icon: "glass" },
  ],
  theme: { primary: "#8c704b", dark: "#514337", champagne: "#c8aa72", cream: "#f5eee1", ivory: "#fffdf8", rose: "#d4c3ac", sage: "#a7ad96" },
};
