var canvas;
var ctx;
var img;
var score;
var highScore;
var level;
var numLives;
var numWon;
var moveSound;
var winSound;
var loseSound;
var frogXStart = 190;
var frogYStart = 500;
var frogXPos;
var frogYPos;
var log1XPos;
var log1YPos;
var log2XPos;
var log2YPos;
var log3XPos;
var log3YPos;
var log4XPos;
var log4YPos;
var log5XPos;
var log5YPos;
var car1AXPos;
var car1AYPos;
var car1BXPos;
var car1BYPos;
var car2AXPos;
var car2AYPos;
var car2BXPos;
var car2BYPos;
var car2CXPos;
var car2CYPos;
var car3AXPos;
var car3AYPos;
var car3BXPos;
var car3BYPos;
var car3CXPos;
var car3CYPos;
var car4AXPos;
var car4AYPos;
var car4BXPos;
var car4BYPos;
var car4CXPos;
var car4CYPos;
var car5AXPos;
var car5AYPos;
var car5BXPos;
var car5BYPos;
var carSpeed;
var logSpeed;

// basic game loop for structuring frogger game
function game_loop(){
	set_up();
	anim_loop();
}

// initialize parameters for game [e.g.: location of frog, cars, log]
function set_up(){
	score = 0;
	highScore = 0;
	level = 1;
	numLives = 5;
	numWon = 0;
	frogXPos = frogXStart;
	frogYPos = frogYStart;
	log1XPos = 184;
	log1YPos = 115;
	log2XPos = 112;
	log2YPos = 149;
	log3XPos = 60;
	log3YPos = 183;
	log4XPos = 112;
	log4YPos = 217;
	log5XPos = 184;
	log5YPos = 251;
	car1AXPos = 24;
	car1AYPos = 319;
	car1BXPos = 300;
	car1BYPos = 319;
	car2AXPos = 20;
	car2AYPos = 353;
	car2BXPos = 170;
	car2BYPos = 353;
	car2CXPos = 320;
	car2CYPos = 353;
	car3AXPos = 10;
	car3AYPos = 387;
	car3BXPos = 170;
	car3BYPos = 387;
	car3CXPos = 340;
	car3CYPos = 387;
	car4AXPos = 20;
	car4AYPos = 421;
	car4BXPos = 170;
	car4BYPos = 421;
	car4CXPos = 320;
	car4CYPos = 421;
	car5AXPos = 24;
	car5AYPos = 455;
	car5BXPos = 300;
	car5BYPos = 455;
	logSpeed = 7;
	carSpeed = 7;
}

function anim_loop(){
	moveSound = document.getElementById('move');
	winSound = document.getElementById('win');
	loseSound = document.getElementById('lose');
	canvas = document.getElementById('game');
	ctx = canvas.getContext('2d');
	img = new Image();
	img.src = 'assets/frogger_sprites.png';
	img.onload = function(){
		setInterval(animate, 140);
		window.addEventListener('keydown', userKey, true);
	}
}

// get user key input
function userKey(event){
	oldFrogX = frogXPos;
	oldFrogY = frogYPos;
	
	switch(event.keyCode){
	// left arrow
	case 37:
		if (frogXPos <= 25){		// if frog is at left border
			frogXPos += 0;
		}
		else {
			frogXPos += -43;
		}
		moveSound.play();
		break;
	// right arrow
	case 39:
		if (frogXPos >= 360){		// if frog is at right border
			frogXPos += 0;
		}
		else {
			frogXPos += 43;
		}
		moveSound.play();
		break;
	// down arrow
	case 40:
		if (frogYPos >= 530){		// if frog is at bottom of board
			frogYPos += 0;
		}
		else {
			frogYPos += 35;
		}
		moveSound.play();
		break;
	// up arrow
	case 38:
		if (frogYPos <= 85){		// if frog is at top of board
			frogYPos += 0;
		}
		else {
			frogYPos += -35;
			score += 10;
		}
		moveSound.play();
		break;
	}
}

function animate(){
	// clear background
	ctx.clearRect(0, 0, 397, 563);
	
	// draw basic board
	draw_board();
	
	// draw rest of board features
	draw_pieces();

	// move objects [logs, vehicles]
	move();

	// check if frogger has hit a vehicle
	check_collide();
	
	// check if frogger has made it to lily pad
	check_win();
}

