import onChange from 'on-change';
import {
  errorAnimation,
  colorSwitch,
  winAnimation,
} from '../scripts/animation.js';
import getColorFromCssVariable from '../scripts/color.js';
import elements from '../elements.js';

const setResultStyles = (
  nextColor,
  previousColor,
  placeholderMessage,
  isDisabled,
) => {
  if (!isDisabled) {
    elements.input.removeAttribute('disabled');
  } else {
    elements.input.setAttribute('disabled', '');
  }
  elements.input.setAttribute('placeholder', placeholderMessage);
  elements.input.value = '';

  colorSwitch(elements.backButton, 'fill', 0.8, nextColor, previousColor);
  colorSwitch(
    elements.restartButton,
    'backgroundColor',
    0.4,
    nextColor,
    previousColor,
  );
};

const watchedResultState = (state) => onChange(state, (path, value, previousValue) => {
  const currentTheme = document.body.dataset.bsTheme;
  const dangerColor = getColorFromCssVariable(currentTheme, 'danger');
  const successColor = getColorFromCssVariable(currentTheme, 'success');
  const primaryColor = getColorFromCssVariable(currentTheme, 'primary');

  elements.guessButton.classList.remove('active-button');
  elements.restartButton.classList.add('active-button');

  if (value === 'lose') {
    setResultStyles(dangerColor, primaryColor, 'first time?', true);
    errorAnimation();
  }
  if (value === 'win') {
    setResultStyles(successColor, primaryColor, 'congratulations', true);
    winAnimation();
  }
  if (value === 'restart') {
    elements.input.removeAttribute('disabled');
    elements.guessButton.classList.add('active-button');
    elements.restartButton.classList.remove('active-button');

    if (previousValue === 'lose') {
      setResultStyles(primaryColor, dangerColor, 'enter the number', false);
    }
    if (previousValue === 'win') {
      setResultStyles(primaryColor, successColor, 'enter the number', false);
    }
  }
});

export default watchedResultState;
