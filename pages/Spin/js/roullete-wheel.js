// Initialize Swiper
const swiper = new Swiper('.swiper-container', {
  direction: 'horizontal',
  loop: true,
  speed: 3000, // Initial speed (fast spin)
  spaceBetween: 15,
  slidesPerView: 'auto',
  centeredSlides: true,
  grabCursor: true,
});

const swiperWrapper = document.querySelector('swiper-wrapper');

let isSpinning = false;
let totalItems = swiper.slides.length;

// Set a spin limit
const maxSpins = 3; // Change this to the number of spins allowed
let remainingSpins = maxSpins;

// Spin button click event
spinButton.addEventListener('click', () => {
  if (isSpinning || remainingSpins <= 0) return; // Prevent multiple spins or spins beyond the limit
  isSpinning = true;
  remainingSpins--;

  // Update button text or disable it when spins are used up
  if (remainingSpins === 0) {
    spinButton.textContent = 'No Spins Left';
    spinButton.disabled = true; // Optional: Disable the button
  } else {
    spinButton.querySelector('span').textContent = `CHECKING YOUR LUCK...`;
    spinButton.classList.add('checking');
  }

  // Randomly pick a winner index
  let winningIndex = Math.floor(Math.random() * totalItems);

  // Perform the spin animation
  swiper.slideToLoop(winningIndex, 5000, false); // spin for 3 seconds

  // Show the winner after spin
  setTimeout(() => {
    swiperWrapper.innerHTML = `<p>Winner: Item ${winningIndex + 1}</p>`;
    isSpinning = false; // Reset spinning flag
  }, 3500); // 500ms after the spin finishes
});
