export default {
  htmlElement: document.documentElement,
  menuButtons: document.querySelectorAll('[data-bs-target]'),
  form: document.querySelector('form'),
  attemptsContainer: document.querySelector('#lng-play-attempts-text'),
  guessButton: document.querySelector('#lng-play-guess'),
  restartButton: document.querySelector('#lng-play-restart'),
  input: document.querySelector('.form-control'),
  gameCard: document.querySelector('#game-card'),
  backButton: document.querySelector('#game-card #button-back'),
  headerSpan: document.querySelector('.header-color'),
  header: document.querySelector('header'),
  feedback: document.querySelector('.feedback'),
  thirdAnimationElement: document.querySelector(
    '[data-animation-target="third"]'
  ),
  translateMiddleCustom: document.querySelector('.translate-middle-custom'),
};
