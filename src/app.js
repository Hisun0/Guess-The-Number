import onChange from 'on-change';
import { startAnimation } from './scripts/animation.js';
import { renderContainer, renderResult, renderTip } from './scripts/render.js';
import i18next from 'i18next';
import setLanguage from './lng.js';
import ruSettings from './locales/ru.settings.js';
import ruFooter from './locales/ru.footer.js';
import ruMenu from './locales/ru.menu.js';
import ruPlay from './locales/ru.play.js';
import ruRules from './locales/ru.rules.js';
import enSettings from './locales/en.settings.js';
import enFooter from './locales/en.footer.js';
import enMenu from './locales/en.menu.js';
import enPlay from './locales/en.play.js';
import enRules from './locales/en.rules.js';

export default () => {
  startAnimation();

  i18next.init({
    lng: 'en',
    debug: true,
    resources: {
      ru: {
        translation: {
          ...ruSettings,
          ...ruFooter,
          ...ruMenu,
          ...ruRules,
          ...ruPlay,
        },
      },
      en: {
        translation: {
          ...enSettings,
          ...enFooter,
          ...enMenu,
          ...enRules,
          ...enPlay,
        },
      },
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

  const watchedUiState = onChange(state, (path, value, previousValue) => {
    if (state.uiState.display === 'rules') {
      renderContainer(value, previousValue);
    }
    if (state.uiState.display === 'play') {
      renderContainer(value, previousValue);
    }
    if (state.uiState.display === 'menu') {
      renderContainer(value, previousValue);
    }
    if (state.uiState.display === 'settings') {
      renderContainer(value, previousValue);
    }
  });

  const watchedLngState = onChange(state, () => {
    if (state.uiState.lng === 'ru') {
      setLanguage('ru');
    }
    if (state.uiState.lng === 'en') {
      setLanguage('en');
    }
  });

  const menuButtons = document.querySelectorAll('[data-bs-target]');
  menuButtons.forEach((menuButton) => {
    menuButton.addEventListener('click', (event) => {
      event.preventDefault();
      const buttonName = menuButton.dataset.bsTarget;
      watchedUiState.uiState.display = buttonName;
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
      watchedLngState.uiState.lng = language;
    });
  });
};
