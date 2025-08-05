//CRASH GAME
// STAKE INSPIRED 
//this is inpired by stake

let multiplier = 1.0;
let crashPoint = 0;
let interval = null;
let gameRunning = false;

const multiplierDisplay = document.getElementById("multiplier");
const startBtn = document.getElementById("startBtn");
const cashoutBtn = document.getElementById("cashoutBtn");
const result = document.getElementById("result");

startBtn.addEventListener("click", startGame);
cashoutBtn.addEventListener("click", cashOut);

function startGame() {
  // Reset everything
  multiplier = 1.0;
  crashPoint = (Math.random() * 4 + 1).toFixed(2); // Crash between 1.00x to 5.00x
  gameRunning = true;
  result.textContent = "";
  multiplierDisplay.textContent = "1.00x";
  cashoutBtn.disabled = false;
  startBtn.disabled = true;

  // Start increasing multiplier
  interval = setInterval(() => {
    multiplier += 0.01;
    multiplierDisplay.textContent = multiplier.toFixed(2) + "x";
    multiplierDisplay.style.transform = `scale(${1 + multiplier / 10})`;

    if (multiplier >= crashPoint) {
      endGame(false);
    }
  }, 50);
}

function cashOut() {
  if (!gameRunning) return;
  endGame(true);
}

function endGame(cashedOut) {
  gameRunning = false;
  clearInterval(interval);
  cashoutBtn.disabled = true;
  startBtn.disabled = false;

  if (cashedOut) {
    result.textContent = `✅ You cashed out at ${multiplier.toFixed(2)}x!`;
    result.style.color = "#0f0";
  } else {
    result.textContent = `💥 Crashed at ${multiplier.toFixed(2)}x! You lost.`;
    result.style.color = "#f00";
  }
}

