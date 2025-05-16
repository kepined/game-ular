const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const gridSize = 20;
let snake = [{ x: 160, y: 200 }];
let direction = "right";
let food = spawnFood();
let gameInterval;

document.addEventListener("keydown", changeDirection);

function changeDirection(e) {
  const key = e.key;
  if (key === "ArrowUp" && direction !== "down") direction = "up";
  if (key === "ArrowDown" && direction !== "up") direction = "down";
  if (key === "ArrowLeft" && direction !== "right") direction = "left";
  if (key === "ArrowRight" && direction !== "left") direction = "right";
}

function spawnFood() {
  const x = Math.floor(Math.random() * (canvas.width / gridSize)) * gridSize;
  const y = Math.floor(Math.random() * (canvas.height / gridSize)) * gridSize;
  return { x, y };
}

function draw() {
  ctx.fillStyle = "#222";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "lime";
  snake.forEach(segment => ctx.fillRect(segment.x, segment.y, gridSize, gridSize));

  ctx.fillStyle = "red";
  ctx.fillRect(food.x, food.y, gridSize, gridSize);
}

function update() {
  const head = { ...snake[0] };
  if (direction === "up") head.y -= gridSize;
  if (direction === "down") head.y += gridSize;
  if (direction === "left") head.x -= gridSize;
  if (direction === "right") head.x += gridSize;

  // Game over if hit wall or itself
  if (
    head.x < 0 || head.y < 0 ||
    head.x >= canvas.width || head.y >= canvas.height ||
    snake.some(segment => segment.x === head.x && segment.y === head.y)
  ) {
    clearInterval(gameInterval);
    alert("Game Over!");
    return;
  }

  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    food = spawnFood();
  } else {
    snake.pop();
  }
}

function gameLoop() {
  update();
  draw();
}

gameInterval = setInterval(gameLoop, 150);
