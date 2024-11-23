import { loadData } from '../../../JS/loadData.js';

async function initializeRewards() {
  const rewardsDay = document.querySelector('.rewards-days');
  const title = document.querySelector('.title');
  const claimReward = document.querySelector('.claim-btn');
  const selectedLang = localStorage.getItem('selectedLang');
  const data = await loadData(selectedLang);

  if (!data || !data.rewards) return;

  const metaData = data.rewards[0];
  const fileredData = data.rewards.filter((item) => item.day);

  title.textContent = metaData.title;
  claimReward.textContent = metaData.btnText;

  rewardsDay.querySelectorAll('button').forEach((button, index) => {
    const rewardData = fileredData[index];
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

  const rewardDay4 = document.querySelector('[data-day="4"]');

  rewardDay4.addEventListener('click', () => {
    rewardDay4.classList.add('orange');
  });

  rewardsDay.addEventListener('click', (event) => {
    const button = event.target.closest('button');
    if (!button || button.disabled) return;

    button.classList.add('green');
    button.disabled = true;
  });
}

initializeRewards();
