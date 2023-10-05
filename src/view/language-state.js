import onChange from 'on-change';
import setLanguage from '../lng.js';

const watchedLanguageState = (state) =>
  onChange(state, () => {
    if (state.uiState.lng === 'ru') {
      setLanguage('ru');
    }
    if (state.uiState.lng === 'en') {
      setLanguage('en');
    }
  });

export default watchedLanguageState;