// draw basic board for frogger game [most fundamental unchanging elements]
function draw_board(){
	ctx = canvas.getContext('2d');
	ctx.fillStyle="#191970";
	ctx.fillRect(2, 2, 395, 275);
	ctx.fillStyle="#000000";
	ctx.fillRect(2, 311, 395, 252);
	img = new Image();
	img2 = new Image();
	img3 = new Image();
	img.onload = function(){
		ctx.drawImage(img, 5, 6, 338, 43, 5, 5, 338, 43);					// header
		ctx.drawImage(img, 0, 55, 395, 54, 2, 53, 395, 54);					// green shape
		ctx.drawImage(img2, 0, 0, 27, 27, 15, 75, 27, 27);					// lily pads
		ctx.drawImage(img2, 0, 0, 27, 27, 101, 75, 27, 27);
		ctx.drawImage(img2, 0, 0, 27, 27, 186, 75, 27, 27);
		ctx.drawImage(img2, 0, 0, 27, 27, 270, 75, 27, 27);
		ctx.drawImage(img2, 0, 0, 27, 27, 355, 75, 27, 27);
		ctx.drawImage(img, 0, 119, 395, 34, 2, 277, 395, 34);				// purple roads
		ctx.drawImage(img, 0, 119, 395, 34, 2, 487, 395, 34);	
		ctx.drawImage(img, 12, 369, 23, 18, frogXPos, frogYPos, 23, 18);	// frog piece
	};
	img.src='assets/frogger_sprites.png';
	img2.src='assets/lilypad.png';
	img3.src='assets/dead_frog.png';
}

// draw pieces on gameboard that are moving and/or changing during game play
function draw_pieces(){
	ctx.font="bold 14px sans-serif";
	ctx.fillStyle="Lime";
	ctx.fillText("Score: ", 4, 557);
	ctx.fillText(score, 54, 557);
	ctx.fillText("Highscore: ", 120, 557);
	ctx.fillText(highScore, 206, 557);
	ctx.font="bold 20px sans-serif";
	ctx.fillText("Level ", 120, 540);
	ctx.fillText(level, 180, 540);
	if (numLives >= 5) {ctx.drawImage(img, 13, 334, 18, 24, 68, 524, 14, 18);}	// life5
	if (numLives >= 4) {ctx.drawImage(img, 13, 334, 18, 24, 52, 524, 14, 18);}	// life4
	if (numLives >= 3) {ctx.drawImage(img, 13, 334, 18, 24, 36, 524, 14, 18);}	// life3
	if (numLives >= 2) {ctx.drawImage(img, 13, 334, 18, 24, 20, 524, 14, 18);}	// life2
	if (numLives >= 1) {ctx.drawImage(img, 13, 334, 18, 24, 4, 524, 14, 18);}	// life1
	ctx.drawImage(img, 7, 198, 116, 21, log1XPos, log1YPos, 116, 21);			// log1
	ctx.drawImage(img, 7, 198, 116, 21, log2XPos, log2YPos, 116, 21);			// log2
	ctx.drawImage(img, 7, 198, 116, 21, log3XPos, log3YPos, 116, 21);			// log3
	ctx.drawImage(img, 7, 198, 116, 21, log4XPos, log4YPos, 116, 21);			// log4
	ctx.drawImage(img, 7, 198, 116, 21, log5XPos, log5YPos, 116, 21);			// log5
	ctx.drawImage(img, 82, 264, 24, 26, car1AXPos, car1AYPos, 24, 26);			// car1A
	ctx.drawImage(img, 46, 265, 24, 24, car1BXPos, car1BYPos, 24, 24);			// car1B
	ctx.drawImage(img, 106, 302, 48, 18, car2AXPos, car2AYPos, 48, 18);			// car2A
	ctx.drawImage(img, 10, 267, 28, 20, car2BXPos, car2BYPos, 28, 20);			// car2B
	ctx.drawImage(img, 106, 302, 48, 18, car2CXPos, car2CYPos, 48, 18);			// car2C
	ctx.drawImage(img, 10, 267, 28, 20, car3AXPos, car3AYPos, 28, 20);			// car3A
	ctx.drawImage(img, 73, 301, 23, 21, car3BXPos, car3BYPos, 23, 21);			// car3B
	ctx.drawImage(img, 10, 267, 28, 20, car3CXPos, car3CYPos, 28, 20);			// car3C
	ctx.drawImage(img, 106, 302, 48, 18, car4AXPos, car4AYPos, 48, 18);			// car4A
	ctx.drawImage(img, 10, 267, 28, 20, car4BXPos, car4BYPos, 28, 20);			// car4B
	ctx.drawImage(img, 106, 302, 48, 18, car4CXPos, car4CYPos, 48, 18);			// car4C
	ctx.drawImage(img, 82, 264, 24, 26, car5AXPos, car5AYPos, 24, 26);			// car5A
	ctx.drawImage(img, 46, 265, 24, 24, car5BXPos, car5BYPos, 24, 24);			// car5B
}

