document.addEventListener('DOMContentLoaded', () => {
  const playButton = document.querySelector('.btn-play');
  const overlay = document.querySelector('.overlay');
  const imageDisplay = document.querySelector('#image-display');
  let currentPopup = null;
  let imageIndex = 0;

  const images = [
    'images/bomb-start.png',
    'images/bomb-medium.png',
    'images/bomb-end.png',
  ];

  const popupHTML = `
    <img id="image-display" src="images/bomb-end.png" alt="game-start-2048" />
    <div class="popup popup_bottom">
      <p class="reward-text">Game is Over.</p>
      <span>You Find: 7 Bananas</span>
      <a href="javascript:void(0);" class="btn btn-next btn-next_modify">NEXT</a>
    </div>
  `;
  const popupHTML2 = `
    <img id="image-display" src="images/bomb-end.png" alt="game-start-2048" />
    <div class="popup popup_bottom">
      <p class="reward-text">Your 7 Bananas Converted into Rewards</p>
      <div class="reward">
        <span class="plus-sign">+</span>
        <img src="/images/coin.png" alt="coin icon">
        <span>5.300</span>
      </div>
      <div class="btn-actions">
        <a href="javascript:void(0);" class="btn btn-claim-rewards">CLAIM X2</a>
        <a href="javascript:void(0);" class="btn btn-claim-rewards">CLAIM REWARDS</a>
      </div>
    </div>
  `;
  const popupHTML3 = `
    <img id="image-display" src="images/bomb-end.png" alt="game-start-2048" />
    <div class="popup popup_bottom">
      <p class="reward-text reward-text_margin">Congratulations! You Already Collect 5 300</p>
      <div class="btn-actions">
        <a href="/pages/Games/main.html" class="btn-go-to-menu">GO TO MENU</a>
        <a href="javascript:void(0);" class="btn btn-play-again">PLAY AGAIN</a>
      </div>
    </div>
  `;
  const popupHTML4 = `
    <div class="popup popup_bottom popup_height">
      <button type="button" class="btn-close"></button>
      <div class="next-game">
        <p>The next game starts in</p>
        <time class="time">07:59:38</time>
      </div>
      <button type="button" class="remind">Remind me</button>
      <div class="or">
        <span class="line"></span>
        <span class="text">or</span>
        <span class="line"></span>
      </div>
      <div class="text-content">
        <h4>No more attempts</h4>
        <p>To get an additional attempt, you can invite 5 friends or purchase it for 100 stars.</p>
      </div>
      <div class="btn-actions">
        <a href="#" class="btn-invite">Invite Friend</a>
        <a href="javascript:void(0);" class="btn btn-pay">Play for 100 stars</a>
      </div>
    </div>
  `;

  function showPopup(popupHTML, popupType) {
    overlay.innerHTML = popupHTML;
    overlay.style.display = 'flex';
    overlay.classList.add('opacity');
    currentPopup = popupType;
  }

  function changeImage() {
    if (imageIndex < images.length) {
      imageDisplay.src = images[imageIndex];
      imageIndex++;
    } else {
      showPopup(popupHTML, 'popupHTML');
    }
  }

  playButton?.addEventListener('click', () => {
    overlay.style.display = 'flex';
    imageIndex = 0;
    changeImage();
  });

  imageDisplay?.addEventListener('click', () => {
    changeImage();
  });

  overlay?.addEventListener('click', (e) => {
    const target = e.target;

    if (target.classList.contains('btn-next') && currentPopup === 'popupHTML') {
      showPopup(popupHTML2, 'popupHTML2');
    } else if (
      target.classList.contains('btn-claim-rewards') &&
      currentPopup === 'popupHTML2'
    ) {
      showPopup(popupHTML3, 'popupHTML3');
    } else if (target.classList.contains('btn-play-again')) {
      sessionStorage.setItem('showPopupHTML4', 'true');
      window.location.href = '/pages/Games/Games-pages/Bomb-page.html';
    } else if (target.classList.contains('btn-go-to-menu')) {
      overlay.style.display = 'none';
      window.location.href = '/pages/Games/main.html';
    }

    if (target.classList.contains('btn-close')) {
      overlay.style.display = 'none';
    }
  });

  if (window.location.pathname === '/pages/Games/Games-pages/Bomb-page.html') {
    if (sessionStorage.getItem('showPopupHTML4') === 'true') {
      showPopup(popupHTML4, 'popupHTML4');
      sessionStorage.removeItem('showPopupHTML4');
    }
  }
});
