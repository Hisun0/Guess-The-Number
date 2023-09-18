export const renderSecondAnimation = () => {
  const logo = document.querySelector('.logo-anim');
  const container = document.querySelector('.container');
  const start = Date.now();

  const createH1 = (text) => {
    const h1 = document.createElement('h1');
    const span = document.createElement('span');
    span.textContent = text;
    span.classList.add('color-blue');
    h1.append('Guess the ', span);
    return h1;
  };

  const draw = (timePassed) => {
    logo.style.transform = `translate(-50%, ${Math.round(
      -((timePassed * 1.3) / 10)
    )}vh)`;
  };

  const timer = setInterval(() => {
    const timePassed = Date.now() - start;
    if (timePassed >= 300) {
      clearInterval(timer);
      logo.style.transform = `translate(-50%, -38.7vh)`;
      return;
    }
    draw(timePassed);
  });

  logo.innerHTML = '';
  logo.append(createH1('number'));
  logo.style.width = '300px';

  setTimeout(() => {
    container.innerHTML = '';
    container.append(createH1('number'));
  }, 1000);
};

export const renderThirdAnimation = () => {
  const start = Date.now();
  const hiddenContainers = document.querySelectorAll('.hidden');

  hiddenContainers.forEach((hiddenContainer) => {
    const timer = setInterval(() => {
      const timePassed = Date.now() - start;

      if (timePassed >= 1000) {
        clearInterval(timer);
        hiddenContainer.classList.remove('hidden');
        return;
      }

      draw(timePassed);
    });

    const draw = (timePassed) => {
      const opacityValue = Math.round(timePassed / 100);
      if (opacityValue === 10) {
        hiddenContainer.style.opacity = `1`;
        return;
      }
      hiddenContainer.style.opacity = `0.${opacityValue}`;
    };
  });

  const header = document.querySelector('header');
  header.classList.add('relative');
};

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
