import onChange from 'on-change';
import {
  backgroundColorSwitch,
  errorAnimation,
  svgColorSwitch,
  winAnimation,
} from '../scripts/animation.js';
import getColorFromCssVariable from '../scripts/color.js';

const watchedResultState = (state) =>
  onChange(state, (path, value, previousValue) => {
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

    if (value === 'lose') {
      svgColorSwitch(backButton, dangerColor, primaryColor);
      backgroundColorSwitch(restartButton, dangerColor, primaryColor);
      input.setAttribute('disabled', '');
      input.setAttribute('placeholder', 'first time?');
      input.value = '';
      errorAnimation();
    }
    if (value === 'win') {
      svgColorSwitch(backButton, successColor, primaryColor);
      backgroundColorSwitch(restartButton, successColor, primaryColor);
      input.setAttribute('disabled', '');
      input.setAttribute('placeholder', 'congratulations');
      input.value = '';
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
