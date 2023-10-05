import i18next from 'i18next';

export default (language) => {
  const texts = document.querySelectorAll('[id^=lng-]');
  texts.forEach((text) => {
    const path = text.id.split('-').slice(1).join('.');
    text.textContent = i18next.t(path, { lng: language });
  });
};
