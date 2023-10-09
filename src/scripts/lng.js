import i18next from 'i18next';
import elements from '../elements.js';

export default (language) => {
  const texts = document.querySelectorAll('[id^=lng-]');
  texts.forEach((text) => {
    elements.htmlElement.setAttribute('lang', language);
    const path = text.id.split('-').slice(1).join('.');
    text.textContent = i18next.t(path, { lng: language });
  });
};
