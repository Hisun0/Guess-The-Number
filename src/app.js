import { startAnimation } from './scripts/animation.js';
import i18next from 'i18next';
import ru from './locales/ru.js';
import en from './locales/en.js';
import watchedUiState from './view/ui-state.js';
import watchedLanguageState from './view/language-state.js';

export default () => {
  startAnimation();

  i18next.init({
    lng: 'en',
    debug: true,
    resources: {
      ...ru,
      ...en,
    },
  });

  const state = {
    uiState: {
      display: 'menu',
      lng: 'en',
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

  const menuButtons = document.querySelectorAll('[data-bs-target]');
  menuButtons.forEach((menuButton) => {
    menuButton.addEventListener('click', (event) => {
      event.preventDefault();
      const buttonName = menuButton.dataset.bsTarget;
      watchedUiState(state).uiState.display = buttonName;
    });
  });

  const themeSwitchButtons = document.querySelectorAll('[data-toggle-theme]');
  themeSwitchButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
      event.preventDefault();
      const theme = button.dataset.toggleTheme;
      document.body.dataset.bsTheme = theme;
    });
  });

  const languageSwitchButtons = document.querySelectorAll(
    '[data-toggle-language]'
  );
  languageSwitchButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
      event.preventDefault();
      const language = button.dataset.toggleLanguage;
      watchedLanguageState(state).uiState.lng = language;
    });
  });
};
