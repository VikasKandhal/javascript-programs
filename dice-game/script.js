//DICE GAME

document.getElementById("rollBtn").addEventListener("click",function(){
  const target = parseFloat(document.getElementById("target").value);
  const choice = document.getElementById("choice").value;
  const resultE1 = document.getElementById("result");

  if(isNaN(target)|| target<= 0 || target>= 100){
    resultE1.innerHTML = "Please enter a number between 0 and 100";
    return;
  }

  const roll = Math.random() * 100;

  let win = false;

  if(choice === "under" && roll<target) win = true;
  if(choice === "over"  && roll>target) win = true;

  resultE1.innerHTML = `🎲 You rolled: <strong>${roll.toFixed(2)}</strong><br>` +
                       (win ? "✅ You Win!" : "❌ You Lose!");
});
