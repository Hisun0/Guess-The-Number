const animation = document.querySelector('.third');
const logo = document.querySelector('.logo-anim');
const container = document.querySelector('.container');
let count = 0;

animation.addEventListener('animationend', () => {
  const start = Date.now();

  const timer = setInterval(() => {
    const timePassed = Date.now() - start;

    if (timePassed >= 300) {
      clearInterval(timer);
      return;
    }

    draw(timePassed);
  });

  const draw = (timePassed) => {
    logo.style.transform = `translate(-50%, ${Math.round(-(timePassed * 1.315))}px)`
  }

  logo.innerHTML = '';

  const createH1 = () => {
    const h1 = document.createElement('h1');
    const textNode = document.createTextNode('Guess the ');
    const span = document.createElement('span');

    span.textContent = 'number';
    span.classList.add('color-blue');

    h1.append(textNode, span);
    return h1;
  };

  logo.append(createH1());
  logo.style.width = '300px';

  setTimeout(() => {
    container.innerHTML = '';
    container.append(createH1());
  }, 1000);
});
