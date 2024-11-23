import { loadData } from '../../../JS/loadData.js';

const selectedLang = localStorage.getItem('selectedLang');
const { leaderboard } = await loadData(selectedLang);

const headerTitle = document.querySelector('.header__title');
const topBarTitle = document.querySelector('.top-bar__title');

headerTitle.textContent = leaderboard.title;
topBarTitle.textContent = leaderboard.position;
