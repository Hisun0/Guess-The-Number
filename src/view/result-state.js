import onChange from 'on-change';
import {
  errorAnimation,
  colorSwitch,
  winAnimation,
} from '../scripts/animation.js';
import getColorFromCssVariable from '../scripts/color.js';
import elements from '../elements.js';

const watchedResultState = (state) => onChange(state, (path, value, previousValue) => {
  const currentTheme = document.body.dataset.bsTheme;
  const dangerColor = getColorFromCssVariable(currentTheme, 'danger');
  const successColor = getColorFromCssVariable(currentTheme, 'success');
  const primaryColor = getColorFromCssVariable(currentTheme, 'primary');

  elements.guessButton.classList.remove('active-button');
  elements.restartButton.classList.add('active-button');

  const setResultStyles = (resultColor, placeholderMessage) => {
    colorSwitch(elements.backButton, 'fill', 0.8, resultColor, primaryColor);
    colorSwitch(
      elements.restartButton,
      'backgroundColor',
      0.4,
      resultColor,
      primaryColor,
    );
    elements.input.setAttribute('disabled', '');
    elements.input.setAttribute('placeholder', placeholderMessage);
    elements.input.value = '';
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
    elements.input.removeAttribute('disabled');
    elements.input.setAttribute('placeholder', 'enter the number');
    elements.guessButton.classList.add('active-button');
    elements.restartButton.classList.remove('active-button');

    if (previousValue === 'lose') {
      colorSwitch(
        elements.backButton,
        'fill',
        0.8,
        primaryColor,
        dangerColor,
      );
      colorSwitch(
        elements.restartButton,
        'backgroundColor',
        0.4,
        primaryColor,
        dangerColor,
      );
    }
    if (previousValue === 'win') {
      colorSwitch(
        elements.backButton,
        'fill',
        0.8,
        primaryColor,
        successColor,
      );
      colorSwitch(
        elements.restartButton,
        'backgroundColor',
        0.4,
        primaryColor,
        successColor,
      );
    }
  }
});

export default watchedResultState;
