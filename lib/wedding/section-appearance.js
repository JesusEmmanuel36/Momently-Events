export const APPEARANCE_SECTIONS = [["intro","Sobre",false],["hero","Portada",true],["welcome","Bienvenida",true],["paragraphs","Frases y mensajes",false],["family","Familia y padrinos",true],["countdown","Conteo regresivo",false],["story","Historia",false],["gallery","Galería",false],["ceremony","Ceremonia",true],["reception","Recepción",true],["itinerary","Itinerario",false],["dressCode","Vestimenta",false],["gifts","Regalos",false],["hotels","Hospedaje",false],["important","Avisos importantes",false],["video","Video",false],["calendar","Calendario",false],["rsvp","Confirmación RSVP",false],["songRequest","Sugerencias de canciones",false],["faqs","Preguntas frecuentes",false],["contact","WhatsApp y contacto",false],["closing","Cierre",true]];
export const SECTION_COLOR_FIELDS = [["background","Fondo","ivory"],["text","Textos","dark"],["headings","Títulos","dark"],["icons","Iconos","primary"],["button","Fondo de botones","primary"],["buttonText","Texto de botones","ivory"]];
export function sectionAppearanceStyle(settings={}) {
 if(!settings.colorsEnabled)return {};
 const style=Object.fromEntries(SECTION_COLOR_FIELDS.filter(([key])=>settings[key]).map(([key])=>[`--section-${key}`,settings[key]]));
 for(const [source,target] of [["text","--text"],["text","--text-soft"],["text","--coffee-dark"]])if(settings[source])style[target]=settings[source];
 return style;
}
