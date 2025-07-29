let balance = 10000;

document.getElementById("target").addEventListener("input", function() {
  document.getElementById("targetValue").textContent = this.value;
});

document.getElementById("rollBtn").addEventListener("click", function () {
  const target = parseFloat(document.getElementById("target").value);
  const choice = document.getElementById("choice").value;
  const bet = parseFloat(document.getElementById("bet").value);
  const resultEl = document.getElementById("result");
  const balanceEl = document.getElementById("balance");
  const diceEl = document.getElementById("dice");

  if (isNaN(bet) || bet <= 0) {
    resultEl.innerHTML = "❌ Please enter a valid bet amount";
    return;
  }

  if (bet > balance) {
    resultEl.innerHTML = "❌ Insufficient funds";
    return;
  }

  const roll = Math.random() * 100;
  let win = false;

  if (choice === "under" && roll < target) win = true;
  if (choice === "over" && roll > target) win = true;

  // Dice visual
  diceEl.textContent = getDiceEmoji(roll);
  diceEl.classList.remove("roll");
  void diceEl.offsetWidth; // Reflow to restart animation
  diceEl.classList.add("roll");

  if (win) {
    const winChance = choice === "under" ? target : 100 - target;
    const payoutMultiplier = 100 / winChance;
    const winnings = bet * payoutMultiplier;

    balance += winnings;
    resultEl.innerHTML =
      `🎲 You rolled: <strong>${roll.toFixed(2)}</strong><br>` +
      `✅ You Win ₹${winnings.toFixed(2)}! (x${payoutMultiplier.toFixed(2)})`;
  } else {
    balance -= bet;
    resultEl.innerHTML =
      `🎲 You rolled: <strong>${roll.toFixed(2)}</strong><br>` +
      `❌ You Lose ₹${bet.toFixed(2)}.`;
  }

  balanceEl.textContent = balance.toFixed(2);
});

function getDiceEmoji(value) {
  if (value < 16.66) return "⚀";
  if (value < 33.33) return "⚁";
  if (value < 50) return "⚂";
  if (value < 66.66) return "⚃";
  if (value < 83.33) return "⚄";
  return "⚅";
}
