import watchedResultState from '../view/result-state.js';
import watchedUiState from '../view/ui-state.js';
import watchedValidationState from '../view/validation-state.js';
import getColorFromCssVariable from './color.js';

export default (state, userGuess) => {
  const setGameResult = (result, resultColor) => {
    watchedResultState(state).game.result = result;
    const color = getColorFromCssVariable(state.uiState.theme, resultColor);
    watchedUiState(state).uiState.headerColor = color;
  };

  if (state.game.userGuesses.length === 10) {
    setGameResult('lose', 'danger');
  } else if (userGuess === state.game.randomNumber) {
    setGameResult('win', 'success');
  } else if (userGuess < state.game.randomNumber) {
    watchedValidationState(state).game.validationResult = 'warnings.greater';
  } else if (userGuess > state.game.randomNumber) {
    watchedValidationState(state).game.validationResult = 'warnings.less';
  }
};
