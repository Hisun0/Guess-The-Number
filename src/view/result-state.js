import onChange from 'on-change';
import {
  backgroundColorSwitch,
  errorAnimation,
  svgColorSwitch,
  winAnimation,
} from '../scripts/animation.js';
import getColorFromCssVariable from '../scripts/color.js';

const watchedResultState = (state) => onChange(state, (path, value, previousValue) => {
  const guessButton = document.querySelector('#lng-play-guess');
  const restartButton = document.querySelector('#lng-play-restart');
  const input = document.querySelector('.form-control');
  const gameCard = document.querySelector('#game-card');
  const backButton = gameCard.querySelector('#button-back');
  const currentTheme = document.body.dataset.bsTheme;
  const dangerColor = getColorFromCssVariable(currentTheme, 'danger');
  const successColor = getColorFromCssVariable(currentTheme, 'success');
  const primaryColor = getColorFromCssVariable(currentTheme, 'primary');

  guessButton.classList.remove('active-button');
  restartButton.classList.add('active-button');

  const setResultStyles = (resultColor, placeholderMessage) => {
    svgColorSwitch(backButton, resultColor, primaryColor);
    backgroundColorSwitch(restartButton, resultColor, primaryColor);
    input.setAttribute('disabled', '');
    input.setAttribute('placeholder', placeholderMessage);
    input.value = '';
  };

  if (value === 'lose') {
    setResultStyles(dangerColor, 'first time?');
    errorAnimation();
  }
  if (value === 'win') {
    setResultStyles(successColor, 'congratulations');
    winAnimation();
  }
  if (value === 'restart') {
    input.removeAttribute('disabled');
    input.setAttribute('placeholder', 'enter the number');
    guessButton.classList.add('active-button');
    restartButton.classList.remove('active-button');

    if (previousValue === 'lose') {
      svgColorSwitch(backButton, primaryColor, dangerColor);
      backgroundColorSwitch(restartButton, primaryColor, dangerColor);
    }
    if (previousValue === 'win') {
      svgColorSwitch(backButton, primaryColor, successColor);
      backgroundColorSwitch(restartButton, primaryColor, successColor);
    }
  }
});

export default watchedResultState;
