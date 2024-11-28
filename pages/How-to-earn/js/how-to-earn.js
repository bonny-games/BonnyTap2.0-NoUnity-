import { loadData } from '../../../JS/loadData.js';

let currentSlide = 0;

const sliderBlock = document.querySelector('.slider-block');
const tabsContainer = document.getElementById('tabs');
const nextButton = document.getElementById('next');
const skipButton = document.getElementById('skip');

const data = await loadData(localStorage.getItem('selectedLang'));
const convertedData = Object.values(data.howToEarn).filter(Boolean);

const updateSlide = () => {
  sliderBlock.style.transform = `translateX(-${currentSlide * 100}%)`;

  document.querySelectorAll('.tab').forEach((tab, index) => {
    tab.classList.toggle('active', index === currentSlide);
  });

  const slide = convertedData[currentSlide];
  const currentSlideElement = document.querySelector(
    `.slider-slide[data-slide="${currentSlide}"]`,
  );

  if (!currentSlideElement || !slide) {
    console.error(`Slide or data not found for index: ${currentSlide}`);
    return;
  }

  currentSlideElement.querySelector('#title').textContent = slide.title;
  currentSlideElement.querySelector('#text').textContent = slide.text;
  currentSlideElement.querySelector('#image').src = slide.img;

  // Обновление текста кнопок в зависимости от текущего слайда
  if (currentSlide === convertedData.length - 1) {
    nextButton.textContent = slide.btnStart || 'START';
    skipButton.style.display = 'none';
  } else {
    nextButton.textContent = slide.btnNext || 'NEXT';
    skipButton.textContent = slide.btnSkip || 'SKIP';
  }
};

const createTabs = () => {
  tabsContainer.innerHTML = '';
  convertedData.forEach((_, index) => {
    const tab = document.createElement('div');
    tab.classList.add('tab');
    tab.classList.toggle('active', index === currentSlide);
    tab.addEventListener('click', () => {
      currentSlide = index;
      updateSlide();
    });

    tabsContainer.appendChild(tab);
  });
};

let startX = 0;

const slider = document.querySelector('.slider-container');

// Обработчики свайпа
slider.addEventListener('touchstart', (e) => {
  startX = e.touches[0].clientX;
});

slider.addEventListener('touchend', (e) => {
  const endX = e.changedTouches[0].clientX;
  if (startX - endX > 50) {
    currentSlide = Math.min(currentSlide + 1, convertedData.length - 1);
  } else if (endX - startX > 50) {
    currentSlide = Math.max(currentSlide - 1, 0);
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
