import { loadData } from '../../../JS/loadData.js';

document.addEventListener('DOMContentLoaded', async () => {
  const selectedLang = localStorage.getItem('selectedLang') || 'en';
  const data = await loadData(selectedLang);
  const headerTitle = document.querySelector('.header__title');
  const linkText = document.querySelector('.btn');

  if (data) {
    headerTitle.textContent = data.learn.title;
    linkText.textContent = data.learn.btnText;

    const links = document.querySelectorAll('[data-type]');

    links.forEach((link) => {
      const theme = link.dataset.type;
      if (data[theme]) {
        link.textContent = data[theme].type;
      }
    });
  }
});

document
  .querySelector('.blocks-questions')
  .addEventListener('click', (event) => {
    const theme = event.target.dataset.type;
    if (theme) {
      localStorage.setItem('themeOfQuestions', theme);
    }
  });
