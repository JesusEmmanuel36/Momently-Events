export const APPEARANCE_SECTIONS = [["intro","Sobre",false],["hero","Portada",true],["welcome","Bienvenida",true],["paragraphs","Frases y mensajes",false],["family","Familia y padrinos",true],["countdown","Conteo regresivo",false],["story","Historia",false],["gallery","Galería",false],["ceremony","Ceremonia",true],["reception","Recepción",true],["itinerary","Itinerario",false],["dressCode","Vestimenta",false],["gifts","Regalos",false],["hotels","Hospedaje",false],["important","Avisos importantes",false],["video","Video",false],["calendar","Calendario",false],["rsvp","Confirmación RSVP",false],["songRequest","Sugerencias de canciones",false],["faqs","Preguntas frecuentes",false],["contact","WhatsApp y contacto",false],["closing","Cierre",true]];
export const SECTION_COLOR_FIELDS = [["background","Fondo de la sección","ivory"],["text","Textos","dark"],["headings","Títulos","dark"],["icons","Iconos","primary"],["button","Fondo de botones","primary"],["buttonText","Texto de botones","ivory"]];
export const SECTION_EXTRA_FIELDS = {
 intro:[["paper","Papel exterior del sobre","ivory"],["letter","Hoja interior","ivory"],["ribbon","Moño","rose"],["seal","Sello / botón del sobre","champagne"],["sealText","Iniciales del sello","dark"]],
 countdown:[["numbers","Números del contador","ivory"],["labels","Días, horas, minutos y segundos","champagne"]],
 rsvp:[["asideBackground","Fondo del panel lateral","surfaceDark"],["asideText","Texto del panel lateral","ivory"],["asideHeading","Título del panel lateral","ivory"],["initials","Iniciales del panel lateral","champagne"],["inputBackground","Fondo de los campos","ivory"],["inputText","Texto de los campos","dark"]],
 songRequest:[["inputBackground","Fondo de los campos","ivory"],["inputText","Texto de los campos","dark"]]
};
export function sectionColorFields(name) {
 const withoutButtons=["welcome","paragraphs","family","countdown","story","gallery","itinerary","dressCode","important","video","faqs","closing"];
 const withoutIcons=["intro","hero","welcome","paragraphs","family","countdown","story","gallery","video","closing"];
 return [...SECTION_COLOR_FIELDS.filter(([key])=>!(withoutButtons.includes(name)&&["button","buttonText"].includes(key))&&!(withoutIcons.includes(name)&&key==="icons")&&!(name==="intro"&&key==="headings")),...(SECTION_EXTRA_FIELDS[name]||[])];
}
export function sectionAppearanceStyle(settings={}) {
 if(!settings.colorsEnabled)return {};
 const style=Object.fromEntries([...SECTION_COLOR_FIELDS,...Object.values(SECTION_EXTRA_FIELDS).flat()].filter(([key])=>settings[key]).map(([key])=>[`--section-${key}`,settings[key]]));
 for(const [source,target] of [["text","--text"],["text","--text-soft"]])if(settings[source])style[target]=settings[source];
 return style;
}
