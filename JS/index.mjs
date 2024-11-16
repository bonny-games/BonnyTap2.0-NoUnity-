// select language
const languagesList = document.querySelector('.languages');
let lastSelectedItem = null;

languagesList.addEventListener('click', (event) => {
  const listItem = event.target.closest('.list-item');
  if (!listItem) return;

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

  const textY = canvas.height - 920;

  animateLoadingBar(textY); // Position the loading bar below the text
};

function animateLoadingBar(loadingBarY) {
  const loadingBarHeight = 70;
  const maxWidth = 200; // Maximum width of the loading bar
  let progress = 0;

  const colors = ['#FD8D4E', '#FCAC82']; // Array of alternating colors

  function drawLoadingBar() {
    // Clear the area where the loading bar will be drawn, so it doesn't overlap
    ctx.clearRect(0, loadingBarY, canvas.width, loadingBarHeight);

    // Draw the background image
    ctx.drawImage(mainImage, 0, 0);

    // Calculate the current width of the loading bar based on the progress
    const currentWidth = Math.min(maxWidth * (progress / 100), maxWidth);

    // Position the loading bar on the right side
    const xPosition = 260; // Adjust this to position the bar on the right

    // Draw the alternating colored stripes
    let currentX = xPosition; // Start drawing from the specified position
    let colorIndex = 0; // Start with the first color in the array

    // Loop to draw stripes of alternating colors
    while (currentX < xPosition + currentWidth) {
      ctx.fillStyle = colors[colorIndex]; // Set the color for the current stripe
      const stripeWidth = 30; // Width of each stripe
      ctx.fillRect(currentX, loadingBarY, stripeWidth, loadingBarHeight); // Draw the stripe
      currentX += stripeWidth; // Move the x position for the next stripe

      // Alternate the color
      colorIndex = (colorIndex + 1) % colors.length;
    }

    if (progress < 100) {
      progress += 1;
      requestAnimationFrame(drawLoadingBar); // Continue drawing the loading bar
    } else {
      setTimeout(() => {
        canvas.style.display = 'none'; // Hide the canvas after completion
        gameName.style.display = 'none';
        loaderBar.style.display = 'none';
      }, 500);
    }
  }

  drawLoadingBar();
}
