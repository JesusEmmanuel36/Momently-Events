const images = "/images/events/luis-y-javier";
const address = "Paseo de las Torres 5, fraccionamiento Las Torrecillas, Las Joyitas, C. P. 28965";
export const luisJavier = {
  slug: "luis-y-javier",
  templateKey: "luis-javier-navy-architecture",
  eventTitle: "Boda de Luis y Javier",
  couple: { partner1: "Luis", partner2: "Javier" },
  displayNames: { partner1: "Luis", partner2: "Javier" },
  initials: "LJ",
  date: "2026-12-11T17:00:00-06:00",
  timezone: "America/Mexico_City",
  dateDisplay: "Viernes · 11 de diciembre de 2026",
  dateStamp: "11 · 12 · 2026",
  calendarDate: "11 de diciembre de 2026",
  maxCompanions: 5,
  rsvpEnabled: true,
  askAllergies: false,
  hero: {
    subtitle: "Nuestra boda",
    quote: "Nos elegimos cada día. Ahora queremos celebrar nuestro amor contigo.",
    image: `${images}/image.png`,
  },
  ceremony: { enabled: false, name: "", time: "", address: "", mapsUrl: "", image: "" },
  reception: {
    enabled: true, name: "Casa Huaipe", time: "5:00 p. m.", address,
    mapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`Casa Huaipe, ${address}`)}`,
    image: `${images}/floral.png`,
  },
  gallery: [],
  music: { enabled: true, url: "/audio/luisyjavier.mp3", label: "A Sky Full of Stars" },
  dressCode: { title: "Formal elegante", text: "Acompáñanos con tu mejor estilo para celebrar una tarde inolvidable." },
  gifts: [{ title: "Lluvia de sobres", description: "Tu presencia es nuestro mejor regalo. Si deseas tener un detalle con nosotros, recibiremos con mucho cariño tu obsequio en efectivo dentro de un sobre." }],
  contact: {
    phone: "3131123867", whatsapp: "https://wa.me/523131123867",
    whatsapps: [
      { phone: "313 112 3867", whatsapp: "https://wa.me/523131123867" },
      { phone: "312 594 4529", whatsapp: "https://wa.me/523125944529" },
    ],
  },
  itinerary: [],
  theme: { primary: "#0F2D4A", dark: "#0F2D4A", champagne: "#DCD2C6", cream: "#F8F6F1", ivory: "#F8F6F1", rose: "#A89A86", sage: "#A89A86" },
};
