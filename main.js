var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var bugRadius = 10;
var bugX = getRandomInt(10, (canvas.width - bugRadius));
var bugY = (canvas.height - bugRadius);
var exitHeight = 5;
var exitWidth = 30;
var exitX = getRandomInt(10, (canvas.width - exitWidth));

var fireballRadius = 10;
var fireballCount = getRandomInt(1, 5);
var fireballXArray = [];
var fireballYArray = [];
var fireballDXArray = [];
var fireballDYArray = [];

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

for (i = 0; i < fireballCount; i++) {
	fireballXArray.push(getRandomInt(10, canvas.width - fireballRadius));
	fireballYArray.push(getRandomInt(10, canvas.height - fireballRadius));
	fireballDXArray.push(1);
	fireballDYArray.push(-1);
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
	drawFireballs();

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

	for (i = 0; i < fireballXArray.length; i++) {
		if (fireballXArray[i] + fireballDXArray[i] > canvas.width - fireballRadius || fireballXArray[i] + fireballDXArray[i] < fireballRadius) {
			fireballDXArray[i] = -fireballDXArray[i];
		}

		if (fireballYArray[i] + fireballDYArray[i] > canvas.height - fireballRadius || fireballYArray[i] + fireballDYArray[i] < fireballRadius) {
			fireballDYArray[i] = -fireballDYArray[i];
		}

		fireballXArray[i] += fireballDXArray[i];
		fireballYArray[i] += fireballDYArray[i];
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

function drawFireball(fireballX, fireballY) {
	ctx.beginPath();
	ctx.arc(fireballX, fireballY, fireballRadius, 0, Math.PI*2);
	ctx.fillStyle = '#E25822';
	ctx.fill();
	ctx.closePath();
}

function drawFireballs() {
	for (i = 0; i < fireballYArray.length; i++) {
		drawFireball(fireballXArray[i], fireballYArray[i]);
	}
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