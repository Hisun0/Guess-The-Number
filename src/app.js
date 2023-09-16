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

const renderContainer = (value, previousValue, state) => {
  if (value === true) {
    const currentContainer = document.querySelector(
      `[data-active-target="${state.uiState.display}"]`
    );
    currentContainer.classList.remove('active');

    const previousContainer = document.querySelector(
      `[data-active-target="menu"]`
    );
    previousContainer.classList.add('active');
    return;
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

export default () => {
  const state = {
    uiState: {
      animation: 'first',
      display: 'menu',
      backButtonClicked: false,
    },
    game: {
      count: 0,
      process: 'play',
    },
  };

  const watchedState = onChange(state, (path, value, previousValue) => {
    if (state.uiState.animation === 'second') {
      renderSecondAnimation();
    }
    if (state.uiState.animation === 'third') {
      setTimeout(renderThirdAnimation, 1000);
    }
    if (state.uiState.display === 'question') {
      renderContainer(value, previousValue, state);
    }
    if (state.uiState.display === 'play') {
      renderContainer(value, previousValue, state);
    }
    if (state.uiState.backButtonClicked === true) {
      renderContainer(value, previousValue, state);
    }
  });

  const animation = document.querySelector('.third');
  animation.addEventListener('animationend', () => {
    watchedState.uiState.animation = 'second';
    watchedState.uiState.animation = 'third';
  });

  const menuButtons = document.querySelectorAll('.btn-menu');
  menuButtons.forEach((menuButton) => {
    menuButton.addEventListener('click', (event) => {
      event.preventDefault();
      const buttonName = event.target.dataset.button;
      watchedState.uiState.display = buttonName;
    });
  });

  const backButtons = document.querySelectorAll('.btn-back');
  backButtons.forEach((backButton) => {
    backButton.addEventListener('click', (event) => {
      event.preventDefault();
      watchedState.uiState.backButtonClicked = true;
      watchedState.uiState.display = 'menu';
      watchedState.uiState.backButtonClicked = false;
    });
  });
};
