// select language
const languagesList = document.querySelector('.languages');
let lastSelectedItem = null;

languagesList.addEventListener('click', (event) => {
  const listItem = event.target.closest('.list-item');
  if (!listItem) return;

  const selectedLang = listItem.closest('button').dataset.lang;
  localStorage.setItem('selectedLang', selectedLang);

  const checkBox = listItem.querySelector('.list-item__check-box');

  if (lastSelectedItem && lastSelectedItem !== listItem) {
    const previousCheckBox = lastSelectedItem.querySelector(
      '.list-item__check-box',
    );
    previousCheckBox.style.backgroundColor = '';
  }

  checkBox.style.backgroundColor = 'white';

  lastSelectedItem = listItem;
});

// Loading logic
const canvas = document.getElementById('myCanvas');
const gameName = document.getElementById('gameName');
const loaderBar = document.getElementById('loaderBar');

const mainImagePath = '/images/loading.png'; // Path to your main background image

const ctx = canvas.getContext('2d');

// Create new images for background
const mainImage = new Image();

// Set the source for both images
mainImage.src = mainImagePath;

mainImage.onload = () => {
  canvas.width = mainImage.width; // Set canvas width to match the background image width
  canvas.height = mainImage.height; // Set canvas height to match the background image height

  // Draw the main image as the background
  ctx.drawImage(mainImage, 0, 0);

  animateLoadingBar();
};

function animateLoadingBar() {
  setTimeout(() => {
    canvas.style.display = 'none';
    gameName.style.display = 'none';
    loaderBar.style.display = 'none';
  }, 2500);
}
