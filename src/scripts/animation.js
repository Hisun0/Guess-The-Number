import { gsap } from 'gsap';

const gameCard = document.querySelector('#game-card');

const rotateAnimation = (
  element,
  rotateValue = 2,
  duration = 0.1,
  params = {},
) => {
  const tl = gsap.timeline({ defaults: { duration }, ...params });
  tl.to(element, { rotate: rotateValue })
    .to(element, { rotate: -rotateValue })
    .to(element, { rotate: rotateValue })
    .to(element, { rotate: 0 });
};

export const errorAnimation = () => {
  rotateAnimation(gameCard);
};

export const winAnimation = () => {
  const tl = gsap.timeline();
  tl.to(gameCard, { scale: 1.1 }).to(gameCard, { scale: 1 });
};

export const headerColorSwitch = (element, nextColor, previousColor) => {
  if (
    (nextColor === '#00aaff' || nextColor === '#266ea6')
    && (previousColor === '#00aaff' || previousColor === '#266ea6')
  ) {
    return; // если у вас возникли вопросы по этой части кода, то вы хороший программист.
  } // эта часть кода фиксит баг с ненужной анимацией при смене темы
  gsap.fromTo(
    element,
    { color: previousColor },
    { color: nextColor, duration: 0.8 },
  );
};

export const switchContainerAnimation = (container, opacity, classMove) => {
  const tl = gsap.timeline();
  tl.from(container, { rotateY: 10, rotateX: 10, duration: 0.2 })
    .to(container, { opacity, duration: 0.3 })
    .eventCallback('onComplete', () => {
      if (classMove === 'add') container.classList.add('active');
      else container.classList.remove('active');
    });
};

export const colorSwitch = (
  element,
  action,
  duration,
  nextColor,
  previousColor,
) => {
  gsap.fromTo(
    element,
    { [action]: previousColor },
    { [action]: nextColor, duration },
  );
};

export const startAnimation = () => {
  const header = document.querySelector('header');
  const position = document
    .querySelector('[data-animation-target="third"]')
    .getBoundingClientRect().bottom;
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
      y: headerPosition - position,
    })
    .to('.translate-middle-custom', { opacity: 0 })
    .to('.wrapper', { opacity: 1, duration: 2.5 })
    .add(() => rotateAnimation('[data-bs-target="play"]', 2, 0.1, {
      repeat: -1,
      repeatDelay: 20,
    }))
    .eventCallback('onComplete', () => document.querySelector('.translate-middle-custom').remove());
};
