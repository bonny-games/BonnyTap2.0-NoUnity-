import { loadData } from '../../../JS/loadData.js';

const container = document.querySelector('.container');
const networkList = document.querySelector('.network-list');
const headerTitle = document.querySelector('.header__title');
const link = document.querySelector('.btn');

const selectedLang = localStorage.getItem('selectedLang');

const { earn } = await loadData(selectedLang);

headerTitle.textContent = earn.title;
link.textContent = earn.btnText;

const createPopup = (htmlContent, additionalClass = '') => {
  const popupHTML = `
    <div class="popup ${additionalClass}">
      ${htmlContent}
    </div>
  `;
  container.insertAdjacentHTML('afterend', popupHTML);
  const popup = document.querySelector('.popup');
  if (popup) {
    setTimeout(() => popup.classList.add('show'), 10);
  }
  return popup;
};

const closePopup = (popup) => {
  if (popup) popup.style.display = 'none';
  container.classList.remove('disabled');
};

networkList.addEventListener('click', (event) => {
  const currentTarget = event.target.closest('.list-item');
  if (!currentTarget) return;

  const channelName = currentTarget.dataset.name;
  localStorage.setItem('joined', channelName);

  const popupContent = `
    <button type="button" class="btn-close"></button>
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
  `;
  const popup = createPopup(popupContent, 'popup-subscribe');

  container.classList.add('disabled');

  const btnClose = document.querySelector('.btn-close');
  btnClose?.addEventListener('click', () => closePopup(popup));
});

document.addEventListener('click', (event) => {
  const btnCheckSubscribe = event.target.closest('.btn-check-subscribe');
  if (!btnCheckSubscribe) return;

  const popupSubscribe = document.querySelector('.popup-subscribe');
  if (popupSubscribe) popupSubscribe.style.display = 'none';

  const rewardContent = `
    <div class="reward">
      <span class="plus-sign">+</span>
      <img src="/images/coin.png" alt="coin icon">
      <span>5.300</span>
    </div>
    <p class="text">Task is Done! Get Your Reward!</p>
    <a href="#" class="btn btn-claim-rewards">CLAIM REWARDS</a>
  `;
  const popup = createPopup(rewardContent);

  const btnClaimRewards = document.querySelector('.btn-claim-rewards');
  btnClaimRewards?.addEventListener('click', () => {
    const joined = localStorage.getItem('joined');
    const currentTarget = document.querySelector(`[data-name="${joined}"]`);

    if (currentTarget) currentTarget.classList.add('joined');
    closePopup(popup);

    localStorage.removeItem('joined');
    localStorage.setItem('taskCompleted', true);
  });
});
