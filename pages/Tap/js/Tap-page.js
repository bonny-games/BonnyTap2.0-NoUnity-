const tapBox = document.querySelector(".tap img");
const coinAmountDisplay = document.querySelector("#coin-amount");
const energyAmountDisplay = document.querySelector(".energy-amount");
const tipContainer = document.getElementById("tip-container");

let coins = parseInt(localStorage.getItem("coins")) || 5300;
let energy = parseInt(localStorage.getItem("energy")) || 400;

const maxEnergy = 1500;
const energyRegenAmount = 5;
const energyRegenInterval = 3000;

document.addEventListener("DOMContentLoaded", () => {
  let userId = localStorage.getItem("userId");
  if (!userId) {
    userId = `user_${Math.random().toString(36)}`;
    localStorage.setItem("userId", userId);
  }

  coinAmountDisplay.textContent = coins.toLocaleString();
  energyAmountDisplay.textContent = `${energy}/1500`;
});

tapBox.addEventListener("click", () => {
  if (energy > 0) {
    coins += 1;
    energy = Math.max(0, energy - 1);

    coinAmountDisplay.textContent = coins.toLocaleString();
    energyAmountDisplay.textContent = `${energy}/1500`;

    showTip(1, 100, -220);

    localStorage.setItem("coins", coins);
    localStorage.setItem("energy", energy);
  } else {
    alert("Not enough energy!");
  }
});

setInterval(() => {
  if (energy < maxEnergy) {
    energy = Math.min(maxEnergy, energy + energyRegenAmount);
    energyAmountDisplay.textContent = `${energy}/${maxEnergy}`;
    localStorage.setItem("energy", energy);
  }
}, energyRegenInterval);

function showTip(text, x, y) {
  const tip = document.createElement("div");
  tip.className = "tip";
  tip.textContent = `+${text}`;
  tip.style.left = `${x}px`;
  tip.style.top = `${y}px`;

  // Add tip to the container
  tipContainer.appendChild(tip);

  // Trigger the fade-out effect
  setTimeout(() => {
    tip.classList.add("fade-out");
  }, 50);

  // Remove the tip from DOM after animation
  tip.addEventListener("transitionend", () => {
    if (tip.parentNode === tipContainer) {
      tipContainer.removeChild(tip);
    }
  });
}
