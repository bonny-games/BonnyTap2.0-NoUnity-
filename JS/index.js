// Select language
const languagesList = document.querySelector('.languages');
let lastSelectedItem = null;

languagesList.addEventListener('click', (event) => {
  const listItem = event.target.closest('.list-item');
  if (!listItem) return;

  const selectedLang = listItem.dataset.lang;
  if (selectedLang) localStorage.setItem('selectedLang', selectedLang);

  if (lastSelectedItem && lastSelectedItem !== listItem) {
    lastSelectedItem.querySelector(
      '.list-item__check-box',
    ).style.backgroundColor = '';
  }

  listItem.querySelector('.list-item__check-box').style.backgroundColor =
    'white';
  lastSelectedItem = listItem;
});

// Loading logic
const canvas = document.getElementById('myCanvas');
const gameName = document.getElementById('gameName');
const loaderBar = document.getElementById('loaderBar');

const mainImagePath = '/images/loading.png';

const ctx = canvas.getContext('2d');
const mainImage = new Image();
mainImage.src = mainImagePath;

mainImage.onload = () => {
  canvas.width = mainImage.width;
  canvas.height = mainImage.height;
  ctx.drawImage(mainImage, 0, 0);
  hideLoadingScreenAfterDelay();
};

function hideLoadingScreenAfterDelay() {
  setTimeout(() => {
    [canvas, gameName, loaderBar].forEach((el) => (el.style.display = 'none'));
  }, 2500);
}
