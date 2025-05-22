let secretNumber = Math.floor(Math.random() * 20) + 1;
let score = 20;
let highScore = 0;
const bgColor = "#222";
const winColor = "purple";

const resetBtn = document.getElementById("reset-btn");
const userInput = document.querySelector(".box");
const numberBox = document.querySelector(".number-box");
const checkBtn = document.getElementById("check-btn");
const scoreData = document.getElementById("score");
const highScoreData = document.getElementById("highScore");
const title = document.querySelector("h1");
const gameContainer = document.querySelector(".game-container");
const body = document.querySelector("body");
const message = document.getElementById("message");

highScoreData.textContent = highScore;
checkBtn.classList.remove("disable");

function reset() {
  checkBtn.classList.remove("disable");
  score = 20;
  scoreData.textContent = score;
  message.textContent = "Start Guessing...";
  message.style.color = "white";
  numberBox.textContent = "?";
  userInput.value = "...";
  userInput.removeAttribute("disabled");
  secretNumber = Math.floor(Math.random() * 20) + 1;
  body.style.backgroundColor = bgColor;
}
function check() {
  if (userInput.value === "") {
    message.textContent = "Please select the Number";
    return;
  }
  const value = Number(userInput.value);
  if (value === secretNumber) {
    message.textContent = "You win!";
    numberBox.textContent = secretNumber;
    numberBox.style.fontSize = "6rem";
    if (score > highScore) {
      highScore = score;
      highScoreData.textContent = highScore;
    }
    body.style.backgroundColor = winColor;
    checkBtn.classList.add("disable");
    userInput.setAttribute("disabled", "disabled");
  } else if (score === 0) {
    message.textContent = "You lost the game";
    message.style.color = "red";
    checkBtn.classList.add("disable");
    userInput.setAttribute("disabled", "disabled");
  } else if (value < 0 || value > 20) {
    message.textContent = "Please select the correct Number!!!";
    message.style.color = "red";
  } else if (value < secretNumber) {
    message.textContent = "Your number is too low...";
    message.style.color = "white";
    score--;
    scoreData.textContent = score;
  } else {
    message.textContent = "Your number is too high...";
    message.style.color = "white";
    score--;
    scoreData.textContent = score;
  }

  userInput.value = "";
  userInput.placeholder = "...";
}
checkBtn.addEventListener("click", check);
userInput.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    check();
  }
});
resetBtn.addEventListener("click", reset);
