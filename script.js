const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let snake = [{ x: 10, y: 10 }];
let food = { x: 15, y: 15 };
let direction = "right";
let gridSize = 20;
let tileSize = canvas.width / gridSize;

function startGame() {
  document.body.focus();
  document.addEventListener("keydown", keyDown);
  setInterval(update, 150);
}

function update() {
  const head = { ...snake[0] };

  switch (direction) {
    case "up": head.y -= 1; break;
    case "down": head.y += 1; break;
    case "left": head.x -= 1; break;
    case "right": head.x += 1; break;
  }

  if (
    head.x < 0 || head.x >= gridSize ||
    head.y < 0 || head.y >= gridSize ||
    snake.some(seg => seg.x === head.x && seg.y === head.y)
  ) {
    alert("Game Over!");
    snake = [{ x: 10, y: 10 }];
    direction = "right";
    food = { x: 15, y: 15 };
    return;
  }

  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    food = {
      x: Math.floor(Math.random() * gridSize),
      y: Math.floor(Math.random() * gridSize),
    };
  } else {
    snake.pop();
  }

  draw();
}

function draw() {
  ctx.fillStyle = "#111";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "lime";
  for (let s of snake) {
    ctx.fillRect(s.x * tileSize, s.y * tileSize, tileSize - 2, tileSize - 2);
  }

  ctx.fillStyle = "red";
  ctx.fillRect(food.x * tileSize, food.y * tileSize, tileSize - 2, tileSize - 2);
}

function keyDown(e) {
  switch (e.key) {
    case "ArrowUp": if (direction !== "down") direction = "up"; break;
    case "ArrowDown": if (direction !== "up") direction = "down"; break;
    case "ArrowLeft": if (direction !== "right") direction = "left"; break;
    case "ArrowRight": if (direction !== "left") direction = "right"; break;
  }
}

function changeDirection(dir) {
  if (dir === "up" && direction !== "down") direction = "up";
  if (dir === "down" && direction !== "up") direction = "down";
  if (dir === "left" && direction !== "right") direction = "left";
  if (dir === "right" && direction !== "left") direction = "right";
}
