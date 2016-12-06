var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var bugRadius = 10;
var bugX = (canvas.width - bugRadius) / 2;
var bugY = (canvas.height - bugRadius) / 2;

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

	drawBug();

	if (rightPressed) {
		bugX += 7;
	}
	else if (leftPressed) {
		bugX -= 7;
	}
	else if (upPressed) {
		bugY -= 7;
	}
	else if (downPressed) {
		bugY += 7;
	}
}

function keyDownHandler(e) {
	if (e.keyCode == 87) {
		upPressed = true;
	}
	else if (e.keyCode == 83) {
		downPressed = true;
	}
	else if (e.keyCode == 65) {
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
	else if (e.keyCode == 83) {
		downPressed = false;
	}
	else if (e.keyCode == 65) {
		leftPressed = false;
	}
	else if (e.keyCode == 68) {
		rightPressed = false;
	}	
}

setInterval(draw, 10);