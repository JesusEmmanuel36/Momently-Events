const images = "/images/events/xv-rubi-ximena";
const galleryNames = [
  "image.png", "image copy 3.png", "image copy 5.png", "image copy 7.png",
  "image copy 11.png", "image copy 16.png", "image copy 19.png", "image copy 22.png",
];

export const rubiXimenaXv = {
  slug: "xv-rubi-ximena",
  templateKey: "rubi-ximena-pastel-pink",
  eventTitle: "XV años de Rubí Ximena",
  couple: { partner1: "Rubí Ximena Chávez López", partner2: "XV años" },
  displayNames: { partner1: "Rubí Ximena", partner2: "" },
  initials: "RX",
  date: "2026-11-14T18:00:00-06:00",
  timezone: "America/Mexico_City",
  maxCompanions: 0,
  rsvpEnabled: true,
  dateStamp: "14 · 11 · 2026",
  dateDisplay: "Sábado · 14 de noviembre · 2026",
  calendarDate: "14 de noviembre de 2026",
  timelineDate: "14 de noviembre",
  hero: {
    subtitle: "Mis XV años",
    quote: "Hay momentos que se vuelven aún más especiales cuando los compartimos con quienes queremos. Me encantará celebrar mis XV años contigo.",
    image: `${images}/portada.png`,
  },
  closingImage: `${images}/image copy 15.png`,
  ceremony: {
    enabled: true,
    name: "Templo del Sagrado Corazón de Jesús",
    time: "6:00 p. m.",
    address: "Calle Kilimanjaro, colonia Indeco, Lagos de Moreno, Jalisco",
    mapsUrl: "",
    image: `${images}/floral.png`,
  },
  reception: {
    enabled: true,
    name: "Garden Palace",
    time: "8:00 p. m.",
    address: "Macedonio Ayala 70, Plan de los Rodríguez, Lagos de Moreno, Jalisco",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Garden%20Palace%2C%20Macedonio%20Ayala%2070%2C%20Plan%20de%20los%20Rodr%C3%ADguez%2C%20Lagos%20de%20Moreno%2C%20Jalisco",
    image: `${images}/floral.png`,
  },
  gallery: galleryNames.map((name, index) => ({
    src: `${images}/${name}`, width: 1066, height: 1599,
    alt: `Retrato de Rubí Ximena ${index + 1}`,
  })),
  dressCode: {
    heading: "Colores reservados",
    title: "Un detalle para nuestros invitados",
    text: "El rosa, el verde olivo y el gris están reservados para la quinceañera y sus acompañantes. Gracias por elegir otros tonos.",
    reservedColors: [
      { name: "Rosa", value: "#e8afc0" },
      { name: "Verde olivo", value: "#747a54" },
      { name: "Gris", value: "#9a9ca0" },
    ],
  },
  gifts: [],
  contact: {},
  music: { enabled: true, url: "/audio/Claraysantiago.mp3", label: "Mi canción" },
  itinerary: [
    { time: "18:00", title: "Misa", description: "Templo del Sagrado Corazón de Jesús" },
    { time: "20:00", title: "Recepción", description: "Garden Palace" },
  ],
  theme: { primary: "#b96f82", dark: "#563b43", champagne: "#dfc4a5", cream: "#fff4f6", ivory: "#fffaf8", rose: "#e8b7c2", sage: "#a9b29a" },
};
