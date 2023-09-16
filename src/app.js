import onChange from 'on-change';
import validateUserGuess from './scripts/validator.js';
import getRandomNumber from './scripts/random-number.js';

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
  currentContainer.classList.add('active');

  const previousContainer = document.querySelector(
    `[data-active-target="${previousValue}"]`
  );
  previousContainer.classList.remove('active');
};

const renderError = (value) => {
  const errorText = document.querySelector('form > p');
  errorText.classList.add('active');
  errorText.textContent = value;
};

export default () => {
  const state = {
    uiState: {
      animation: 'first',
      display: 'menu',
      backButtonFor: 'menu',
    },
    game: {
      count: 0,
      win: false,
      userGuess: '',
      guessValidationError: '',
    },
  };

  const watchedAnimationState = onChange(state, () => {
    if (state.uiState.animation === 'second') {
      renderSecondAnimation();
    }
    if (state.uiState.animation === 'third') {
      setTimeout(renderThirdAnimation, 1000);
    }
  });

  const watchedUiState = onChange(state, (path, value, previousValue) => {
    if (state.uiState.display === 'question') {
      renderContainer(value, previousValue);
    }
    if (state.uiState.display === 'play') {
      renderContainer(value, previousValue);
    }
    if (state.uiState.display === 'menu') {
      renderContainer(value, previousValue);
    }
  });

  const watchedGameState = onChange(state, (path, value) => {
    if (state.game.guessValidationError !== '') {
      renderError(value);
    }
  });

  const animation = document.querySelector('.third');
  animation.addEventListener('animationend', () => {
    watchedAnimationState.uiState.animation = 'second';
    watchedAnimationState.uiState.animation = 'third';
    state.uiState.animation = 'end';
  });

  const menuButtons = document.querySelectorAll('.btn-menu');
  menuButtons.forEach((menuButton) => {
    menuButton.addEventListener('click', (event) => {
      event.preventDefault();
      const buttonName = event.target.dataset.button;
      watchedUiState.uiState.display = buttonName;
    });
  });

  const backButtons = document.querySelectorAll('.btn-back');
  backButtons.forEach((backButton) => {
    backButton.addEventListener('click', (event) => {
      event.preventDefault();
      watchedUiState.uiState.display = 'menu';
    });
  });

  let randomNumber = getRandomNumber(1, 100);

  const form = document.querySelector('form');
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const userGuess = formData.get('name');

    const validationResult = validateUserGuess(userGuess);
    if (validationResult.length !== 0) {
      watchedGameState.game.guessValidationError = validationResult[0];
    } else {
      if (Number(userGuess) === randomNumber) {
        watchedGameState.game.win = true;
      } else {
        watchedGameState.game.userGuess = userGuess;
      }
    }
  });
};
