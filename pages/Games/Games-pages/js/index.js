const playButton = document.querySelector('.btn-play');
const overlay = document.querySelector('.overlay');
const imageDisplay = document.querySelector('#image-display');

const pageConfigs = {
  2048: ['images/game-start-2048.png', 'images/game-end-2048.png'],
  bomb: [
    'images/bomb-start.png',
    'images/bomb-medium.png',
    'images/bomb-end.png',
  ],
};

const currentPageId = document.body.dataset.page;

const images = pageConfigs[currentPageId] || [];
let currentImageIndex = 0;

if (images.length > 0) {
  playButton.addEventListener('click', () => {
    currentImageIndex = 0;
    imageDisplay.src = images[currentImageIndex];
    overlay.style.display = 'flex';
  });

  imageDisplay.addEventListener('click', () => {
    if (currentImageIndex < images.length - 1) {
      currentImageIndex += 1;
      imageDisplay.src = images[currentImageIndex];
    } else {
      window.location.href = '/pages/Games/main.html';
    }
  });
} else {
  console.error('Images are not configured for this page.');
}