// animate pieces that move during game play
function move(){
	// animate vehicles
	if (car1AXPos >= 395) {car1AXPos = -24;}
	else {car1AXPos += carSpeed;}
	if (car1BXPos >= 395) {car1BXPos = -24;}
	else {car1BXPos += carSpeed;}
	if (car2AXPos >= 395) {car2AXPos = -48;}
	else {car2AXPos += carSpeed;}
	if (car2BXPos >= 395) {car2BXPos = -28;}
	else {car2BXPos += carSpeed;}
	if (car2CXPos >= 395) {car2CXPos = -48;}
	else {car2CXPos += carSpeed;}
	if (car3AXPos >= 395) {car3AXPos = -28;}
	else {car3AXPos += carSpeed;}
	if (car3BXPos >= 395) {car3BXPos = -23;}
	else {car3BXPos += carSpeed;}
	if (car3CXPos >= 395) {car3CXPos = -28;}
	else {car3CXPos += carSpeed;}
	if (car4AXPos >= 395) {car4AXPos = -48;}
	else {car4AXPos += carSpeed;}
	if (car4BXPos >= 395) {car4BXPos = -28;}
	else {car4BXPos += carSpeed;}
	if (car4CXPos >= 395) {car4CXPos = -48;}
	else {car4CXPos += carSpeed;}
	if (car5AXPos >= 395) {car5AXPos = -24;}
	else {car5AXPos += carSpeed;}
	if (car5BXPos >= 395) {car5BXPos = -24;}
	else {car5BXPos += carSpeed;}
	// animate logs
	if (log1XPos >= 395) {log1XPos = -116;}
	else {log1XPos += logSpeed;}
	if (log2XPos >= 395) {log2XPos = -116;}
	else {log2XPos += logSpeed;}
	if (log3XPos >= 395) {log3XPos = -116;}
	else {log3XPos += logSpeed;}
	if (log4XPos >= 395) {log4XPos = -116;}
	else {log4XPos += logSpeed;}
	if (log5XPos >= 395) {log5XPos = -116;}
	else {log5XPos += logSpeed;}
}

// check if frog piece has collided with vehicle or is in water
function check_collide(){
	if (frogYPos > 277){		// if on lower part of board ['highway']
		check_cars();			// check if collided with cars
	}
	else {
		check_water();			// otherwise, check water
	}
}

function frog_dead(){
	ctx.drawImage(img3, 5, 3, 18, 24, frogXPos, frogYPos, 18, 24);
	numLives += -1;
	frogXPos = frogXStart;
	frogYPos = frogYStart;
}

// check if frog piece has collided with vehicle
function check_cars(){
	if ((frogXPos < car1AXPos + 24) && (frogXPos + 23 > car1AXPos) && (frogYPos < car1AYPos + 26) && (frogYPos + 18 > car1AYPos)){
		loseSound.play();
		frog_dead();
	}
	if ((frogXPos < car1BXPos + 24) && (frogXPos + 23 > car1BXPos) && (frogYPos < car1BYPos + 24) && (frogYPos + 18 > car1BYPos)){
		loseSound.play();
		frog_dead();
	}
	if ((frogXPos < car2AXPos + 48) && (frogXPos + 23 > car2AXPos) && (frogYPos < car2AYPos + 18) && (frogYPos + 18 > car2AYPos)){
		loseSound.play();
		frog_dead();
	}
	if ((frogXPos < car2BXPos + 28) && (frogXPos + 23 > car2BXPos) && (frogYPos < car2BYPos + 20) && (frogYPos + 18 > car2BYPos)){
		loseSound.play();
		frog_dead();
	}
	if ((frogXPos < car2CXPos + 48) && (frogXPos + 23 > car2CXPos) && (frogYPos < car2CYPos + 18) && (frogYPos + 18 > car2CYPos)){
		loseSound.play();
		frog_dead();
	}
	if ((frogXPos < car3AXPos + 28) && (frogXPos + 23 > car3AXPos) && (frogYPos < car3AYPos + 20) && (frogYPos + 18 > car3AYPos)){
		loseSound.play();
		frog_dead();
	}
	if ((frogXPos < car3BXPos + 23) && (frogXPos + 23 > car3BXPos) && (frogYPos < car3BYPos + 21) && (frogYPos + 18 > car3BYPos)){
		loseSound.play();
		frog_dead();
	}
	if ((frogXPos < car3CXPos + 28) && (frogXPos + 23 > car3CXPos) && (frogYPos < car3CYPos + 20) && (frogYPos + 18 > car3CYPos)){
		loseSound.play();
		frog_dead();
	}
	if ((frogXPos < car4AXPos + 48) && (frogXPos + 23 > car4AXPos) && (frogYPos < car4AYPos + 18) && (frogYPos + 18 > car4AYPos)){
		loseSound.play();
		frog_dead();
	}
	if ((frogXPos < car4BXPos + 28) && (frogXPos + 23 > car4BXPos) && (frogYPos < car4BYPos + 20) && (frogYPos + 18 > car4BYPos)){
		loseSound.play();
		frog_dead();
	}
	if ((frogXPos < car4CXPos + 48) && (frogXPos + 23 > car4CXPos) && (frogYPos < car4CYPos + 18) && (frogYPos + 18 > car4CYPos)){
		loseSound.play();
		frog_dead();
	}
	if ((frogXPos < car5AXPos + 24) && (frogXPos + 23 > car5AXPos) && (frogYPos < car5AYPos + 26) && (frogYPos + 18 > car5AYPos)){
		loseSound.play();
		frog_dead();
	}
	if ((frogXPos < car5BXPos + 24) && (frogXPos + 23 > car5BXPos) && (frogYPos < car5BYPos + 24) && (frogYPos + 18 > car5BYPos)){
		loseSound.play();
		frog_dead();
	}
}

