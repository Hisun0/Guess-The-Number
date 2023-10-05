import onChange from 'on-change';
import { renderContainer } from '../scripts/render.js';

const watchedUiState = (state) =>
  onChange(state, (path, value, previousValue) => {
    if (state.uiState.display === 'rules') {
      renderContainer(value, previousValue);
    }
    if (state.uiState.display === 'play') {
      console.log('qwe');
      renderContainer(value, previousValue);
    }
    if (state.uiState.display === 'menu') {
      renderContainer(value, previousValue);
    }
    if (state.uiState.display === 'settings') {
      renderContainer(value, previousValue);
    }
  });

export default watchedUiState;
