import onChange from 'on-change';
import { startAnimation } from './scripts/animation.js';
import { renderContainer, renderResult, renderTip } from './scripts/render.js';

export default () => {
  startAnimation();

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
};
