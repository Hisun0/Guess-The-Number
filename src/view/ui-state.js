import onChange from 'on-change';
import { renderContainer } from '../scripts/render.js';
import { headerColorSwitch } from '../scripts/animation.js';
import setLanguage from '../scripts/lng.js';

const watchedUiState = (state) => onChange(state, (path, value, previousValue) => {
  const header = document.querySelector('.header-color');
  if (path === 'uiState.headerColor') {
    headerColorSwitch(header, value, previousValue);
  }
  if (value === 'dark' || value === 'light') {
    header.style.color = '';
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
