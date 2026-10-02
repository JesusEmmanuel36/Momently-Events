export const fernandaAlejandro = {
  "slug": "fernanda-y-alejandro",
  "templateKey": "fernanda-alejandro-classic",
  "eventTitle": "Boda de Fernanda y Alejandro",
  "couple": {
    "partner1": "Fernanda Trinidad Pérez",
    "partner2": "Alejandro Hernández Amador"
  },
  "date": "2026-11-07T16:00:00-05:00",
  "endDate": "2026-11-07T22:00:00-05:00",
  "timezone": "America/Toronto",
  "maxCompanions": 5,
  "dateDisplay": "7 · NOVIEMBRE · 2026",
  "dateLong": "Sábado, 7 de noviembre de 2026",
  "hero": {
    "subtitle": "Nuestra boda",
    "quote": "El amor todo lo sufre, todo lo cree, todo lo espera, todo lo soporta. El amor nunca deja de ser.",
    "image": "/images/events/fernanda-alejandro/foto1.png"
  },
  "ceremony": {
    "enabled": true,
    "name": "Ajax Community Centre",
    "label": "Ceremonia civil y recepción",
    "time": "4:00 p. m. a 10:00 p. m.",
    "address": "75 Centennial Road, Ajax, ON L1S 4S4, Canadá",
    "image": "/images/events/fernanda-alejandro/foto2.png",
    "mapsUrl": "https://www.google.com/maps/search/?api=1&query=Ajax%20Community%20Centre%2C%2075%20Centennial%20Road%2C%20Ajax%2C%20ON%20L1S%204S4%2C%20Canad%C3%A1",
    "wazeUrl": "https://waze.com/ul?q=Ajax%20Community%20Centre%2C%2075%20Centennial%20Road%2C%20Ajax%2C%20ON%20L1S%204S4%2C%20Canad%C3%A1"
  },
  "reception": {
    "enabled": false,
    "name": "",
    "time": "",
    "address": "",
    "image": "",
    "mapsUrl": ""
  },
  "gallery": [
    {
      "src": "/images/events/fernanda-alejandro/foto1.png",
      "alt": "Fernanda y Alejandro, fotografía 1"
    },
    {
      "src": "/images/events/fernanda-alejandro/foto2.png",
      "alt": "Fernanda y Alejandro, fotografía 2"
    },
    {
      "src": "/images/events/fernanda-alejandro/foto3.png",
      "alt": "Fernanda y Alejandro, fotografía 3"
    },
    {
      "src": "/images/events/fernanda-alejandro/foto4.png",
      "alt": "Fernanda y Alejandro, fotografía 4"
    }
  ],
  "music": {
    "enabled": true,
    "url": "/audio/fernandaAlejandro.mp3",
    "label": "Titanic"
  },
  "dressCode": {
    "title": "Formal",
    "text": "Te agradecemos vestir con elegancia en tonos claros u oscuros. El blanco está reservado únicamente para la novia."
  },
  "gifts": [
    {
      "name": "Lluvia de sobres",
      "description": "Tu presencia es nuestro mejor regalo. Si deseas expresarnos tu cariño con un detalle, agradeceremos que sea a través de un sobre.",
      "url": "",
      "type": "cash"
    }
  ],
  "contact": {
    "phone": "5561940502",
    "whatsapp": "https://wa.me/525561940502"
  },
  "itinerary": [
    {
      "time": "16:00",
      "title": "Ceremonia civil y recepción",
      "description": "Se solicita puntualidad",
      "icon": "heart"
    },
    {
      "time": "22:00",
      "title": "Fin de la celebración",
      "description": "Gracias por acompañarnos",
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

export const fernandaAlejandroPageData = {
  slug: fernandaAlejandro.slug,
  couple: { bride: "Fernanda", groom: "Alejandro" },
  date: fernandaAlejandro.date,
  endDate: fernandaAlejandro.endDate,
  dateDisplay: fernandaAlejandro.dateDisplay,
  dateLong: fernandaAlejandro.dateLong,
  introQuote: fernandaAlejandro.hero.quote,
  heroSubtitle: "Nuestra boda",
  heroQuote: fernandaAlejandro.hero.quote,
  welcomeTitle: "Con todo nuestro amor",
  welcome: ["1 Corintios 13:7–8", "Fernanda Trinidad Pérez y Alejandro Hernández Amador", "Con mucha alegría, te invitamos a celebrar nuestra unión y compartir con nosotros este día tan especial."],
  images: { hero: fernandaAlejandro.hero.image, couple: "/images/events/fernanda-alejandro/foto2.png", gallery: fernandaAlejandro.gallery.map(photo => photo.src) },
  music: { src: fernandaAlejandro.music.url, label: "Titanic" },
  features: { music:true, story:false, gallery:true, video:false, ceremony:true, reception:false, itinerary:true, dressCode:true, gifts:true, hotels:false, important:true, calendar:true, rsvp:true, songRequest:false, faqs:false },
  ceremony: fernandaAlejandro.ceremony,
  reception: fernandaAlejandro.reception,
  itinerary: [{time:"4:00 p. m.",title:"Ceremonia civil y recepción",icon:"heart"},{time:"10:00 p. m.",title:"Fin de la celebración",icon:"glass"}],
  dressCode: { title:"Formal", note:fernandaAlejandro.dressCode.text, colors:[] },
  gifts: fernandaAlejandro.gifts,
  bank: {enabled:false},
  important: [{title:"Puntualidad",description:"La ceremonia civil comienza a las 4:00 p. m. A todos nuestros invitados les pedimos puntualidad.",icon:"clock"},{title:"Confirma tu asistencia",description:"Es muy importante que confirmes tu asistencia para ayudarnos a organizar este día especial.",icon:"users"}],
  whatsapp: fernandaAlejandro.contact.whatsapp,
  rsvpSettings:{maxCompanions:5,askSongSuggestion:false},
};
