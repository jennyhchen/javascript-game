var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var bugRadius = 10;
var bugX = (canvas.width - bugRadius);
var bugY = (canvas.height - bugRadius);
var fireX = getRandomInt(1, 48);
var fireY = getRandomInt(1, 32);

var x = canvas.width / 2;
var y = canvas.height - 30;

var upPressed = false;
var downPressed = false;
var leftPressed = false;
var rightPressed = false;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function drawBug() {
	ctx.beginPath();
	ctx.arc(250, 300, 10, 0, Math.PI*2);
	ctx.fillStyle = "#0095DD";
	ctx.fill();
	ctx.closePath();
}

function draw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	drawBricks();
	drawBug();
	drawFire();

	if (rightPressed) {
		bugX += 7;
	}
	else if (leftPressed) {
		bugX -= 7;
	}
	else if (upPressed) {
		bugY += 7;
	}
	else if (downPressed) {
		bugY -= 7;
	}
}

function drawBrick(brickX, brickY, brickWidth, brickHeight, brickColor) {
    ctx.beginPath();
    ctx.rect(brickX, brickY, brickWidth, brickHeight);
    ctx.fillStyle = brickColor;
    ctx.fill();
    ctx.closePath();
}

function drawBricks() {
}

function drawFire() {
	drawBrick(fireX * 10, fireY * 10, 25, 25, '#E25822');
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min)) + min;
}

function keyDownHandler(e) {
	if (e.keyCode == 87) {
		upPressed = true;
	}
	else if (e.keyCode == 65) {
		downPressed = true;
	}
	else if (e.keyCode == 83) {
		leftPressed = true;
	}
	else if (e.keyCode == 68) {
		rightPressed = true;
	}
}

function keyUpHandler(e) {
	if (e.keyCode == 87) {
		upPressed = false;
	}
	else if (e.keyCode == 65) {
		downPressed = false;
	}
	else if (e.keyCode == 83) {
		leftPressed = false;
	}
	else if (e.keyCode == 68) {
		rightPressed = false;
	}	
}

setInterval(draw, 10);