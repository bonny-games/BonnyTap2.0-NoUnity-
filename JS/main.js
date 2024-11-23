import { loadData } from './loadData.js';

const selectedLang = localStorage.getItem('selectedLang');

const { mainPage } = await loadData(selectedLang);

const listPage = document.querySelector('.list-page');

listPage.querySelectorAll('.list-item__title').forEach((title, index) => {
  title.textContent = mainPage[index].namePage;
});
