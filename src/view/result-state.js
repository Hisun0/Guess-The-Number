import onChange from 'on-change';
import {
  backgroundColorSwitch,
  errorAnimation,
  svgColorSwitch,
} from '../scripts/animation.js';
import getColorFromCssVariable from '../scripts/color.js';

const watchedResultState = (state) =>
  onChange(state, (path, value) => {
    if (value === 'lose') {
      const button = document.querySelector('#lng-play-guess');
      const input = document.querySelector('.form-control');
      const gameCard = document.querySelector('#game-card');
      const backButton = gameCard.querySelector('#button-back');
      const currentTheme = document.body.dataset.bsTheme;
      const dangerColor = getColorFromCssVariable(currentTheme, 'danger');
      const primaryColor = getColorFromCssVariable(currentTheme, 'primary');

      svgColorSwitch(backButton, dangerColor, primaryColor);
      backgroundColorSwitch(button, dangerColor, primaryColor);
      input.setAttribute('disabled', '');
      input.setAttribute('placeholder', 'first time?');
      input.value = '';
      errorAnimation();
    }
  });

export default watchedResultState;
