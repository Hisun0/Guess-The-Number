import app from './app.js';
import './styles/style.scss';
import 'bootstrap';
import './index.html';
import { gsap } from 'gsap';

const header = document.querySelector('header');
const first = document.querySelector('[data-animation-target="third"]');
console.log(document.querySelector('.text-white').childNodes[0]);
const position = first.getBoundingClientRect();
const { left, bottom } = position;
const headerPosition = header.getBoundingClientRect().bottom;
console.log(position);

//gsap.set('.move-element', { y: '100vh' });

const tl = gsap.timeline();
tl.from('[data-animation-target="first"]', {
  opacity: 0,
  duration: 1,
});
tl.from('[data-animation-target="second"]', {
  opacity: 0,
  duration: 1,
});
tl.from('[data-animation-target="third"]', {
  opacity: 0,
  duration: 1,
});

//tl.to('[data-animation-target="first"]', { x: -(left / 2.5) });
// tl.to('[data-animation-target="second"]', { y: '-6.72cqh' });
// tl.to('[data-animation-target="third"]', { x: 160, y: -103 });

tl.to('.move-element', {
  y: headerPosition - bottom,
});

tl.to('.translate-middle-custom', { opacity: 0 });

tl.to('.wrapper', { opacity: 1, duration: 2.5 });
tl.eventCallback('onComplete', () =>
  document.querySelector('.translate-middle-custom').remove()
);

const buttons = document.querySelectorAll('[data-toggle-theme]');
buttons.forEach((button) => {
  button.addEventListener('click', (event) => {
    event.preventDefault();
    const theme = button.dataset.toggleTheme;
    document.body.dataset.bsTheme = theme;
  });
});
