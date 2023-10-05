import onChange from 'on-change';

const watchedAttemptsState = (state) =>
  onChange(state, (path, value) => {
    const attemptsContainer = document.querySelector('#lng-play-attempts-text');
    const attemptsStr = value.join(', ');
    attemptsContainer.classList.replace('h6', 'h5');
    attemptsContainer.textContent = attemptsStr;
  });

export default watchedAttemptsState;
