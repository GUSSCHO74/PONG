const canvas = document.getElementById("pongGame");
const context = canvas.getContext("2d");
canvas.width = 1250;
canvas.height = 540;

class Element {
  constructor(options) {
    this.x = options.x;
    this.y = options.y;
    this.width = options.width;
    this.height = options.height;
    this.color = options.color;
    this.speed = options.speed || 2;
    this.gravity = options.gravity;
  }
}

//make ball bounce n shi
function ballBounce() {
  if (
    ball.y + ball.gravity <= 0 ||
    ball.y + ball.gravity >= canvas.height - 15
  ) {
    ball.gravity = ball.gravity * -1;
    ball.y += ball.gravity;
    ball.x += ball.speed;
  } else {
    ball.y += ball.gravity;
    ball.x += ball.speed;
  }
  ballWallCollision();
}

//detect collision
function ballWallCollision() {
  if (
    ball.x + ball.speed <= 0 ||
    ball.x + ball.speed + ball.width >= canvas.width
  ) {
    ball.y += ball.gravity;
    ball.speed = ball.speed * -1;
    ball.x += ball.speed;
  } else {
    ball.y += ball.gravity;
    ball.x += ball.speed;
  }
  drawElements();
}

function drawElements() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  drawElement(playerOne);
  drawElement(playerTwo);
  drawElement(ball);
}

//player 1
const playerOne = new Element({
  x: 10,
  y: canvas.height / 2 - 40,
  width: 15,
  height: 80,
  color: "#fff",
  gravity: 2,
});

//player 2
const playerTwo = new Element({
  x: canvas.width - 25,
  y: canvas.height / 2 - 40,
  width: 15,
  height: 80,
  color: "#fff",
  gravity: 2,
});

//ball
const ball = new Element({
  x: canvas.width / 2,
  y: canvas.height / 2,
  width: 15,
  height: 15,
  color: "#20C20E",
  speed: 8,
  gravity: 4,
});

function bounce() {
  if (ball.y + ball.gravity <= 0 || ball.y + ball.gravity >= canvas.height) {
    ball.gravity = ball.gravity * -1;
    ball.y += ball.gravity;
    ball.x += ball.speed;
  } else {
    ball.y += ball.gravity;
    ball.x += ball.speed;
  }
  collision();
}
// change to opposite direction if hit function
function collision() {
  if (
    ball.x + ball.speed <= 0 ||
    ball.x + ball.speed + ball.width >= canvas.width
  ) {
    ball.y += ball.gravity;
    ball.speed = ball.speed - 1;
    ball.x += ball.speed;
  } else {
    ball.y += ball.gravity;
    ball.x += ball.speed;
  }
  drawElements();
}

function drawElement(element) {
  context.fillStyle = element.color;
  context.fillRect(element.x, element.y, element.width, element.height);
}

function loop() {
  ballBounce();
  window.requestAnimationFrame(loop);
}
loop();

drawElement(playerOne);
drawElement(playerTwo);
drawElement(ball);

//key movement
window.addEventListener("keydown", doKeyDown, false);

function doKeyDown(e) {
  const key = e.key;
  if (key == "w" && playerOne.y - playerOne.gravity > 0)
    playerOne.y -= playerOne.gravity * 4;
  else if (
    key == "s" &&
    playerOne.y + playerOne.height + playerOne.gravity < canvas.height
  )
    playerOne.y += playerOne.gravity * 4;

  if (key == "i" && playerTwo.y - playerTwo.gravity > 0)
    playerTwo.y -= playerTwo.gravity * 4;
  else if (
    key == "k" &&
    playerTwo.y + playerTwo.height + playerTwo.gravity < canvas.height
  )
    playerTwo.y += playerTwo.gravity * 4;
}

function ballWallCollision() {
  if (
    (ball.y + ball.gravity <= playerTwo.y + playerTwo.height &&
      ball.x + ball.width + ball.speed >= playerTwo.x &&
      ball.y + ball.gravity > playerTwo.y) ||
    (ball.y + ball.gravity > playerOne.y &&
      ball.x + ball.speed <= playerOne.x + playerOne.width)
  ) {
    ball.speed = ball.speed * -1;
  } else if (ball.x + ball.speed < playerOne.x) {
    scoreTwo += 1;
    ball.speed = ball.speed * -1;
    ball.x = 100 + ball.speed;
    ball.y += ball.gravity;
  } else if (ball.x + ball.speed > playerTwo.x + playerTwo.width) {
    scoreOne += 1;
    ball.speed = ball.speed * -1;
    ball.x = 100 + ball.speed;
    ball.y += ball.gravity;
  }
  drawElements();
}

// Inspiration video: https://www.youtube.com/watch?v=IISA4XaE2gE
