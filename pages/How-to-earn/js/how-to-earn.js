import { data } from '../../../JS/data.js';

const container = document.querySelector('.container');

let currentIndex = 0;

function renderContent(index) {
  const { id, title, text, img } = data ? data[index] : [];

  const tabsHTML = data
    .map((_, i) => `<span class="tab ${i === index ? 'active' : ''}"></span>`)
    .join('');

  const mainHTML = `
      <main class="main">
        <h1 class="title">${title}</h1>
        <p class="text">${id}. ${text}</p>
        <div class="image">
          <img src="${img}" alt="Picture of ${title}">
        </div>
        <div class="tabs">
          ${tabsHTML}
        </div>
        <div class="btns-block">
          <a href="/pages/Daily-reward/Daily-reward-page.html" class="btn-skip">SKIP</a>
          <a href="#" class="btn-next" id="nextButton">NEXT</a>
        </div>
      </main>
    `;

  container.insertAdjacentHTML('beforeend', mainHTML);

  document.getElementById('nextButton').addEventListener('click', (event) => {
    event.preventDefault();

    if (currentIndex === data.length - 1) {
      window.location.href = '/pages/Daily-reward/Daily-reward-page.html';
    } else {
      currentIndex++;
      document.querySelector('.main').remove(); // Remove old content
      renderContent(currentIndex); // Render new content
    }
  });
}

renderContent(currentIndex);
