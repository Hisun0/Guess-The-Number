import onChange from 'on-change';
import i18next from 'i18next';
import elements from '../elements.js';

const watchedAttemptsState = (state) => onChange(state, (path, value) => {
  if (value.length === 0) {
    const lng = document.documentElement.getAttribute('lang');
    elements.attemptsContainer.classList.replace('h5', 'h6');
    elements.attemptsContainer.textContent = i18next.t('play.attempts.text', {
      lng,
    });
  } else {
    const attemptsStr = value.join(', ');
    elements.attemptsContainer.classList.replace('h6', 'h5');
    elements.attemptsContainer.textContent = attemptsStr;
  }
});

export default watchedAttemptsState;
