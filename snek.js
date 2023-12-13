var snake_width = 10;
var snake_height = 10;

var snake = 1;

var posx = [10];
var posy = [10];

var foodX = 20;
var foodY = 50;

var trailX, trailY;

var step = 10;
var interval = 200;
let points = 0;

var id = setInterval(frame, interval);

var root = document.getElementById("root");
var rx = root.getContext("2d");
var score = document.getElementById("score");

function initializeGame() {
  snake_width = 10;
  snake_height = 10;

  snake = 1;

  posx = [10];
  posy = [10];

  foodX = 20;
  foodY = 50;

  step = 10;
  interval = 200;
  points = 0;
  left = false;
  right = true;
  up = false;
  down = false;
  add = false;
}

//Movement booleans

var left = false;
var right = true;
var up = false;
var down = false;
var add = false;

let startTime;

//Adding body

function addbody() {
  snake++;
  add = true;
}

//Input managing
//Sets the boolean values ie. left, right, up, down, true or false based on the input from the

function GoDown() {
  if (up == false && down == false) {
    right = false;
    left = false;
    up = false;
    down = true;
  }
}

function GoUp() {
  if (down == false && up == false) {
    right = false;
    left = false;
    up = true;
    down = false;
  }
}

function GoLeft() {
  if (right == false && left == false) {
    right = false;
    left = true;
    up = false;
    down = false;
  }
}

function GoRight() {
  if (left == false && right == false) {
    right = true;
    left = false;
    up = false;
    down = false;
  }
}

function resetGame() {
  clearInterval(id);
  initializeGame();
  id = setInterval(frame, interval);
}

function initializeControls() {
  window.addEventListener(
    "keydown",
    function (event) {
      if (event.defaultPrevented) {
        return; // Do nothing if the event was already processed
      }

      switch (event.key) {
        case "ArrowRight":
          GoRight();

          break;

        case "ArrowLeft":
          GoLeft();
          break;

        case "ArrowDown":
          GoDown();
          break;

        case "ArrowUp":
          GoUp();
          break;

        case "j":
          GoDown();
          break;

        case "k":
          GoUp();
          break;

        case "h":
          GoLeft();
          break;

        case "l":
          GoRight();
          break;

        case "e":
          addbody();
          break;

        case "o":
          GameOver();
          break;

        case "r":
          resetGame();
          break;
      }

      event.preventDefault();
    },
    true
  );
}

function resetFood() {
  foodX = Math.floor(Math.random() * 100) * 10;
  foodY = Math.floor(Math.random() * 100) * 10;
  while (foodX >= 1360) {
    foodX = Math.floor(Math.random() * 100) * 10;
  }
  while (foodY >= 760) {
    foodY = Math.floor(Math.random() * 100) * 10;
  }
}

function updateScore() {
  points++;
  clearInterval(id);
  interval -= interval * 0.15;
  id = setInterval(frame, interval);
}
function drawFood() {
  rx.fillStyle = "red";
  rx.fillRect(foodX, foodY, snake_height, snake_width);
  rx.fillStyle = "black";
  if (posx[0] == foodX && posy[0] == foodY) {
    addbody();
    resetFood();
    updateScore();
  }
}

function GameOver() {
  clearInterval(id);
  rx.font = "50px Arial";
  rx.fillText("Game Over!", 540, 280);
}

function checkCollision() {
  if (posx[0] > 1360 || posx[0] < 0 || posy[0] < 0 || posy[0] > 768) {
    GameOver();
  }

  let collisionCoordsX = posx.filter((item, index) => index > 0);
  let collisionCoordsY = posy.filter((item, index) => index > 0);

  console.log(posx);
  console.log(posy);

  if (
    collisionCoordsX.indexOf(posx[0]) === collisionCoordsY.indexOf(posy[0]) &&
    collisionCoordsX.indexOf(posx[0]) > 0
  ) {
    GameOver();
  }
}

// Actual movement implementation basically setting the transform attribute of the object to translate(posx, posy)

initializeControls();

function gameloop() {
  if (right) {
    posx.unshift(posx[0] + step);
    posy.unshift(posy[0]);
  } else if (left) {
    posx.unshift(posx[0] - step);
    posy.unshift(posy[0]);
  } else if (up) {
    posx.unshift(posx[0]);
    posy.unshift(posy[0] - step);
  } else if (down) {
    posx.unshift(posx[0]);
    posy.unshift(posy[0] + step);
  }

  if (!add) {
    posx.pop();
    posy.pop();
  } else {
    add = false;
  }
}

function updateUI() {
  score.innerHTML = "Score: " + points;
}

function frame() {
  console.clear();
  console.log("Frame time:", performance.now() - startTime);
  console.log("Interval time:", interval);

  startTime = performance.now();
  rx.clearRect(0, 0, 2000, 2000);

  checkCollision();
  drawFood();

  updateUI();

  gameloop();

  for (let i = 0; i < snake; i++) {
    rx.fillRect(posx[i], posy[i], snake_height, snake_width);
  }
}