function check_water(){
	if ((frogXPos < log1XPos + 90) && (frogXPos + 23 > log1XPos) && (frogYPos < log1YPos + 21) && (frogYPos + 18 > log1YPos)){
		frogXPos += logSpeed;
	}
	else if ((frogXPos < log2XPos + 90) && (frogXPos + 23 > log2XPos) && (frogYPos < log2YPos + 21) && (frogYPos + 18 > log2YPos)){
		frogXPos += logSpeed;
	}
	else if ((frogXPos < log3XPos + 90) && (frogXPos + 23 > log3XPos) && (frogYPos < log3YPos + 21) && (frogYPos + 18 > log3YPos)){
		frogXPos += logSpeed;
	}
	else if ((frogXPos < log4XPos + 90) && (frogXPos + 23 > log4XPos) && (frogYPos < log4YPos + 21) && (frogYPos + 18 > log4YPos)){
		frogXPos += logSpeed;
	}
	else if ((frogXPos < log5XPos + 90) && (frogXPos + 23 > log5XPos) && (frogYPos < log5YPos + 21) && (frogYPos + 18 > log5YPos)){
		frogXPos += logSpeed;
	}
	else {
		loseSound.play();
		frog_dead();
	}
}

function check_win(){
	if ((frogXPos < 42) && (frogXPos + 23 > 15) && (frogYPos < 102) && (frogYPos + 18 > 75)){
		winSound.play();
		numWon += 1;
		score_win();
		frogXPos = frogXStart;
		frogYPos = frogYStart;
	}
	else if ((frogXPos < 128) && (frogXPos + 23 > 101) && (frogYPos < 102) && (frogYPos + 18 > 75)){
		winSound.play();
		numWon += 1;
		score_win();
		frogXPos = frogXStart;
		frogYPos = frogYStart;
	}
	else if ((frogXPos < 213) && (frogXPos + 23 > 186) && (frogYPos < 102) && (frogYPos + 18 > 75)){
		winSound.play();
		numWon += 1;
		score_win();
		frogXPos = frogXStart;
		frogYPos = frogYStart;
	}
	else if ((frogXPos < 297) && (frogXPos + 23 > 270) && (frogYPos < 102) && (frogYPos + 18 > 75)){
		winSound.play();
		numWon += 1;
		score_win();
		frogXPos = frogXStart;
		frogYPos = frogYStart;
	}
	else if ((frogXPos < 382) && (frogXPos + 23 > 355) && (frogYPos < 102) && (frogYPos + 18 > 75)){
		winSound.play();
		numWon += 1;
		score_win();
		frogXPos = frogXStart;
		frogYPos = frogYStart;
	}
}

// after frog piece makes it to lily pad, updates score
function score_win(){
	if (numWon % 5 == 0){		// if fifth frog to make it, +1000
		score += 1000;
		level += 1;
		carSpeed += 3;
		logSpeed += 3;
	}
	else {						// otherwise, +50
		score += 50;
	}
}