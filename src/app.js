import { startAnimation } from './scripts/animation.js';
import i18next from 'i18next';
import ru from './locales/ru.js';
import en from './locales/en.js';
import watchedUiState from './view/ui-state.js';
import watchedValidationState from './view/validation-state.js';
import validateUserGuess from './scripts/validator.js';
import watchedAttemptsState from './view/attempts-state.js';
import getRandomNumber from './scripts/random-number.js';
import watchedResultState from './view/result-state.js';
import getColorFromCssVariable from './scripts/color.js';

export default () => {
  startAnimation();

  i18next.init({
    lng: 'en',
    debug: true,
    resources: {
      ru,
      en,
    },
  });

  const state = {
    uiState: {
      display: 'menu',
      lng: 'en',
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
      if (buttonName !== 'play') {
        watchedUiState(state).uiState.headerColor = primaryColor;
      } else if (state.game.result === 'lose') {
        watchedUiState(state).uiState.headerColor = dangerColor;
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
    const formData = new FormData(event.target);
    const inputValue = formData.get('guess');
    try {
      const userGuess = await validateUserGuess(inputValue);
      watchedValidationState(state, state.uiState.lng).game.validationResult =
        'success';
      watchedAttemptsState(state).game.userGuesses.push(userGuess);

      if (state.game.userGuesses.length === 10) {
        watchedResultState(state).game.result = 'lose';
        const dangerColor = getColorFromCssVariable(
          state.uiState.theme,
          'danger'
        );
        watchedUiState(state).uiState.headerColor = dangerColor;
      } else if (userGuess === state.game.randomNumber) {
        watchedResultState(state).game.result = 'win';
      }
    } catch (err) {
      watchedValidationState(state, state.uiState.lng).game.validationResult =
        err.errors[0];
    }
  });
};
