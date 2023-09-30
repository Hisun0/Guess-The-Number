import app from './app.js';
import './styles/style.scss';

const checkbox = document.querySelector('#theme');
checkbox.addEventListener('change', (event) => {
  if (document.body.dataset.bsTheme === 'dark') {
    document.body.dataset.bsTheme = 'light';
  } else {
    document.body.dataset.bsTheme = 'dark';
  }
});
