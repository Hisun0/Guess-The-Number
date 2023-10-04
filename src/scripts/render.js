export const renderContainer = (value, previousValue) => {
  const h1 = document.querySelector('span');
  if (h1.classList.contains('color-green')) {
    h1.classList.replace('color-green', 'color-blue');
  }
  if (h1.classList.contains('color-red')) {
    h1.classList.replace('color-red', 'color-blue');
  }

  const currentContainer = document.querySelector(
    `[data-active-target="${value}"]`
  );
  currentContainer.classList.add('active');

  const previousContainer = document.querySelector(
    `[data-active-target="${previousValue}"]`
  );
  previousContainer.classList.remove('active');
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
