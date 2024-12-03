document.addEventListener('DOMContentLoaded', () => {
  const startTime = performance.now();
  const menuBtn = document.getElementById('menu-btn');
  const imageDisplay = document.getElementsByClassName('#image-display')[0];
  const bgImage = document.getElementsByClassName('image')[0];
  const optionsList = document.getElementsByClassName('list')[0];
  const countItems = document.getElementsByClassName('count-items')[0];
  const cardImages = Array.from(document.getElementsByClassName('card-img'));
  const bombGameContainer = document.getElementById('bomb-game-container');
  const multipliersRow = document.getElementById('multipliers-row');
  const payoffBtn = document.getElementById('payoff-btn');
  const bananaCounterSpan = document.getElementById('banana-counter');
  let gameWasLost = false;
  // Indexes of flipped cards
  const flipped = [];
  let totalGuesses = 0;
  const bombsAmount = 3;
  let stake = 10_000;
  const multipliers = [1, 1.08, 1.23, 1.42, 1.64, 1.92, 2.25, 2.68, 3.21, 3.9, 4.8, 6, 6.9, 7.94, 9.13, 10.51, 12.08, 13.87, 15.95, 18.33, 21.01, 24.02, 27.47, 31.32, 35.62, 40.5, 45.6, 50.81, 56.00, 61.26, 66.78, 72.61, 78.67, 84.89, 91.71, 99.01];

  let currentPopup = null;
  let imageIndex = 0;

  const images = [
    'images/bomb-start.png',
    'images/bomb-medium.png',
    'images/bomb-end.png',
  ];

  menuBtn?.addEventListener('click', () => {
    console.log('clicked play button');
    imageIndex = 0;
    changeImage();
  });

  const getBombPositions = () => {
    const arr = [];

    while (arr.length < bombsAmount) {
      const num = Math.floor(Math.random() * 25);

      if (!(arr.includes(num))) {
        arr.push(num);
      }
    }

    return arr;
  }

  const giveImageSourcesToCardIcons = () => {
    cardImages.forEach((cardImage, index) => {
      const icon = bombPositions.includes(index) ? 'mini-bomb' : 'banana-icon';
      cardImage.src = `./images/${icon}.svg`;
    });
  }

  const bombPositions = getBombPositions();
  giveImageSourcesToCardIcons();

  const startGame = () => {
    console.log('start');
    giveImageSourcesToCardIcons();
    getBombPositions();

    for (const clickCard of Array.from(document.getElementsByClassName('clickcard'))) {
      clickCard.classList.remove('flipped');
    }

    totalGuesses = 0;
    bananaCounterSpan.innerText = `${totalGuesses} / 25`;

    gameWasLost = false;
  }

  const completeGame = () => {
    console.log('completed game');
  }

  const wait = async (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const handleCardClick = async (e, index) => {
    // Make all other cards unclickable until animation has finished
    const cardFronts = Array.from(document.getElementsByClassName('front'));
    for (const cardFront of cardFronts) {
      cardFront.classList.remove('pointer');
      cardFront.classList.add('pointer-events-none');
    };

    let currentElement = e.target;
    console.log(e.target);
    while (!(Array.from((currentElement).classList).includes('clickcard'))) {
      currentElement = (currentElement).parentNode;
    }

    console.log('current element:', currentElement);

    if (!(Array.from((currentElement).classList).includes('flipped'))) {
      (currentElement).classList.add('flipped');
      // Wait for the animation
      await wait(500);
      console.log('Animation ended');
      for (const cardFront of cardFronts) {
        cardFront.classList.remove('pointer-events-none');
        cardFront.classList.add('pointer');
      }
    } else {
      // Prevent proceeding if already flipped
      return;
    }

    console.log('%c Bomb positions:', 'color:red', bombPositions);
    // Lost game
    if (bombPositions.includes(index)) {
      gameWasLost = true;
    } else {
      // Flip was correct, increase guesses and payoff
      console.log('Correct guess');
      totalGuesses += 1;
      bananaCounterSpan.innerText = `${totalGuesses} / 25`;
      updatePayoffButtonAmount();
      updateMultipliers();
    }
  }

  /** Upate multipliers in `multipliers-row` */
  const updateMultipliers = () => {
    // Get elements such before 
    const multipliersBefore = Array.from(
      { length: 4 },
      (_, index) => {
        const multiplierIndex = totalGuesses - 5 + index; // Calculates the correct index (from totalGuesses - 6 to totalGuesses - 1)
        console.log(multiplierIndex)
        // Check if the multiplier exists (i.e., the index is within bounds)
        if (multiplierIndex >= 0 && multiplierIndex < multipliers.length) {
          return multipliers[multiplierIndex] ? multipliers[multiplierIndex].toFixed(2) : null;
        }
      }).filter(Boolean);
    console.log('Elements before:', multipliersBefore);
    console.log('Current multiplier:', multipliers[totalGuesses].toFixed(2));
    const multipliersAfter = Array.from({ length: Math.max(6 - totalGuesses - 1, 1) }, (_, index) => {
      const multiplierIndex = totalGuesses - 6 + index; // Calculates the correct index (from totalGuesses - 6 to totalGuesses - 1)
      return multipliers[totalGuesses + index + 1];
    })
    console.log('Multipliers after:', multipliersAfter)
  }

  const updatePayoffButtonAmount = () => {
    payoffBtn.innerHTML = `
    <div class='row'>
      <span class='mr-2'>ВЫПЛАТА ${stake * multipliers[totalGuesses]}</span>
      <img src='../../../images/diamond.svg' height='25' width='25' alt='Diamond'>
    </div>`;
  }

  /** When `play` button is clicked, remove menu and start the game. */
  const changeImage = () => {
    bombGameContainer.classList.remove('hidden');
    bombGameContainer.classList.add('block');
    updatePayoffButtonAmount();
  }

  const cardContainers = Array.from(document.getElementsByClassName('card-container'));

  cardContainers.forEach((cardContainer, index) => {
    cardContainer.addEventListener('click', (e) => handleCardClick(e, index));
  });

  payoffBtn.addEventListener('click', () => gameWasLost ? startGame() : completeGame());
  updateMultipliers();

  // To do: remove
  changeImage();
});
