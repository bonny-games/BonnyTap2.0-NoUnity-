const container = document.querySelector('.container');
const networkList = document.querySelector('.network-list');

networkList.addEventListener('click', (event) => {
  const currentTarget = event.target.closest('.list-item');

  if (!currentTarget) return;

  const channelName = currentTarget.dataset.name;
  localStorage.setItem('joined', channelName);

  const popupHTML = `
    <div class="popup popup-subscribe">
      <div class="reward">
        <span class="plus-sign">+</span>
        <img src="/images/coin.png" alt="coin icon">
        <span>5.300</span>
      </div>
      <h3 class="label">Follow Bonny Tap News in Telegram</h3>
      <p class="text">Subscribe and keep following to earn bonus rating every day.</p>
      <div class="btn-actions">
        <a href="https://t.me/Bonny_App_News" target="_blank" class="btn btn-subscribe">Subscribe</a>
        <button type="button" class="btn btn-check-subscribe">Check subscribe</button>
      </div>
    </div>
  `;
  container.insertAdjacentHTML('afterend', popupHTML);
});

document.addEventListener('click', (event) => {
  const btnCheckSubscribe = event.target.closest('.btn-check-subscribe');
  const popupSubscribe = document.querySelector('.popup-subscribe');

  if (!btnCheckSubscribe) return;

  const popupHTML = `
    <div class="popup">
      <div class="reward">
        <span class="plus-sign">+</span>
        <img src="/images/coin.png" alt="coin icon">
        <span>5.300</span>
      </div>
      <p class="text">Task is Done! Get Your Reward!</p>
      <a href="#" class="btn btn-claim-rewards">CLAIM REWARDS</a>
    </div>
  `;
  container.insertAdjacentHTML('afterend', popupHTML);

  if (popupSubscribe) popupSubscribe.style.display = 'none';

  const btnClaimRewards = document.querySelector('.btn-claim-rewards');
  if (!btnClaimRewards) return;

  btnClaimRewards.addEventListener('click', () => {
    const popup = document.querySelector('.popup');
    const joined = localStorage.getItem('joined');
    const currentTarget = document.querySelector(`[data-name="${joined}"]`);

    if (currentTarget) currentTarget.classList.add('joined');

    if (popup) popup.style.display = 'none';

    localStorage.removeItem('joined');
    localStorage.setItem('taskCompleted', true);
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const joined = localStorage.getItem('joined');
  const taskCompleted = localStorage.getItem('taskCompleted');

  if (!joined || taskCompleted) return;

  const popupSubscribe = `
    <div class="popup popup-subscribe">
      <div class="reward">
        <span class="plus-sign">+</span>
        <img src="/images/coin.png" alt="coin icon">
        <span>5.300</span>
      </div>
      <h3 class="label">Follow Bonny Tap News in Telegram</h3>
      <p class="text">Subscribe and keep following to earn bonus rating every day.</p>
      <div class="btn-actions">
        <a href="https://t.me/Bonny_App_News" target="_blank" class="btn btn-subscribe">Subscribe</a>
        <button type="button" class="btn btn-check-subscribe">Check subscribe</button>
      </div>
    </div>
  `;
  container.insertAdjacentHTML('afterend', popupSubscribe);
});
