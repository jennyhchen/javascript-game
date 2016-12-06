var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var bugRadius = 10;
var bugX = getRandomInt(10, (canvas.width-bugRadius));
var bugY = (canvas.height - bugRadius);
var fireX = getRandomInt(1, 48);
var fireY = getRandomInt(1, 32);
var exitHeight = 5;
var exitWidth = 30;
var exitX = getRandomInt(10, (canvas.width-exitWidth));

var brickCount = getRandomInt(5, 10);
var brickXArray = [];
var brickYArray = [];

var upPressed = false;
var downPressed = false;
var leftPressed = false;
var rightPressed = false;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

for (i = 0; i < brickCount; i++) {
	brickXArray.push(getRandomInt(10, 480));
	brickYArray.push(getRandomInt(10, 320));
}

function drawBug() {
	ctx.beginPath();
	ctx.arc(bugX, bugY, bugRadius, 0, Math.PI*2);
	ctx.fillStyle = "#808000";
	ctx.fill();
	ctx.closePath();
}

function draw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	drawBug();
	drawExit();
	drawBricks();
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
	for (i = 0; i < brickXArray.length; i++) {
		drawBrick(brickXArray[i], brickYArray[i], 25, 25, '#7E7E7E');
	}
}

function drawExit() {
	ctx.beginPath();
    ctx.rect(exitX, 0, exitWidth, exitHeight);
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