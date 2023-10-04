import onChange from 'on-change';
import validateUserGuess from './scripts/validator.js';
import getRandomNumber from './scripts/random-number.js';
import { renderContainer, renderResult, renderTip } from './scripts/render.js';

export default () => {
  const state = {
    uiState: {
      display: 'menu',
    },
    game: {
      result: 'play',
      isGuessLess: null,
      userGuesses: [],
      guessValidationError: '',
      form: {
        inputDisabled: false,
        showButton: 'try',
      },
    },
  };

  const watchedUiState = onChange(state, (path, value, previousValue) => {
    if (state.uiState.display === 'question') {
      renderContainer(value, previousValue);
    }
    if (state.uiState.display === 'play') {
      renderContainer(value, previousValue);
      if (state.game.result === 'win') {
        renderResult('green');
      } else if (state.game.result === 'lose') {
        renderResult('red');
      }
    }
    if (state.uiState.display === 'menu') {
      renderContainer(value, previousValue);
    }
  });

  const watchedGameState = onChange(state, (path, value) => {
    if (state.game.result === 'win') {
      renderResult('green');
    }
    if (state.game.result === 'lose') {
      renderResult('red');
    }
    if (state.game.result === 'play') {
      const attemptsText = document.querySelector('.height-75 > p');
      attemptsText.textContent = value.join(', ');
    }
    if (state.game.result === 'restart') {
      const h1 = document.querySelector('span');
      h1.classList = '';
      h1.classList.add('color-blue');

      const p = document.querySelector('form > p');
      p.classList.remove('active');

      const backButton = document.querySelector('[data-for="play"]');
      backButton.classList = '';
      backButton.classList.add('btn-back', 'back-blue');

      const attemptsText = document.querySelector('.height-75 > p');
      attemptsText.textContent =
        'this is where your attempts will be displayed';
      state.game.result = 'play';
    }
  });

  const watchedTipState = onChange(state, (path, value) => {
    if (state.game.isGuessLess === false) {
      renderTip('high');
    } else {
      renderTip('low');
    }
  });

  const watchedErrorState = onChange(state, (path, value) => {
    if (state.game.guessValidationError !== '') {
      const errorText = document.querySelector('form > p');
      errorText.classList = '';
      errorText.classList.add('mg-5', 'color-red', 'active');
      errorText.textContent = value;
    }
  });

  const watchedFormState = onChange(state, () => {
    const input = document.querySelector('#input');
    input.disabled = state.game.form.inputDisabled;

    if (state.game.form.showButton === 'restart') {
      const restartButton = document.querySelector('.wrapper > button');
      const resultColor = state.game.result === 'win' ? 'green' : 'red';
      console.log(resultColor);
      restartButton.classList = '';
      restartButton.classList.add('active', `bg-${resultColor}`);

      const tryButton = document.querySelector('.wrapper > #submit');
      tryButton.classList.remove('active');
    }
    if (state.game.form.showButton === 'try') {
      const restartButton = document.querySelector('.wrapper > button');
      restartButton.classList = '';

      const tryButton = document.querySelector('.wrapper > #submit');
      tryButton.classList.add('active');
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
  console.log(randomNumber);

  const form = document.querySelector('form');
  const input = document.querySelector('#input');
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const userGuess = formData.get('name');

    const validationResult = validateUserGuess(userGuess);

    if (validationResult.length !== 0) {
      watchedErrorState.game.guessValidationError = validationResult[0];
      state.game.guessValidationError = '';
    } else {
      watchedGameState.game.userGuesses.push(userGuess);
      input.value = '';
      const numberGuess = Number(userGuess);
      const isCorrectGuess = numberGuess === randomNumber;

      if (isCorrectGuess) {
        watchedGameState.game.result = 'win';
      } else if (state.game.userGuesses.length === 10) {
        watchedGameState.game.result = 'lose';
      } else {
        watchedTipState.game.isGuessLess = numberGuess < randomNumber;
      }

      if (isCorrectGuess || state.game.userGuesses.length === 10) {
        watchedFormState.game.form.inputDisabled = true;
        watchedFormState.game.form.showButton = 'restart';
      }

      state.game.isGuessLess = null;
    }
  });

  const restartButton = document.querySelector('.width-60 > button');
  restartButton.addEventListener('click', (event) => {
    event.preventDefault();
    watchedGameState.game.result = 'restart';
    watchedFormState.game.form.inputDisabled = false;
    watchedFormState.game.form.showButton = 'try';
    state.game.userGuesses.length = 0;
    randomNumber = getRandomNumber(1, 100);
    console.log(randomNumber);
  });
};
