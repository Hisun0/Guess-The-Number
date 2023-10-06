import onChange from 'on-change';
import i18next from 'i18next';

const watchedAttemptsState = (state) =>
  onChange(state, (path, value) => {
    const attemptsContainer = document.querySelector('#lng-play-attempts-text');
    if (value.length === 0) {
      const lng = document.documentElement.getAttribute('lang');
      attemptsContainer.classList.replace('h5', 'h6');
      attemptsContainer.textContent = i18next.t('play.attempts.text', { lng });
    } else {
      const attemptsStr = value.join(', ');
      attemptsContainer.classList.replace('h6', 'h5');
      attemptsContainer.textContent = attemptsStr;
    }
  });

export default watchedAttemptsState;
