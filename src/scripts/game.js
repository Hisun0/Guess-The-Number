import watchedResultState from '../view/result-state.js';
import watchedUiState from '../view/ui-state.js';
import watchedValidationState from '../view/validation-state.js';
import getColorFromCssVariable from './color.js';

export default (state, userGuess) => {
  if (state.game.userGuesses.length === 10) {
    watchedResultState(state).game.result = 'lose';
    const dangerColor = getColorFromCssVariable(state.uiState.theme, 'danger');
    watchedUiState(state).uiState.headerColor = dangerColor;
  } else if (userGuess === state.game.randomNumber) {
    watchedResultState(state).game.result = 'win';
    const successColor = getColorFromCssVariable(
      state.uiState.theme,
      'success',
    );
    watchedUiState(state).uiState.headerColor = successColor;
  } else if (userGuess < state.game.randomNumber) {
    watchedValidationState(state).game.validationResult = 'warnings.greater';
  } else if (userGuess > state.game.randomNumber) {
    watchedValidationState(state).game.validationResult = 'warnings.less';
  }
};
