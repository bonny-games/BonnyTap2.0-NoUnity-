import { loadData } from '../../../JS/loadData.js';

let currentSlide = 0;

const sliderBlock = document.querySelector('.slider-block');
const tabsContainer = document.getElementById('tabs');
const nextButton = document.getElementById('next');
const skipButton = document.getElementById('skip');

const data = await loadData(localStorage.getItem('selectedLang'));
const convertedData = convertDataToArray(data.howToEarn);

function convertDataToArray(data) {
  const sliderData = Object.entries(data)
    .filter(([key]) => key.includes(''))
    .map(([, value]) => value);
  return sliderData;
}

const createTabs = () => {
  convertedData.forEach((_, index) => {
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

  const currentSlideElement = document.querySelector(
    `.slider-slide[data-slide="${currentSlide}"]`,
  );

  const slide = convertedData[currentSlide];

  if (!currentSlideElement || !slide) {
    console.error(`Slide or data not found for index: ${currentSlide}`);
    return;
  }

  currentSlideElement.querySelector('#title').textContent = slide.title;
  currentSlideElement.querySelector('#text').textContent = slide.text;
  currentSlideElement.querySelector('#image').src = slide.img;

  if (currentSlide === convertedData.length - 1) {
    nextButton.textContent = slide.btnStart || 'START';
    skipButton.style.display = 'none';
  } else {
    nextButton.textContent = slide.btnNext || 'NEXT';
    skipButton.textContent = slide.btnSkip || 'SKIP';
  }
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
  if (currentSlide < convertedData.length - 1) {
    currentSlide++;
    updateSlide();
  } else {
    window.location.href = '/pages/Daily-reward/Daily-reward-page.html';
  }
});

createTabs();
updateSlide();
