import onChange from 'on-change';

const renderSecondAnimation = () => {
  const logo = document.querySelector('.logo-anim');
  const container = document.querySelector('.container');
  const start = Date.now();

  const timer = setInterval(() => {
    const timePassed = Date.now() - start;

    if (timePassed >= 300) {
      clearInterval(timer);
      logo.style.transform = `translate(-50%, -38.7vh)`;
      return;
    }

    draw(timePassed);
  });

  const draw = (timePassed) => {
    logo.style.transform = `translate(-50%, ${Math.round(
      -((timePassed * 1.3) / 10)
    )}vh)`;
  };

  logo.innerHTML = '';

  const createH1 = () => {
    const h1 = document.createElement('h1');
    const textNode = document.createTextNode('Guess the ');
    const span = document.createElement('span');

    span.textContent = 'number';
    span.classList.add('color-blue');

    h1.append(textNode, span);
    return h1;
  };

  logo.append(createH1());
  logo.style.width = '300px';

  setTimeout(() => {
    container.innerHTML = '';
    container.append(createH1());
  }, 1000);
};

const renderThirdAnimation = () => {
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

const renderContainer = (value, previousValue) => {
  const currentContainer = document.querySelector(
    `[data-active-target="${value}"]`
  );
  console.log(currentContainer);
  currentContainer.classList.add('active');
  const previousContainer = document.querySelector(
    `[data-active-target="${previousValue}"]`
  );
  previousContainer.classList.remove('active');
};

export default () => {
  const state = {
    animation: 'first',
    uiState: 'menu',
  };

  const watchedState = onChange(state, (path, value, previousValue) => {
    if (state.animation === 'second') {
      renderSecondAnimation();
    }
    if (state.animation === 'third') {
      setTimeout(renderThirdAnimation, 1000);
    }
    if (state.uiState === 'question') {
      renderContainer(value, previousValue);
    }
    if (state.uiState === 'play') {
      renderContainer(value, previousValue);
    }
  });

  const animation = document.querySelector('.third');
  animation.addEventListener('animationend', () => {
    watchedState.animation = 'second';
    watchedState.animation = 'third';
  });

  const menuButtons = document.querySelectorAll('.btn-menu');
  menuButtons.forEach((menuButton) => {
    menuButton.addEventListener('click', (event) => {
      event.preventDefault();
      console.log('clicked');
      const buttonName = event.target.dataset.button;
      watchedState.uiState = buttonName;
    });
  });
};
