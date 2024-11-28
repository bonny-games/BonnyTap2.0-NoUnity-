const spinButton = document.querySelector('#spinButton');
const cells = 31;

const items = [
  { name: '1 TON', img: '/images/loading.png', chance: 20 },
  { name: '5 TON', img: '/images/roulette-gift.png', chance: 30 },
  { name: '10 TON', img: '/images/how-to-earn-3.png', chance: 40 },
];

// Получение случайного элемента на основе вероятности
function getItem() {
  const chance = Math.floor(Math.random() * 100);
  const item = items.find((item) => chance < item.chance);

  if (!item || !item.img || !item.name) {
    return { name: '1 TON', img: '/images/loading.png', chance: 20 };
  }

  return item;
}

function generateItems() {
  const listContainer = document.querySelector('.scope');
  const list = document.createElement('ul');
  list.classList.add('list');

  for (let i = 0; i < cells; i++) {
    const item = getItem();
    const li = document.createElement('li');
    li.classList.add('list__item');
    li.setAttribute('data-item', JSON.stringify(item));
    li.innerHTML = `
      <img src="${item.img}" alt="${item.name}" />
      <p>${item.name}</p>
    `;
    list.appendChild(li);
  }

  const existingList = document.querySelector('.list');
  if (existingList) {
    existingList.remove();
  }

  listContainer.appendChild(list);
}

let isStarted = false;
let isFirstStart = true;

function start() {
  if (isStarted) return;
  isStarted = true;

  if (!isFirstStart) generateItems();
  else isFirstStart = false;

  const list = document.querySelector('.list');
  const spinButtonContainer = document.querySelector('.button-container');
  const startButton = document.querySelector('#start');

  document.querySelector('.spins').style.display = 'none';
  document.querySelector('#remainder').style.display = 'none';
  startButton.textContent = 'CHECKING YOUR LUCK...';
  spinButtonContainer.classList.add('checking');

  setTimeout(() => {
    list.style.left = '50%';
    list.style.transform = 'translate3d(-50%, 0, 0)';
  }, 0);

  const item = list.querySelectorAll('li')[15];

  list.addEventListener(
    'transitionend',
    () => {
      isStarted = false;
      item.classList.add('active');
    },
    { once: true },
  );

  document.querySelector('.app').scrollLeft = 0;

  setTimeout(() => {
    checkAndAddWinningItem();
  }, 6000);
}

function checkAndAddWinningItem() {
  const app = document.querySelector('.app');
  const content = document.querySelector('.content');

  const winningItem = document.querySelector('.active');

  if (winningItem) {
    spinButton.style.display = 'none';
    app.style.display = 'none';

    const html = `
      <button type="button" class="btn-share">
        <img src="/images/share-icon.svg" alt="share icon">
        <span>WILL SHARE</span>
      </button>
      <div class="remainder">
        <p class="text">YOU HAVE 3 SPINS</p>
        <div class="purchases">
          <a href="#" class="buy-spins">BUY SPINS</a>
          <a href="#" class="buy">BUY</a>
        </div>
      </div>
    `;

    content.closest('.result-wrapper').style.display = 'block';
    content.appendChild(winningItem);

    winningItem.insertAdjacentHTML('afterend', html);
  }
}

spinButton.addEventListener('click', start);

generateItems();
