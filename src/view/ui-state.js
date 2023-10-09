import onChange from 'on-change';
import {
  headerColorSwitch,
  switchContainerAnimation,
} from '../scripts/animation.js';
import setLanguage from '../scripts/lng.js';
import elements from '../elements.js';

const renderContainer = (value, previousValue) => {
  const previousContainer = document.querySelector(
    `[data-container-name="${previousValue}"]`,
  );
  switchContainerAnimation(previousContainer, 0, 'remove');

  const currentContainer = document.querySelector(
    `[data-container-name="${value}"]`,
  );
  switchContainerAnimation(currentContainer, 1, 'add');
};

const watchedUiState = (state) => onChange(state, (path, value, previousValue) => {
  if (path === 'uiState.headerColor') {
    headerColorSwitch(elements.headerSpan, value, previousValue);
  }
  if (value === 'dark' || value === 'light') {
    elements.headerSpan.style.color = '';
    document.body.dataset.bsTheme = value;
  }
  if (value === 'rules') {
    renderContainer(value, previousValue);
  }
  if (value === 'play') {
    renderContainer(value, previousValue);
  }
  if (value === 'menu') {
    renderContainer(value, previousValue);
  }
  if (value === 'settings') {
    renderContainer(value, previousValue);
  }
  if (value === 'ru') {
    setLanguage('ru');
  }
  if (value === 'en') {
    setLanguage('en');
  }
});

export default watchedUiState;
