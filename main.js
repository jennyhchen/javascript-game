var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var bugRadius = 10;
var bugX = (canvas.width - bugRadius) / 2;
var bugY = (canvas.height - bugRadius) / 2;
var fireX = getRandomInt(1, 48);
var fireY = getRandomInt(1, 32);
var exitHeight = 5;
var exitWidth = 30;
var exitX = (canvas.width-exitWidth) / 2;

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
	ctx.arc(bugX, bugY, bugRadius, 0, Math.PI*2);
	ctx.fillStyle = "#0095DD";
	ctx.fill();
	ctx.closePath();
}

function draw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	drawBricks();
	drawBug();
	drawExit();
	drawFire();

	if (rightPressed && (bugX < (canvas.width - bugRadius))) {
		bugX += 3;
	}
	else if (leftPressed && (bugX > 10)) {
		bugX -= 3;
	}
	else if (upPressed && (bugY > 10)) {
		bugY -= 3;
	}
	else if (downPressed && (bugY < (canvas.height - bugRadius))) {
		bugY += 3;
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

function drawExit() {
	ctx.beginPath();
    ctx.rect(exitX, canvas.height-exitHeight, exitWidth, exitHeight);
    ctx.fillStyle = "#000000";
    ctx.fill();
    ctx.closePath();
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
	if ((e.keyCode == 87) || (e.keyCode == 38)) {
		upPressed = true;
	}
	else if ((e.keyCode == 83) || (e.keyCode == 40)) {
		downPressed = true;
	}
	else if ((e.keyCode == 65) || (e.keyCode == 37)) {
		leftPressed = true;
	}
	else if ((e.keyCode == 68) || (e.keyCode == 39)) {
		rightPressed = true;
	}
}

function keyUpHandler(e) {
	if ((e.keyCode == 87) || (e.keyCode == 38)) {
		upPressed = false;
	}
	else if ((e.keyCode == 83) || (e.keyCode == 40)) {
		downPressed = false;
	}
	else if ((e.keyCode == 65) || (e.keyCode == 37)) {
		leftPressed = false;
	}
	else if ((e.keyCode == 68) || (e.keyCode == 39)) {
		rightPressed = false;
	}	
}

setInterval(draw, 10);