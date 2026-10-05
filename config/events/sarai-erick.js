export const saraiErick = {
  "slug": "sarai-y-erick",
  "templateKey": "sarai-erick-classic",
  "eventTitle": "Boda de Erick y Sarai",
  "couple": {
    "partner1": "Erick Eduardo Coria Hernández",
    "partner2": "Sarai Monroy Martínez"
  },
  "date": "2027-06-19T10:00:00-06:00",
  "timezone": "America/Mexico_City",
  "maxCompanions": 5,
  "dateDisplay": "19 · JUNIO · 2027",
  "dateLong": "Sábado, 19 de junio de 2027",
  "hero": {
    "subtitle": "Nuestra boda",
    "quote": "Así que no son ya más dos, sino una sola carne; por tanto, lo que Dios juntó, no lo separe el hombre.",
    "image": "/images/events/sarai-y-erick/image.png"
  },
  "ceremony": {
    "enabled": true,
    "name": "Iglesia cristiana Ofrenda de Paz",
    "label": "Ceremonia religiosa",
    "time": "10:00 a. m.",
    "address": "Calle Margarita Morán Véliz, Sentimientos de la Nación",
    "image": "/images/events/sarai-y-erick/floral.png",
    "mapsUrl": "",
    "wazeUrl": "",
    "hideMapLinks": true
  },
  "reception": {
    "enabled": true,
    "name": "Santa Cruz",
    "label": "Recepción",
    "time": "4:00 p. m.",
    "address": "94248 Soledad de Doblado, Veracruz",
    "image": "/images/events/sarai-y-erick/floral.png",
    "mapsUrl": "https://maps.app.goo.gl/Nu3cqpLcaMV528aM8",
    "wazeUrl": "",
    "hideMapLinks": false
  },
  "family": {
    "groomParents": ["José Valentín Coria Casas", "María Hernández López"],
    "brideParents": ["Gregorio Monroy San Agustín", "Reyna Martínez Montes"]
  },
  "gallery": [
    {
      "src": "/images/events/sarai-y-erick/image.png",
      "alt": "Erick y Sarai"
    }
  ],
  "music": {
    "enabled": true,
    "url": "/audio/saraierick.mp3",
    "label": "A Thousand Years"
  },
  "dressCode": {
    "title": "Formal",
    "text": "Te agradecemos vestir con elegancia y evitar los colores blanco y azul."
  },
  "gifts": [
    {
      "name": "Sobre o regalo",
      "description": "Tu presencia es nuestro mejor regalo. Si deseas tener un detalle con nosotros, puedes obsequiarnos un sobre o un regalo.",
      "url": "",
      "type": "cash"
    }
  ],
  "contact": {
    "phone": "2293656672",
    "whatsapp": "https://wa.me/522293656672"
  },
  "itinerary": [
    {
      "time": "10:00",
      "title": "Ceremonia religiosa",
      "description": "Iglesia cristiana Ofrenda de Paz",
      "icon": "heart"
    },
    {
      "time": "16:00",
      "title": "Recepción",
      "description": "Santa Cruz, Soledad de Doblado",
      "icon": "glass"
    }
  ],
  "theme": {
    "primary": "#594238",
    "dark": "#3a2a24",
    "champagne": "#d8c3a5",
    "cream": "#f5eee6",
    "ivory": "#fbf8f3",
    "rose": "#d7b6ac",
    "sage": "#a9b09a"
  }
};

export const saraiErickPageData = {
  slug: saraiErick.slug,
  couple: { bride: "Sarai", groom: "Erick" },
  date: saraiErick.date,
  dateDisplay: saraiErick.dateDisplay,
  dateLong: saraiErick.dateLong,
  heroSubtitle: saraiErick.hero.subtitle,
  heroQuote: saraiErick.hero.quote,
  heroQuoteReference: "Mateo 19:6",
  introQuote: saraiErick.hero.quote,
  welcomeTitle: "Con todo nuestro amor",
  welcome: ["Mateo 19:6", "Erick Eduardo Coria Hernández y Sarai Monroy Martínez", "Con alegría y gratitud a Dios, te invitamos a celebrar nuestra unión y compartir con nosotros este día tan especial."],
  images: { hero: saraiErick.hero.image, couple: saraiErick.hero.image, gallery: [] },
  music: { src: saraiErick.music.url, label: saraiErick.music.label },
  features: { music: true, story: false, gallery: false, video: false, ceremony: true, reception: true, itinerary: true, dressCode: true, gifts: true, hotels: false, important: false, calendar: true, rsvp: true, songRequest: false, faqs: false },
  family: saraiErick.family,
  ceremony: saraiErick.ceremony,
  reception: saraiErick.reception,
  itinerary: [{ time: "10:00 a. m.", title: "Ceremonia religiosa", icon: "heart" }, { time: "4:00 p. m.", title: "Recepción", icon: "glass" }],
  dressCode: { title: saraiErick.dressCode.title, note: saraiErick.dressCode.text, colors: ["#ffffff", "#2457a7"] },
  gifts: saraiErick.gifts,
  bank: { enabled: false },
  whatsapp: saraiErick.contact.whatsapp,
  rsvpSettings: { maxCompanions: saraiErick.maxCompanions, askSongSuggestion: false },
};
