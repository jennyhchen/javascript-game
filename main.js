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

var rockCount = getRandomInt(8, 15);
var rockHeight = 35;
var rockWidth = 25;
var rockXArray = [];
var rockYArray = [];

var direction = '';

var upPressed = false;
var downPressed = false;
var leftPressed = false;
var rightPressed = false;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

for (i = 0; i < rockCount; i++) {
	rockXArray.push(getRandomInt(20, canvas.width - 45));
	rockYArray.push(getRandomInt(20, canvas.height - 45));	
}

for (i = 0; i < fireballCount; i++) {
	fireballXArray.push(getRandomInt(10, canvas.width - fireballRadius));
	fireballYArray.push(getRandomInt(10, canvas.height - fireballRadius - 20));

	var fireballSpeed = getRandomInt(1, 5);

	fireballDXArray.push(fireballSpeed);
	fireballDYArray.push(-fireballSpeed);
}

var bug = new Image();
bug.src = 'images/bug.png';
bug.onload = function() {
	var pattern = ctx.createPattern(this, "no-repeat");
}

var fireball = new Image();
fireball.src = 'images/fireball.png';
fireball.onload = function() {
	var pattern = ctx.createPattern(this, "no-repeat");
}

var rock = new Image();
rock.src = 'images/rock.png';
rock.onload = function() {
	var pattern = ctx.createPattern(this, "no-repeat");
}

function draw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.rect(bugX, bugY, bugWidth, bugHeight);

	ctx.drawImage(bug, bugX, bugY - bugHeight);

	drawExit();
	drawRocks();
	drawFireballs();

	moveBug();
	fireballMovement();

	exitCollision();
}

function drawRock(rockX, rockY, rockWidth, rockHeight, rockColor) {
	ctx.drawImage(rock, rockX, rockY);
}

function drawRocks() {
	for (i = 0; i < rockXArray.length; i++) {
		drawRock(rockXArray[i], rockYArray[i], 25, 25, '#7E7E7E');
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
	ctx.drawImage(fireball, fireballX, fireballY - (fireballRadius * 2))
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

function rockCollision(objectX, objectY, objectWidth, objectHeight) {
	for (i = 0; i < rockXArray.length; i++) {
		if (((objectX + objectWidth) > rockXArray[i]) && (objectX < (rockXArray[i] + rockWidth)) && (objectY > rockYArray[i]) && (objectY < rockYArray[i] + rockHeight)) {
			if ((objectY > rockYArray[i]) && ((objectX + objectWidth) > rockXArray[i]) && (objectX < (rockXArray[i] + rockWidth))) {
				return "down";
			}
			if ((objectY < rockYArray[i] + rockHeight) && ((objectX + objectWidth) > rockXArray[i]) && (objectX < (rockXArray[i] + rockWidth))) {
				return "up";
			}
			if (((objectX + objectWidth) > rockXArray[i]) && (objectY > rockYArray[i]) && (objectY < rockYArray[i] + rockHeight)) {
				return "right";
			}
			if ((objectX < (rockXArray[i] + rockWidth)) && (objectY > rockYArray[i]) && (objectY < rockYArray[i] + rockHeight)) {
				return "left";
			}
		}
	}
}

function moveBug() {
	if (rightPressed && (bugX < (canvas.width - bugWidth)) && (rockCollision(bugX, bugY, bugWidth, bugHeight) != "right")) {
		bugX += 3;
	}
	if (leftPressed && (bugX > 0) && (rockCollision(bugX, bugY, bugWidth, bugHeight) != "left")) {
		bugX -= 3;
	}
	if (upPressed && (bugY > 20) && (rockCollision(bugX, bugY, bugWidth, bugHeight) != "up")) {
		bugY -= 3;
	}
	if (downPressed && (bugY < canvas.height) && (rockCollision(bugX, bugY, bugWidth, bugHeight) != "down")) {
		bugY += 3;
	}
}

setInterval(draw, 10);