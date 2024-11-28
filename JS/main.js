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

const tabs = document.querySelector('.tabs');

tabs.addEventListener('click', (event) => {
  const tab = event.target.closest('a');

  if (!tab) return;

  document.querySelectorAll('.mark-active').forEach((mark) => mark.remove());

  const activeMark = `<span class="mark-active"></span>`;
  tab.insertAdjacentHTML('afterbegin', activeMark);
});
