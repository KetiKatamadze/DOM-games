const mainPage = document.querySelector(".main-page");

const againBtn = document.getElementById("again-click");
const rollBtn = document.getElementById("roll-click");
const holdBtn = document.getElementById("hold-click");

const playerOneBoard = document.querySelector(".player-one");
const playerTwoBoard = document.querySelector(".player-two");

const score1 = document.getElementById("score-1");
const currentScore1 = document.getElementById("current-score-1");

const score2 = document.getElementById("score-2");
const currentScore2 = document.getElementById("current-score-2");

let totalScore1 = 0;
let totalScore2 = 0;
let scoreSum1 = 0;
let scoreSum2 = 0;
const maxScore = 10;
let img = "";
let player = 1;

playerOneBoard.classList.add("active");

const diceImages = [
  "media/dice1.png",
  "media/dice2.png",
  "media/dice3.png",
  "media/dice4.png",
  "media/dice5.png",
  "media/dice6.png",
];

function changePlayer() {
  if (player === 1) {
    player = 2;
    totalScore1 = 0;
    playerOneBoard.classList.toggle("active");
    playerTwoBoard.classList.toggle("active");
  } else {
    player = 1;
    totalScore2 = 0;
    playerTwoBoard.classList.toggle("active");
    playerOneBoard.classList.toggle("active");
  }
}

function win() {
  if (scoreSum1 >= maxScore) {
    playerOneBoard.style.backgroundColor = "black";
    holdBtn.disabled = true;
    rollBtn.disabled = true;
    img.remove();
  } else if (scoreSum2 >= maxScore) {
    playerTwoBoard.style.backgroundColor = "black";
    holdBtn.disabled = true;
    rollBtn.disabled = true;
    img.remove();
  }
}

function reset() {
  totalScore1 = 0;
  totalScore2 = 0;
  scoreSum1 = 0;
  scoreSum2 = 0;
  score1.textContent = "0";
  score2.textContent = "0";
  currentScore1.textContent = "0";
  currentScore2.textContent = "0";
  playerOneBoard.style.backgroundColor = "";
  playerTwoBoard.style.backgroundColor = "";

  holdBtn.disabled = false;
  rollBtn.disabled = false;
  playerOneBoard.classList.add("active");
  playerTwoBoard.classList.remove("active");
  player = 1;
  if (img) {
    img.remove();
  }
}

function holdButton() {
  if (player === 1) {
    scoreSum1 += totalScore1;
    score1.textContent = scoreSum1;
    currentScore1.textContent = "0";
  } else {
    scoreSum2 += totalScore2;
    score2.textContent = scoreSum2;
    currentScore2.textContent = "0";
  }

  win();

  changePlayer();
}

function rollDice() {
  if (img) {
    img.remove();
  }
  const image = document.createElement("img");
  image.classList.add("dice");
  const randomNum = Math.floor(Math.random() * 6);
  const randomDice = diceImages[randomNum];
  image.src = randomDice;
  mainPage.appendChild(image);
  img = image;

  if (randomNum === 0) {
    if (player === 1) {
      currentScore1.textContent = "0";
    } else {
      currentScore2.textContent = "0";
    }
    changePlayer();
  } else {
    if (player === 1) {
      totalScore1 += randomNum + 1;
      currentScore1.textContent = totalScore1;
    } else {
      totalScore2 += randomNum + 1;
      currentScore2.textContent = totalScore2;
    }
  }
}

rollBtn.addEventListener("click", rollDice);

holdBtn.addEventListener("click", holdButton);

againBtn.addEventListener("click", reset);
