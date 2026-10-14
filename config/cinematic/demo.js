/** @type {import('./types').CinematicConfig} */
export const cinematicDemo = {
  couple: { partner1: 'Valeria', partner2: 'Mateo' },
  date: '2027-06-14T17:00:00-06:00',
  dateLabel: '14 de junio de 2027',
  city: 'Santiago, Nuevo León',
  theme: { ivory: '#F7F1E8', coffee: '#574236', champagne: '#CDB38A', rose: '#C49D91' },
  frame: { left: 31.6, top: 25.0, width: 38.6, height: 39.8, originX: 50.9, originY: 44.9 },
  frameMobile: {left:26.3,top:41.8,width:50.7,height:22.4,originX:51.65,originY:53},
  music: {url:'/audio/lesly-marcelino-perfect.mp3',label:'Perfect · Ed Sheeran'},
  scenes: [
    { id: 'frame', type: 'frameZoom', image: '/images/cinematic-demo/scene-01-room.webp', alt: 'Una fotografía de Valeria y Mateo sobre una mesa cálida', eyebrow: 'Algunas historias', title: 'merecen quedarse\npara siempre.', copy: 'La nuestra comienza aquí.', chapter: 'El recuerdo', animationPreset: 'zoomFrameToFullscreen', position: 'center' },
    { id: 'portrait', type: 'coupleHero', image: '/images/cinematic-demo/scene-02-portrait.webp', alt: 'Valeria y Mateo se miran en un jardín al atardecer', eyebrow: 'Nuestra nueva historia', title: 'Valeria & Mateo', copy: '14 de junio de 2027 · Santiago, Nuevo León', chapter: 'Nosotros', animationPreset: 'slowCinematicZoom', position: '50% 40%' },
    { id: 'walk', type: 'story', image: '/images/cinematic-demo/scene-03-walk.webp', alt: 'La pareja camina tomada de la mano entre jardines', eyebrow: 'Todos los caminos', title: 'nos trajeron\nhasta aquí.', copy: 'Entre miradas, caminos y momentos compartidos, aprendimos que el hogar es una persona.', chapter: 'El camino', animationPreset: 'parallaxWalk', position: '65% center' },
    { id: 'details', type: 'detail', image: '/images/cinematic-demo/scene-04-details.webp', alt: 'Sus manos entrelazadas junto a un anillo y pétalos', eyebrow: 'Una promesa sencilla', title: 'Elegirte.\nCada día.', copy: 'En los pequeños momentos encontramos todo lo que queremos para nuestra vida.', chapter: 'La promesa', animationPreset: 'intimateZoom', position: '50% center' },
    { id: 'window', type: 'story', image: '/images/cinematic-demo/scene-05-window.webp', alt: 'Valeria y Mateo junto a una ventana con luz cálida', eyebrow: 'Y ahora', title: 'el comienzo de\ntodo lo demás.', copy: 'Nos encantaría compartir contigo el comienzo de nuestra nueva historia.', chapter: 'Lo que viene', animationPreset: 'windowParallax', position: '62% center' },
    { id: 'wedding', type: 'weddingReveal', image: '/images/cinematic-demo/scene-06-wedding.webp', alt: 'La pareja bajo un arco de flores en una hacienda iluminada', eyebrow: 'Con el corazón lleno', title: 'Nos casamos.', copy: 'Y queremos vivir este momento contigo.', chapter: 'El sí', animationPreset: 'weddingReveal', position: 'center' },
  ],
  event: {
    ceremony: { name: 'Parroquia del Sagrado Corazón', time: '5:00 p. m.', place: 'Monterrey, Nuevo León' },
    reception: { name: 'Hacienda San Gabriel', time: '7:00 p. m.', place: 'Santiago, Nuevo León' },
    dressCode: 'Formal / Elegante',
  },
};
