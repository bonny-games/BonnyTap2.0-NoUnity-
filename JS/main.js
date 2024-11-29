import { loadData } from './loadData.js';

(async () => {
  const selectedLang = localStorage.getItem('selectedLang') || 'en';
  const { mainPage } = await loadData(selectedLang);

  document
    .querySelectorAll('.list-page .list-item__title')
    .forEach((title, index) => {
      if (mainPage[index]?.namePage) {
        title.textContent = mainPage[index].namePage;
      }
    });
})();
