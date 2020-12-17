var snake_width = 10;
var snake_height = 10;

var snake = 1;

var posx = [10];
var posy = [10];

var foodX = 20;
var foodY = 50;

var trailX, trailY;

var step = 10;
var interval = 100;
var points = 0;

var id = setInterval(frame, interval);

var root = document.getElementById("root");
var rx = root.getContext("2d");
var score = document.getElementById("score");

//Movement booleans

var left = false;
var right = true;
var up = false;
var down = false;
var add = false;

//Adding body

function addbody() {
  snake++;
  add = true;
}

//Input managing
//Sets the boolean values ie. left, right, up, down, true or false based on the input from the

window.addEventListener(
  "keydown",
  function (event) {
    if (event.defaultPrevented) {
      return; // Do nothing if the event was already processed
    }

    switch (event.key) {
      case "ArrowRight":
        if (left == false && right == false) {
          right = true;
          left = false;
          up = false;
          down = false;
        }

        break;

      case "ArrowLeft":
        if (right == false && left == false) {
          right = false;
          left = true;
          up = false;
          down = false;
        }
        break;

      case "ArrowDown":
        if (up == false && down == false) {
          right = false;
          left = false;
          up = false;
          down = true;
        }
        break;

      case "ArrowUp":
        if (down == false && up == false) {
          right = false;
          left = false;
          up = true;
          down = false;
        }
        break;

      case "e":
        addbody();
        break;
    }

    event.preventDefault();
  },
  true
);

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

function checkCollision() {
  if (posx[0] > 1360 || posx[0] < 0 || posy[0] < 0 || posy[0] > 768) {
    clearInterval(id);
    rx.font = "50px Arial";
    rx.fillText("Game Over!", 540, 280);
  }

  if (posx.indexOf(posx[0]) > 0 && posy.indexOf(posy[0] > 0)) {
    clearInterval(id);
    rx.font = "50px Arial";
    rx.fillText("Game Over!", 540, 280);
  }
}

//Actual movement implementation basically setting the transform attribute of the object to translate(posx, posy)
function frame() {
  rx.clearRect(0, 0, 2000, 2000);

  var i;
  checkCollision();
  drawFood();

  score.innerHTML = "Score: " + points;

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

  for (i = 0; i < snake; i++) {
    rx.fillRect(posx[i], posy[i], snake_height, snake_width);
  }
}
