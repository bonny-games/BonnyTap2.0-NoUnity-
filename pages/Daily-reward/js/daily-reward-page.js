import { loadData } from '../../../JS/loadData.js';

async function initializeRewards() {
  const rewardsDay = document.querySelector('.rewards-days');
  const title = document.querySelector('.title');
  const claimReward = document.querySelector('.claim-btn');
  const selectedLang = localStorage.getItem('selectedLang');

  const data = await loadData(selectedLang);
  if (!data?.rewards) return;

  const metaData = data.rewards[0];
  const filteredData = data.rewards.filter((item) => item.day);

  title.textContent = metaData.title;
  claimReward.textContent = metaData.btnText;

  // Используем делегирование событий для обработки кликов по кнопкам
  rewardsDay.addEventListener('click', (event) => {
    const button = event.target.closest('button');
    if (!button || button.disabled) return;

    if (button.dataset.day === '4') {
      button.classList.add('orange');
    } else {
      button.classList.add('green');
      button.disabled = true;
    }
  });

  // Обновим кнопки с данными из filteredData
  rewardsDay.querySelectorAll('button').forEach((button, index) => {
    const rewardData = filteredData[index];
    if (!rewardData) return;

    button.querySelector('.day').textContent = `${rewardData.day}`;
    button.querySelector('.date').textContent = rewardData.date;
    button.querySelector('.reward').textContent = rewardData.reward;

    if (rewardData.claimed) {
      button.classList.add('green');
      button.disabled = true;
    } else {
      button.classList.remove('green', 'orange');
    }
  });
}

initializeRewards();
