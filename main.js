var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var bugHeight = 20;
var bugWidth = 20;
var bugX = getRandomInt(10, canvas.width);
var bugY = canvas.height;
var exitHeight = 5;
var exitWidth = 30;
var exitX = getRandomInt(10, (canvas.width - exitWidth));
var exitY = 0;

var fireballRadius = 10;
var fireballCount = getRandomInt(5, 10);
var fireballXArray = [];
var fireballYArray = [];
var fireballDXArray = [];
var fireballDYArray = [];

var brickCount = getRandomInt(8, 15);
var brickXArray = [];
var brickYArray = [];

var upPressed = false;
var downPressed = false;
var leftPressed = false;
var rightPressed = false;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

for (i = 0; i < brickCount; i++) {
	brickXArray.push(getRandomInt(20, canvas.width - 45));
	brickYArray.push(getRandomInt(20, canvas.height - 45));	
}

for (i = 0; i < fireballCount; i++) {
	fireballXArray.push(getRandomInt(10, canvas.width - fireballRadius));
	fireballYArray.push(getRandomInt(10, canvas.height - fireballRadius - 20));

	var fireballSpeed = getRandomInt(1, 5);

	fireballDXArray.push(fireballSpeed);
	fireballDYArray.push(-fireballSpeed);
}

function draw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.rect(bugX, bugY, 20, 20);

	var bug = new Image();
	bug.src = 'images/bug.png';
	bug.onload = function() {
		var pattern = ctx.createPattern(this, "no-repeat");
		ctx.drawImage(bug, bugX, bugY - bugHeight);
	}

	drawExit();
	drawBricks();
	drawFireballs();

	moveBug();

	fireballMovement();

	exitCollision();
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
    ctx.rect(exitX, exitY, exitWidth, exitHeight);
    ctx.fillStyle = "#0000FF";
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

function exitCollision() {
	if (((bugY - bugHeight) == exitY) && (((bugX + bugWidth) > exitX) && (bugX < (exitX + exitWidth)))) {
		alert("Congratulations! You got to the exit!");
        document.location.reload();
	}
}

function fireballMovement() {
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

function moveBug() {
	if (rightPressed && (bugX < (canvas.width - bugWidth))) {
		bugX += 3;
	}
	else if (leftPressed && (bugX > 0)) {
		bugX -= 3;
	}
	else if (upPressed && (bugY > 20)) {
		bugY -= 3;
	}
	else if (downPressed && (bugY < canvas.height)) {
		bugY += 3;
	}
}

setInterval(draw, 10);