import { gsap } from 'gsap';

const playButtonAnimation = () => {
  const playButton = document.querySelector('[data-bs-target="play"]');
  const playTl = gsap.timeline({
    defaults: { duration: 0.1 },
    repeat: -1,
    repeatDelay: 20,
  });
  playTl
    .to(playButton, { rotate: 3 })
    .to(playButton, { rotate: -3 })
    .to(playButton, { rotate: 3 })
    .to(playButton, { rotate: 0 });
};

export const startAnimation = () => {
  const header = document.querySelector('header');
  const first = document.querySelector('[data-animation-target="third"]');
  const position = first.getBoundingClientRect();
  const { bottom } = position;
  const headerPosition = header.getBoundingClientRect().bottom;

  const tl = gsap.timeline();
  tl.from('[data-animation-target="first"]', {
    opacity: 0,
    duration: 1,
  })
    .from('[data-animation-target="second"]', {
      opacity: 0,
      duration: 1,
    })
    .from('[data-animation-target="third"]', {
      opacity: 0,
      duration: 1,
    })
    .to('.move-element', {
      y: headerPosition - bottom,
    })
    .to('.translate-middle-custom', { opacity: 0 })
    .to('.wrapper', { opacity: 1, duration: 2.5 })
    .add(playButtonAnimation)
    .eventCallback('onComplete', () =>
      document.querySelector('.translate-middle-custom').remove()
    );
};
