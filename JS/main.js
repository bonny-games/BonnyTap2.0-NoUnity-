import { getUserInfo } from './API.js';
import { loadData } from './loadData.js';

(async () => {
  const selectedLang = localStorage.getItem('selectedLang') || 'en';
  const { mainPage } = await loadData(selectedLang);
  const userInfo = await getUserInfo();


  // Set content
  document
    .querySelectorAll('.list-page .list-item__title')
    .forEach((title, index) => {
      if (mainPage[index]?.namePage) {
        title.textContent = mainPage[index].namePage;
      }
    });


  // Set usersame
  document
    .querySelector("body > div > header > div > div.user-info > span")
    .innerHTML = userInfo.first_name;


  // Set coins count
  document
    .querySelector("body > div > main > div.balance.balance_margin > a > span")
    .innerHTML = userInfo.coins;
})();
