const circle = document.getElementById("circle");
const scoreDisplay = document.getElementById("score");
const timeDisplay = document.getElementById("time");
const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const gameArea = document.getElementById("game-area");
const gameTimeInput = document.getElementById("game-time");
const easyBtn = document.getElementById("easy");
const mediumBtn = document.getElementById("medium");
const hardBtn = document.getElementById("hard");

let score = 0;
let timeLeft = 30;
let gameInterval;
let moveInterval;
let isPlaying = false;
let moveSpeed = 700;

function moveCircle() {
  const areaWidth = gameArea.clientWidth - 60;
  const areaHeight = gameArea.clientHeight - 60;
  
  const randomX = Math.random() * areaWidth;
  const randomY = Math.random() * areaHeight;
  
  circle.style.left = `${randomX}px`;
  circle.style.top = `${randomY}px`;
}

function startGame() {
  if (isPlaying) return;
  isPlaying = true;

  score = 0;
  timeLeft = parseInt(gameTimeInput.value);
  scoreDisplay.textContent = score;
  timeDisplay.textContent = timeLeft;
  circle.style.display = "block";
  startBtn.disabled = true;
  stopBtn.disabled = false;

  gameInterval = setInterval(() => {
    timeLeft--;
    timeDisplay.textContent = timeLeft;

    if (timeLeft <= 0) {
      endGame();
    }
  }, 1000);

  moveInterval = setInterval(moveCircle, moveSpeed);
}

circle.addEventListener("click", () => {
  if (!isPlaying) return;
  score++;
  scoreDisplay.textContent = score;
  moveCircle();
});

function endGame() {
  clearInterval(gameInterval);
  clearInterval(moveInterval);
  isPlaying = false;
  circle.style.display = "none";
  startBtn.disabled = false;
  stopBtn.disabled = true;
  alert(`🏁 Fim de jogo! Sua pontuação: ${score}`);
}

function stopGameManually() {
  if (!isPlaying) return;
  clearInterval(gameInterval);
  clearInterval(moveInterval);
  isPlaying = false;
  circle.style.display = "none";
  startBtn.disabled = false;
  stopBtn.disabled = true;
  alert(`🛑 Jogo finalizado! Pontuação atual: ${score}`);
}

startBtn.addEventListener("click", startGame);
stopBtn.addEventListener("click", stopGameManually);


easyBtn.addEventListener("click", () => {
  moveSpeed = 800;
  alert("😎 Dificuldade: Fácil — o círculo se moverá mais devagar!");
});

mediumBtn.addEventListener("click", () => {
  moveSpeed = 600;
  alert("💪 Dificuldade: Média — velocidade equilibrada!");
});

hardBtn.addEventListener("click", () => {
  moveSpeed = 475;
  alert("🔥 Dificuldade: Difícil — o círculo se moverá muito rápido!");
});

