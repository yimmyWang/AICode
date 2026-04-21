const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const scoreEl = document.getElementById("score");
const bestScoreEl = document.getElementById("bestScore");
const statusText = document.getElementById("statusText");
const restartBtn = document.getElementById("restartBtn");

const grid = 20;
const cellSize = canvas.width / grid;
const speed = 120;

let snake = [];
let direction = { x: 1, y: 0 };
let nextDirection = { x: 1, y: 0 };
let food = { x: 0, y: 0 };
let score = 0;
let bestScore = Number(localStorage.getItem("snake-best-score") || 0);
let running = false;
let gameOver = false;
let timer = null;

bestScoreEl.textContent = String(bestScore);

function resetGame() {
  snake = [
    { x: 9, y: 10 },
    { x: 8, y: 10 },
    { x: 7, y: 10 }
  ];
  direction = { x: 1, y: 0 };
  nextDirection = { x: 1, y: 0 };
  score = 0;
  gameOver = false;
  scoreEl.textContent = "0";
  placeFood();
  draw();
}

function placeFood() {
  do {
    food = {
      x: Math.floor(Math.random() * grid),
      y: Math.floor(Math.random() * grid)
    };
  } while (snake.some((part) => part.x === food.x && part.y === food.y));
}

function setDirection(x, y) {
  if (!running || gameOver) return;
  const isReverse = direction.x === -x && direction.y === -y;
  if (!isReverse) {
    nextDirection = { x, y };
  }
}

function tick() {
  direction = nextDirection;
  const head = snake[0];
  const newHead = {
    x: head.x + direction.x,
    y: head.y + direction.y
  };

  if (
    newHead.x < 0 ||
    newHead.y < 0 ||
    newHead.x >= grid ||
    newHead.y >= grid ||
    snake.some((part) => part.x === newHead.x && part.y === newHead.y)
  ) {
    endGame();
    return;
  }

  snake.unshift(newHead);

  if (newHead.x === food.x && newHead.y === food.y) {
    score += 1;
    scoreEl.textContent = String(score);
    placeFood();
  } else {
    snake.pop();
  }

  draw();
}

function drawCell(x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x * cellSize + 1, y * cellSize + 1, cellSize - 2, cellSize - 2);
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  snake.forEach((part, index) => {
    drawCell(part.x, part.y, index === 0 ? "#16a34a" : "#22c55e");
  });
  drawCell(food.x, food.y, "#f97316");
}

function startGame() {
  if (timer) return;
  if (!running || gameOver) {
    resetGame();
  }
  running = true;
  gameOver = false;
  statusText.textContent = "游戏进行中...";
  timer = setInterval(tick, speed);
}

function endGame() {
  gameOver = true;
  clearInterval(timer);
  timer = null;
  if (score > bestScore) {
    bestScore = score;
    localStorage.setItem("snake-best-score", String(bestScore));
    bestScoreEl.textContent = String(bestScore);
  }
  statusText.textContent = "游戏结束，按空格或点击重新开始";
}

document.addEventListener("keydown", (e) => {
  const key = e.key.toLowerCase();

  if (key === " ") {
    e.preventDefault();
    startGame();
    return;
  }
  if (key === "arrowup" || key === "w") setDirection(0, -1);
  if (key === "arrowdown" || key === "s") setDirection(0, 1);
  if (key === "arrowleft" || key === "a") setDirection(-1, 0);
  if (key === "arrowright" || key === "d") setDirection(1, 0);
});

restartBtn.addEventListener("click", () => {
  clearInterval(timer);
  timer = null;
  running = false;
  resetGame();
  startGame();
});

resetGame();
