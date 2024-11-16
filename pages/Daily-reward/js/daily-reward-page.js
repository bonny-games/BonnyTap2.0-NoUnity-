const rewardsDay = document.querySelector('.rewards-days');

rewardsDay.addEventListener('click', (event) => {
  const currentDay = 4;
  const button = event.target.closest('button');

  if (Number(button.dataset.day) === currentDay) {
    button.classList.add('orange');
  }
});
