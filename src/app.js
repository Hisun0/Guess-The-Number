import i18next from 'i18next';
import { startAnimation } from './scripts/animation.js';
import i18next from 'i18next';
import resources from './locales/index.js';
import watchedUiState from './view/ui-state.js';
import watchedValidationState from './view/validation-state.js';
import validateUserGuess from './scripts/validator.js';
import watchedAttemptsState from './view/attempts-state.js';
import getRandomNumber from './scripts/random-number.js';
import watchedResultState from './view/result-state.js';
import getColorFromCssVariable from './scripts/color.js';
import startGame from './scripts/game.js';
import setLanguage from './scripts/lng.js';

export default () => {
  startAnimation();

  i18next.init({
    lng: 'en',
    debug: true,
    resources,
  });

  const state = {
    uiState: {
      display: 'menu',
      lng: navigator.language,
      theme: 'dark',
      headerColor: getColorFromCssVariable('dark', 'primary'),
    },
    game: {
      validationResult: '',
      userGuesses: [],
      randomNumber: getRandomNumber(1, 100),
      result: '',
    },
  };

  setLanguage(state.uiState.lng);

  const menuButtons = document.querySelectorAll('[data-bs-target]');
  menuButtons.forEach((menuButton) => {
    menuButton.addEventListener('click', (event) => {
      event.preventDefault();
      const buttonName = menuButton.dataset.bsTarget;
      const dangerColor = getColorFromCssVariable(
        state.uiState.theme,
        'danger'
      );
      const primaryColor = getColorFromCssVariable(
        state.uiState.theme,
        'primary'
      );
      const successColor = getColorFromCssVariable(
        state.uiState.theme,
        'success'
      );
      if (buttonName !== 'play') {
        // это условие нужно для запоминания цвета хедера
        watchedUiState(state).uiState.headerColor = primaryColor;
      } else if (state.game.result === 'lose') {
        watchedUiState(state).uiState.headerColor = dangerColor;
      } else if (state.game.result === 'win') {
        watchedUiState(state).uiState.headerColor = successColor;
      }
      watchedUiState(state).uiState.display = buttonName;
    });
  });

  const themeSwitchButtons = document.querySelectorAll('[data-toggle-theme]');
  themeSwitchButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
      event.preventDefault();
      const theme = button.dataset.toggleTheme;
      watchedUiState(state).uiState.theme = theme;
    });
  });

  const languageSwitchButtons = document.querySelectorAll(
    '[data-toggle-language]'
  );
  languageSwitchButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
      event.preventDefault();
      const language = button.dataset.toggleLanguage;
      watchedUiState(state).uiState.lng = language;
    });
  });

  const form = document.querySelector('form');
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (state.game.result !== '') {
      const primaryColor = getColorFromCssVariable(
        state.uiState.theme,
        'primary'
      );
      watchedResultState(state).game.result = 'restart';
      watchedUiState(state).uiState.headerColor = primaryColor;
      watchedAttemptsState(state).game.userGuesses = [];
      state.game.result = '';
      state.game.randomNumber = getRandomNumber(1, 100);
    } else {
      const formData = new FormData(event.target);
      const inputValue = formData.get('guess');
      try {
        const userGuess = await validateUserGuess(inputValue);
        watchedValidationState(state).game.validationResult = 'success';
        watchedAttemptsState(state).game.userGuesses.push(userGuess);
        startGame(state, userGuess);
      } catch (err) {
        watchedValidationState(state, state.uiState.lng).game.validationResult =
          err.errors[0];
      }
    }
  });
};
