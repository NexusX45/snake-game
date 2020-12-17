var snake_width = 10;
var snake_height = 10;

var snake = 1;
// snake.push(body);

var posx = [10];
var posy = [10];

var foodX = 20;
var foodY = 50;

var trailX, trailY;

var step = 10;
var interval = 200;

var id = setInterval(frame, interval);

var root = document.getElementById("root");
var rx = root.getContext("2d");

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
    console.log(event.key);

    switch (event.key) {
      case "ArrowRight":
        // console.log("Right");

        if (left == false && right == false) {
          right = true;
          left = false;
          up = false;
          down = false;
        }

        break;

      case "ArrowLeft":
        // console.log("Left");

        if (right == false && left == false) {
          right = false;
          left = true;
          up = false;
          down = false;
        }
        break;

      case "ArrowDown":
        // console.log("Down");

        if (up == false && down == false) {
          right = false;
          left = false;
          up = false;
          down = true;
        }
        break;

      case "ArrowUp":
        // console.log("Up");

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
  interval -= 10;
}
function drawFood() {
  rx.fillStyle = "red";
  rx.fillRect(foodX, foodY, snake_height, snake_width);
  rx.fillStyle = "black";
  if (posx[0] == foodX && posy[0] == foodY) {
    addbody();
    resetFood();
  }
}

//Actual movement implementation basically setting the transform attribute of the object to translate(posx, posy)
function frame() {
  rx.clearRect(0, 0, 2000, 2000);

  var i;

  drawFood();

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
    console.log("pop");
    posx.pop();
    posy.pop();
  } else {
    add = false;
  }

  for (i = 0; i < snake; i++) {
    rx.fillRect(posx[i], posy[i], snake_height, snake_width);
  }
  console.log("Snake: " + snake);
  console.log(posx);
  console.log(posy);
}
