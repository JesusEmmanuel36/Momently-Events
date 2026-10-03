const images = "/images/events/miriam-jair";
const churchQuery = "Iglesia del Divino Niño, Colonia Unidad Deportiva, 43802, Tizayuca, Hidalgo";
const receptionQuery = "Olivo 26, Fraccionamiento Ciudad Natura 1, 43816, Tizayuca, Hidalgo";

export const miriamJair = {
  slug: "miriam-y-jair",
  templateKey: "miriam-jair-compact-wine",
  eventTitle: "Boda de Miriam y Jair",
  couple: { partner1: "Miriam", partner2: "Jair" },
  fullNames: { bride: "Miriam Velázquez Flores", groom: "Jair Alonso Acevedo Patiño" },
  date: "2026-12-19T14:00:00-06:00",
  dateDisplay: "Sábado · 19 de diciembre · 2026",
  dateStamp: "19 · 12 · 2026",
  timezone: "America/Mexico_City",
  hero: {
    subtitle: "Nuestra boda",
    quote: "Con la bendición de nuestras familias, nos dará mucha alegría compartir contigo este día tan especial.",
    image: `${images}/image copy.png`,
  },
  ceremony: {
    enabled: true,
    name: "Iglesia del Divino Niño",
    time: "2:00 p. m.",
    address: "Colonia Unidad Deportiva, C. P. 43802, Tizayuca, Hidalgo",
    mapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(churchQuery)}`,
    mapEmbedUrl: `https://maps.google.com/maps?q=${encodeURIComponent(churchQuery)}&output=embed`,
  },
  reception: {
    enabled: true,
    name: "Fraccionamiento Ciudad Natura 1",
    time: "4:00 p. m.",
    address: "Olivo 26, C. P. 43816, Tizayuca, Hidalgo",
    mapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(receptionQuery)}`,
    mapEmbedUrl: `https://maps.google.com/maps?q=${encodeURIComponent(receptionQuery)}&output=embed`,
  },
  family: {
    brideParents: ["Félix Velázquez P.", "Fabiola Flores H."],
    groomParents: ["Alonso Acevedo M.", "Eutiquia Patiño A."],
    godparents: ["José Armando García J.", "Jessica Martínez Castillo"],
  },
  gallery: [
    { src: `${images}/image copy.png`, width: 480, height: 502, alt: "Miriam y Jair juntos" },
    { src: `${images}/image.png`, width: 480, height: 624, alt: "Recuerdo de Miriam y Jair" },
  ],
  dressCode: {
    title: "Colores reservados para la novia",
    text: "Los colores blanco y vino están reservados para la novia. Gracias por elegir otros tonos para tu vestimenta.",
    colors: [{ name: "Blanco", color: "#ffffff" }, { name: "Vino", color: "#702739" }],
  },
  music: { enabled: true, url: "/audio/miriamyjair.mp3", label: "Nuestra canción" },
  contact: { phone: "", whatsapp: "" },
  theme: { wine: "#702739", dark: "#482030", beige: "#f4e9d8", champagne: "#c1a078" },
};
