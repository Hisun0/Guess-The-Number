import { switchContainerAnimation } from './animation.js';

export const renderContainer = (value, previousValue) => {
  const previousContainer = document.querySelector(
    `[data-container-name="${previousValue}"]`,
  );
  switchContainerAnimation(previousContainer, 0, 'remove');

  const currentContainer = document.querySelector(
    `[data-container-name="${value}"]`,
  );
  switchContainerAnimation(currentContainer, 1, 'add');
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
