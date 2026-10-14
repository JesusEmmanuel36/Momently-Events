import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/** Isolated context: never kills another invitation's triggers. @param {HTMLElement} root @param {import('../../config/cinematic/types').CinematicConfig} config */
export function mountCinematicTimeline(root, config) {
  gsap.registerPlugin(ScrollTrigger);
  const media = gsap.matchMedia();
  media.add('(prefers-reduced-motion: no-preference)', () => {
    const track = root.querySelector('[data-track]');
    const canvas = /** @type {HTMLElement} */ (root.querySelector('[data-camera]'));
    const scenes = /** @type {HTMLElement[]} */ (Array.from(root.querySelectorAll('[data-scene]')));
    if (!track || !canvas || !scenes.length) return;
    const profile = () => innerWidth <= 700 ? config.frameMobile : config.frame;
    root.dataset.motion = 'cinematic';
    let chapter = -1;
    const marks = [0, 1.55, 2.6, 3.85, 5.05, 6.25];
    const timeline = gsap.timeline({ defaults: {ease: 'none'}, scrollTrigger: {
      trigger: track, start: 'top top', end: 'bottom bottom', scrub: .65, invalidateOnRefresh: true,
      onUpdate: self => {
        const time = self.progress * 7.65;
        const index = Math.max(0, marks.findLastIndex(mark => time >= mark));
        if (chapter !== index) {
          chapter = index; root.dataset.chapter = String(index);
          const label = root.querySelector('[data-chapter-label]');
          if (label) label.textContent = config.scenes[index].chapter;
          scenes.forEach((scene, i) => scene.setAttribute('aria-hidden', String(i !== index)));
        }
        root.style.setProperty('--progress', String(self.progress));
      },
    }});
    gsap.set(scenes.slice(1), {autoAlpha: 0});
    timeline.to(scenes[0].querySelector('[data-copy]'), {autoAlpha: 0, y: -30, duration: .35}, .15);
    timeline.to(canvas, {
      scale: () => Math.max(innerWidth / (canvas.offsetWidth * profile().width / 100), innerHeight / (canvas.offsetHeight * profile().height / 100)) * 1.08,
      x: () => (50 - profile().originX) / 100 * canvas.offsetWidth,
      y: () => (50 - profile().originY) / 100 * canvas.offsetHeight,
      transformOrigin: () => `${profile().originX}% ${profile().originY}%`, duration: 1.6,
    }, .2);
    for (let index = 1; index < scenes.length; index++) {
      const scene = scenes[index]; const start = marks[index];
      const image = scene.querySelector('[data-photo]'); const copy = scene.querySelector('[data-copy]');
      timeline.fromTo(scene, {autoAlpha: 0}, {autoAlpha: 1, duration: .45}, start);
      timeline.to(scenes[index - 1], {autoAlpha: 0, duration: .45}, start + .2);
      timeline.fromTo(image, {scale: index === 3 ? 1.18 : 1.09, xPercent: index === 2 ? 3 : 0}, {scale: 1, xPercent: index === 4 ? -2 : 0, duration: 1.4}, start);
      timeline.fromTo(copy, {autoAlpha: 0, y: 36}, {autoAlpha: 1, y: 0, duration: .45, ease: 'power2.out'}, start + .22);
    }
    timeline.to({}, {duration: .6}, 7.05);
    ScrollTrigger.refresh();
    return () => {
      root.dataset.motion = 'static'; root.style.removeProperty('--progress');
      scenes.forEach(scene => scene.removeAttribute('aria-hidden'));
    };
  });
  return () => media.revert();
}
