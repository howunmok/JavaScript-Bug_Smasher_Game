var canvas = document.createElement("canvas");
var context = canvas.getContext("2d");
canvas.width = 670;
canvas.height = 509;
document.getElementById("theCanvas").appendChild(canvas);

var backgroundReady = false;
var backgroundImage = new Image();
backgroundImage.onload = function () {
  backgroundReady = true;
};
backgroundImage.src = "images/leaf_small.png";

var beetleReady = false;
var beetleImage = new Image();
beetleImage.onload = function () {
  beetleReady = true;
};
beetleImage.src = "images/beetle_small.png";

var score = 0;
var hopInterval = 2000;
var hop = setInterval(function () {
  resetLocation();
}, hopInterval);

var beetle = {
  x: 0,
  y: 0,
  speed: 256,
};

canvas.addEventListener("mousedown", clicked, false);
function clicked(e) {
  e.preventDefault();
  var x = e.clientX;
  var y = e.clientY;

  if (
    x >= beetle.x &&
    x <= beetle.x + 90 &&
    y >= beetle.y &&
    y <= beetle.y + 190
  ) {
    score += 1;
    resetLocation();

    if (hopInterval - 100 >= 50) {
      clearInterval(hop);
      hopInterval -= 100;
      hop = setInterval(function () {
        resetLocation();
      }, hopInterval);
    }
  }
}

var resetLocation = function () {
  beetle.x = 32 + Math.random() * (canvas.width - 100);
  beetle.y = 32 + Math.random() * (canvas.height - 100);
};

var resetSpeed = function () {
  clearInterval(hop);
  hopInterval = 2000;
  hop = setInterval(function () {
    resetLocation();
  }, hopInterval);
};

var resetScore = function () {
  score = 0;
  resetSpeed();
};

var render = function () {
  if (backgroundReady) {
    context.drawImage(backgroundImage, 0, 0);
  }

  if (beetleReady) {
    context.drawImage(beetleImage, beetle.x, beetle.y);
  }

  context.fillStyle = "rgb(0, 0, 250)";
  context.font = "24px Helvetica";
  context.textAlign = "left";
  context.textBaseline = "top";
  document.getElementById("score").innerHTML = "Score : " + score;
};

var main = function () {
  render();

  requestAnimationFrame(main);
};

var w = window;
requestAnimationFrame =
  w.requestAnimationFrame ||
  w.webkitRequestAnimationFrame ||
  w.msRequestAnimationFrame ||
  w.mozRequestAnimationFrame;

main();
