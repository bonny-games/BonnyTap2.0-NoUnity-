import { loadData } from '../../../JS/loadData.js';

document.addEventListener('DOMContentLoaded', async () => {
  const selectedLang = localStorage.getItem('selectedLang') || 'en';
  const data = await loadData(selectedLang);

  if (!data) {
    console.error('Failed to load data');
    return;
  }

  const headerTitle = document.querySelector('.header__title');
  const linkText = document.querySelector('.btn');

  headerTitle.textContent = data.learn?.title || 'Default Title';
  linkText.textContent = data.learn?.btnText || 'Default Button Text';

  const links = document.querySelectorAll('[data-type]');
  links.forEach((link) => {
    const theme = link.dataset.type;
    if (theme && data[theme]) {
      link.textContent = data[theme]?.type || theme;
    }
  });
});

// Обработчик клика для выбора темы
const blocksQuestions = document.querySelector('.blocks-questions');
if (blocksQuestions) {
  blocksQuestions.addEventListener('click', (event) => {
    const theme = event.target.dataset.type;
    if (theme) {
      localStorage.setItem('themeOfQuestions', theme);
    }
  });
} else {
  console.warn('Element .blocks-questions not found!');
}
