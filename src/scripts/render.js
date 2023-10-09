import { gsap } from 'gsap';

export const renderContainer = (value, previousValue) => {
  const tl = gsap.timeline();
  const tl2 = gsap.timeline();

  const previousContainer = document.querySelector(
    `[data-container-name="${previousValue}"]`,
  );

  tl.from(previousContainer, { rotateY: 10, rotateX: 10, duration: 0.2 })
    .to(previousContainer, { opacity: 0, duration: 0.3 })
    .eventCallback('onComplete', () => previousContainer.classList.remove('active'));

  const currentContainer = document.querySelector(
    `[data-container-name="${value}"]`,
  );

  tl2
    .from(currentContainer, { rotateY: 10, rotateX: 10, duration: 0.2 })
    .to(currentContainer, { opacity: 1, duration: 0.3 })
    .eventCallback('onComplete', () => currentContainer.classList.add('active'));
};

export const renderResult = (resultColor) => {
  const tryButton = document.querySelector('.wrapper > #submit');
  tryButton.classList.remove('active');

  const p = document.querySelector('form > p');
  p.classList = '';
  p.classList.add('mg-5', `color-${resultColor}`, 'active');
  const resultMessage = resultColor === 'green' ? 'you win' : 'you lose';
  p.textContent = resultMessage;

  const backButton = document.querySelector('[data-for="play"]');
  backButton.classList.replace('back-blue', `back-${resultColor}`);

  const h1 = document.querySelector('span');
  h1.classList.replace('color-blue', `color-${resultColor}`);
};

export const renderTip = (tip) => {
  const p = document.querySelector('form > p');
  p.classList = '';
  p.classList.add('mg-5', 'color-yellow', 'active');
  p.textContent = `your number is too ${tip}`;
};
