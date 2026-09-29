export const roxana50 = {
  slug: "roxana-50",
  templateKey: "roxana-50-rose-gold",
  eventTitle: "Los 50 de Roxana",
  couple: { partner1: "Roxana", partner2: "50 años" },
  date: "2026-11-14T00:00:00-06:00",
  timezone: "America/Monterrey",
  rsvpDeadline: "2026-11-13T23:59:00-06:00",
  maxCompanions: 5,
  hero: {
    subtitle: "Mis 50 años",
    quote: "Cinco décadas de historias, aprendizajes y momentos inolvidables merecen celebrarse con las personas que hacen especial mi vida.",
    image: "/images/events/roxana-50/foto-2.jpg",
  },
  reception: {
    enabled: true,
    name: "Up Town Centro Comercial",
    time: "Horario por confirmar",
    address: "Av. Puerta de Hierro 500, Residencial Puerta de Hierro, 64346 Monterrey, N.L.",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Up+Town+Centro+Comercial+Av.+Puerta+de+Hierro+500+Monterrey+Nuevo+Leon",
    image: "/images/events/roxana-50/hero.png",
  },
  itinerary: [],
  dressCode: {
    title: "Negro",
    text: "Para acompañar la elegancia de esta noche, el código de vestimenta será formal en color negro.",
  },
  gifts: [{ name: "Sobre de regalo", description: "Tu presencia es lo más importante. Si deseas tener un detalle conmigo, habrá una opción de sobre de regalo completamente voluntaria.", url: "", type: "cash" }],
  gallery: Array.from({ length: 4 }, (_, index) => ({
    src: `/images/events/roxana-50/foto-${index + 1}.jpg`,
    alt: `Celebración de Roxana ${index + 1}`,
  })),
  contact: {
    phone: "8120714090",
    whatsapp: "https://wa.me/528120714090?text=Hola%20Roxana%2C%20quiero%20confirmar%20mi%20asistencia%20a%20tu%20cumplea%C3%B1os.",
  },
  music: {
    enabled: true,
    url: "/audio/roxana-unstoppable-sia.mp3",
    label: "Unstoppable · Sia",
  },
  theme: { primary: "#b77972", dark: "#171415", champagne: "#c9a55c", cream: "#ead8c5", ivory: "#fbf5eb", rose: "#b76e79", sage: "#8b725c" },
};
