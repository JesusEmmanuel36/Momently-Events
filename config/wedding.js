export const wedding = {
  couple: { bride: "Valeria", groom: "Mateo" },
  date: "2027-06-14T17:00:00-06:00",
  dateDisplay: "14 · JUNIO · 2027",
  dateLong: "Sábado, 14 de junio de 2027",
  introQuote: "Hay momentos que duran un instante, pero recuerdos que duran toda la vida.",
  heroSubtitle: "Nuestra boda",
  heroQuote: "Nos encantaría compartir contigo el comienzo de nuestra nueva historia.",
  welcomeTitle: "Con todo nuestro amor",
  welcome: ["Después de tantos momentos juntos, estamos listos para comenzar una nueva historia.", "Queremos compartir este día tan especial con las personas que forman parte de nuestra vida."],
  images: {
    hero: "/images/wedding/hero.png", couple: "/images/wedding/couple.png",
    ceremony: "/images/wedding/ceremony.png", reception: "/images/wedding/reception.png",
    gallery: ["/images/wedding/couple.png", "/images/wedding/hero.png", "/images/wedding/ceremony.png", "/images/wedding/reception.png", "/images/wedding/hero.png", "/images/wedding/couple.png", "/images/wedding/reception.png", "/images/wedding/ceremony.png"]
  },
  music: { src: "/audio/wedding-song.mp3", label: "Nuestra canción" },
  features: { music: true, story: true, gallery: true, video: true, ceremony: true, reception: true, itinerary: true, dressCode: true, gifts: true, hotels: true, important: true, calendar: true, rsvp: true, songRequest: true, faqs: true },
  story: [
    { year: "2019", title: "Nos conocimos", description: "Una conversación inesperada se convirtió en nuestra parte favorita del día.", image: "/images/wedding/couple.png" },
    { year: "2021", title: "Nuestra primera aventura", description: "Aprendimos que cualquier lugar se siente como casa si estamos juntos." },
    { year: "2025", title: "Dijo que sí", description: "Entre montañas, nervios y una felicidad imposible de esconder." },
    { year: "2027", title: "Nos casamos", description: "Y queremos que seas parte de este capítulo que apenas comienza." }
  ],
  ceremony: { label: "Ceremonia", name: "Parroquia del Sagrado Corazón", time: "5:00 PM", address: "Av. Real 123, Monterrey, Nuevo León", image: "/images/wedding/ceremony.png", mapsUrl: "https://maps.google.com/?q=Parroquia+del+Sagrado+Corazon+Monterrey", wazeUrl: "https://waze.com/ul?q=Parroquia%20del%20Sagrado%20Corazon%20Monterrey" },
  reception: { label: "Recepción", name: "Hacienda San Gabriel", time: "7:00 PM", address: "Carretera Nacional Km 123, Santiago, Nuevo León", image: "/images/wedding/reception.png", mapsUrl: "https://maps.google.com/?q=Santiago+Nuevo+Leon", wazeUrl: "https://waze.com/ul?q=Santiago%20Nuevo%20Leon" },
  itinerary: [
    { time: "5:00 PM", title: "Ceremonia", icon: "heart" }, { time: "6:30 PM", title: "Recepción", icon: "camera" },
    { time: "7:30 PM", title: "Cena", icon: "glass" }, { time: "9:00 PM", title: "Primer baile", icon: "music" },
    { time: "9:30 PM", title: "A celebrar", icon: "sparkles" }
  ],
  dressCode: { title: "Formal / Elegante", note: "Te agradecemos reservar el blanco para la novia.", colors: ["#594238", "#A58F82", "#D8C3A5", "#A9B09A"] },
  gifts: [{ name: "Liverpool", url: "https://www.liverpool.com.mx" }, { name: "Amazon", url: "https://www.amazon.com.mx" }, { name: "Palacio de Hierro", url: "https://www.elpalaciodehierro.com" }],
  bank: { enabled: true, bank: "BBVA", holder: "Valeria García", clabe: "012 345 678901234567", account: "0123456789" },
  hotels: [
    { name: "Safi Metropolitan", detail: "Tarifa especial para invitados", address: "San Pedro Garza García, N.L.", url: "https://www.safihotel.com", mapsUrl: "https://maps.google.com/?q=Safi+Metropolitan" },
    { name: "Gamma Rincón de Santiago", detail: "A 10 minutos de la recepción", address: "Santiago, Nuevo León", url: "https://www.fiestamericanatravelty.com", mapsUrl: "https://maps.google.com/?q=Gamma+Rincon+de+Santiago" }
  ],
  important: [
    { title: "Adultos únicamente", description: "Celebraremos esta noche especial solo entre adultos.", icon: "users" },
    { title: "Estacionamiento", description: "Contaremos con estacionamiento y personal de apoyo.", icon: "car" },
    { title: "Llega con tiempo", description: "Te sugerimos llegar 20 minutos antes.", icon: "clock" },
    { title: "Evento en jardín", description: "La recepción se realizará al aire libre.", icon: "tree" },
    { title: "Plan para lluvia", description: "Contamos con un área techada para tu comodidad.", icon: "umbrella" }
  ],
  rsvpDeadline: "20 de mayo de 2027",
  whatsapp: "https://wa.me/528112345678?text=Hola%2C%20tengo%20una%20duda%20sobre%20la%20boda",
  faqs: [
    { question: "¿Puedo llevar niños?", answer: "Esta celebración será exclusivamente para adultos. Agradecemos mucho tu comprensión." },
    { question: "¿Hay estacionamiento?", answer: "Sí, ambos lugares cuentan con estacionamiento y personal que podrá orientarte." },
    { question: "¿Puedo cambiar mi confirmación?", answer: "Claro. Escríbenos por WhatsApp antes de la fecha límite para ayudarte." },
    { question: "¿A qué hora debo llegar?", answer: "Te recomendamos llegar a la ceremonia 20 minutos antes para comenzar puntualmente." },
    { question: "¿El evento será al aire libre?", answer: "La recepción será en jardín y contamos con un área techada en caso de lluvia." }
  ]
};
