import { data } from './data.js';

let currentSlide = 0;

const sliderBlock = document.querySelector('.slider-block');
const tabsContainer = document.getElementById('tabs');
const nextButton = document.getElementById('next');
const skipButton = document.getElementById('skip');

const createTabs = () => {
  data.forEach((_, index) => {
    const tab = document.createElement('div');
    tab.classList.add('tab');
    if (index === currentSlide) tab.classList.add('active');
    tab.addEventListener('click', () => {
      currentSlide = index;
      updateSlide();
    });
    tabsContainer.appendChild(tab);
  });
};

const updateSlide = () => {
  sliderBlock.style.transform = `translateX(-${currentSlide * 100}%)`;

  document.querySelectorAll('.tab').forEach((tab, index) => {
    tab.classList.toggle('active', index === currentSlide);
  });
};

let startX = 0;
let endX = 0;
const slider = document.querySelector('.slider-container');

slider.addEventListener('touchstart', (e) => {
  startX = e.touches[0].clientX;
});

slider.addEventListener('touchend', (e) => {
  endX = e.changedTouches[0].clientX;

  if (startX - endX > 50) {
    currentSlide = (currentSlide + 1) % data.length;
  } else if (endX - startX > 50) {
    currentSlide = (currentSlide - 1 + data.length) % data.length;
  }

  updateSlide();
});

nextButton.addEventListener('click', () => {
  if (currentSlide === data.length - 1) {
    window.location.href = skipButton.href;
  } else {
    currentSlide = (currentSlide + 1) % data.length;
    updateSlide();
  }
});

createTabs();
updateSlide();
