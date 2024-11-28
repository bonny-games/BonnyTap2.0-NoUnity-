import { loadData } from '../../../JS/loadData.js';

const selectedLang = localStorage.getItem('selectedLang');
const { leaderboard } = await loadData(selectedLang);

const updateTextContent = (selector, text) => {
  const element = document.querySelector(selector);
  if (element) element.textContent = text;
};

updateTextContent('.header__title', leaderboard.title);
updateTextContent('.top-bar__title', leaderboard.position);
