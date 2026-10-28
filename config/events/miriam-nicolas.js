import {wedding as reference} from '../wedding.js';
const assets='/images/events/miriam-y-nicolas';
const photos=['image copy 12.png','image copy 6.png','image copy 2.png','image.png','image copy 3.png','image copy 7.png','image copy 8.png','image copy 9.png','image copy 10.png','image copy 13.png','image copy.png','image copy 5.png'];
export const miriamNicolas={
 slug:'miriam-y-nicolas',templateKey:'miriam-nicolas-gold-coffee-wedding',eventTitle:'Miriam y Nicolás | Nuestra boda',
 couple:{bride:'Miriam',groom:'Nicolás'},date:'2027-01-15T15:00:00-06:00',timezone:'America/Mexico_City',dateDisplay:'15 · ENERO · 2027',dateLong:'Viernes, 15 de enero de 2027',
 heroSubtitle:'Nuestra boda',heroQuote:'Nos encantaría compartir contigo el comienzo de nuestra nueva historia.',
 welcomeTitle:reference.welcomeTitle,welcome:reference.welcome,
 images:{hero:assets+'/portada.png',gallery:photos.map(name=>assets+'/'+name)},galleryItems:photos.map((name,index)=>({src:assets+'/'+name,alt:`Recuerdo de Miriam y Nicolás ${index+1}`})),
 envelopeLayout:{openWidth:97.5,openBottom:8.1,sealTop:50},
 music:{src:'/audio/miriamynicolas.mp3',label:'Nuestra canción'},
 ceremony:{label:'Discurso',name:'Salón del Reino de los Testigos de Jehová',time:'3:00 p. m.',address:'Río Mezcala 283, Campamento Obrero, 60992 Las Guacamayas, Mich.',mapsUrl:'https://maps.app.goo.gl/MAaPuxQn73RCSspk6?g_st=aw'},
 reception:{label:'Recepción',name:'HR Hacienda de Rodríguez',time:'4:00 p. m.',address:'Palmira 55, colonia Aeropuerto, Las Guacamayas, Mich.',mapsUrl:'https://maps.app.goo.gl/SJAUUhjT1HcFk9eh7?g_st=aw'},
 itinerary:[{time:'3:00 p. m.',title:'Discurso',icon:'speech'},{time:'4:00 p. m.',title:'Recepción',icon:'arrival'},{time:'5:00 p. m.',title:'Comida',icon:'meal'},{time:'6:00 p. m.',title:'Primer baile',icon:'dance'},{time:'8:00 p. m.',title:'Pastel',icon:'cake'}],
 dressCode:{note:'El color blanco está reservado para la novia. Los colores café y beige están reservados para la familia.'},
 giftMessage:'Su presencia es nuestro mejor regalo. Si desean tener un detalle con nosotros, pueden hacerlo mediante lluvia de sobres o transferencia.',gifts:[{name:'Lluvia de sobres',description:'Un detalle con cariño para este nuevo comienzo.'}],
 bank:{enabled:true,bank:'BanCoppel',holder:'Miriam Hernández',clabe:'137475105374295643',account:''},
 verses:[{reference:'Cantar de los Cantares 8:6',text:'Ponme como un sello sobre tu corazón, como una marca sobre tu brazo'},{reference:'Cantar de los Cantares 2:16',text:'Mi amado es mío, y yo suya;'}],
 additionalBank:{enabled:true,bank:'Mercado Pago W',holder:'Nicolas Hernandez Villagomez',clabe:'722969016723778187',account:''},
 whatsapp:'https://wa.me/527531420676',phone:'753 142 0676',
 personalizedPasses:true,
 features:{rsvp:false,songRequest:true,story:false},
 theme:{primary:'#977849',dark:'#3B2B22',champagne:'#CBB58E',cream:'#F2EADF',ivory:'#FBF8F2',rose:'#C9B5A2',sage:'#9A9480'}
};
