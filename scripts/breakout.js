Breakout.main = (function (graphics, input) {

	let CANVASWIDTH = 1000;
	let CANVASHEIGHT = 750;
	let x = CANVASWIDTH / 2;
	let y = CANVASHEIGHT - 75 //CANVASHEIGHT is the floor, -50 is the starting position of the bat.
	let brickAndGap = ((CANVASWIDTH - (15 * 5)) / 14) + 5;
	let dx = 0;
	let dy = 0;
	let dr = 0.20;
	let brickCount = 0;
	let knuckleBall = false;
	let points = 0;
	let bats = 3;

	let lastTimeStamp = performance.now();
	let keyboard = input.Keyboard();

	var gameBall = graphics.Baseball({
		imageSrc: 'images/baseball.png',
		center: { x: x, y: y },
		width: 25,
		height: 25,
		radius: 13,
		rotation: 0,
		moveRate: 400
	});

	var gameBat = graphics.Bat({
		imageSrc: 'images/bat.png',
		center: { x: x, y: y + 25 },
		width: 150,
		height: 16,
		rotation: 0,
		moveRate: 500,
	});

	var gameBricks = graphics.Bricks();

	graphics.drawBackground();
	
	gameBall.init(dr);

	function processInput(elapsedTime) {
		keyboard.processInput(elapsedTime);
	}

	function calculateBallCollisions() {

		// Left and right walls
		if (x + dx > CANVASWIDTH - 13 || x + dx < 13) {
			dx = -dx;
			dr = -dr;
		}

		// Ceiling
		if (y + dy < 13) {
			dy = -dy;
			dr = -dr;
		}

		// Bat and floor
		if (y + dy > CANVASHEIGHT - 63) {

			if (x + dx > gameBat.leftEdge() && x + dx < gameBat.rightEdge()) { //bat
				dy = -dy;
				dx = 15 * ((gameBall.getCenter().x - gameBat.getCenter()) / (gameBat.getWidth() / 2));			
				dr = -dr
			} else { //floor
				dy = 0;
				dx = 0;
				brickCount = 0;
				updateBallSpeed();
				knuckleBall = true;
				return;
			}

			//for testing: uncomment to have the ball continue when hitting the floor
			// dy = -dy*1.0025;
			// dx = dx*1.025
			// dr = -dr
		}

		//bricks
		if (brickCollision(x, y)) {
			dy = -dy;
			dx = -dx;
		}

		x += dx;
		y += dy;
	}

	function brickCollision(x, y) {
		var bTp = y + dy - 13;
		var bBt = y + dy + 13;
		var bLt = x + dx - 13;
		var bRt = x + dx + 13;

		if (bTp > 295 || bBt < 100) { return false; }

		var indexRow = calculateRow(bTp, bBt);
		var indexCol = calculateCol(bLt, bRt);

		if (isNaN(indexRow) || isNaN(indexCol)) {
			return false;
		}

		var index = indexRow + indexCol;

		var brick = gameBricks.getBrick(index);

		if (brick.doesExist()) {
			addPoints(brick.getPoints());
			brick.update(false);
			brickCount++;
			updateBallSpeed();
			return true;
		}

		return false;
	}

	function calculateRow(bTp, bBt) {
		if (bTp < 295 && bTp > 275 || bBt < 295 && bBt > 275) { return 98; }
		if (bTp < 270 && bTp > 250 || bBt < 270 && bBt > 250) { return 84; }
		if (bTp < 245 && bTp > 225 || bBt < 245 && bBt > 225) { return 70; }
		if (bTp < 220 && bTp > 200 || bBt < 220 && bBt > 200) { return 56; }
		if (bTp < 195 && bTp > 175 || bBt < 195 && bBt > 175) { return 42; }
		if (bTp < 170 && bTp > 150 || bBt < 170 && bBt > 150) { return 28; }
		if (bTp < 145 && bTp > 125 || bBt < 145 && bBt > 125) { return 14; }
		if (bTp < 120 && bTp > 100 || bBt < 120 && bBt > 100) { return 0; }
		return NaN;
	}

	function calculateCol(bLt, bRt) {
		if (bRt > 5 && bRt < brickAndGap || bLt > 5 && bLt < brickAndGap) { return 0; }
		if (bRt > brickAndGap + 5 && bRt < 2 * brickAndGap || bLt > brickAndGap + 5 && bLt < 2 * brickAndGap) { return 1; }
		if (bRt > 2 * brickAndGap + 5 && bRt < 3 * brickAndGap || bLt > 2 * brickAndGap + 5 && bRt < 3 * brickAndGap) { return 2; }
		if (bRt > 3 * brickAndGap + 5 && bRt < 4 * brickAndGap || bLt > 3 * brickAndGap + 5 && bLt < 4 * brickAndGap) { return 3; }
		if (bRt > 4 * brickAndGap + 5 && bRt < 5 * brickAndGap || bLt > 4 * brickAndGap + 5 && bLt < 5 * brickAndGap) { return 4; }
		if (bRt > 5 * brickAndGap + 5 && bRt < 6 * brickAndGap || bLt > 5 * brickAndGap + 5 && bLt < 6 * brickAndGap) { return 5; }
		if (bRt > 6 * brickAndGap + 5 && bRt < 7 * brickAndGap || bLt > 6 * brickAndGap + 5 && bLt < 7 * brickAndGap) { return 6; }
		if (bRt > 7 * brickAndGap + 5 && bRt < 8 * brickAndGap || bLt > 7 * brickAndGap + 5 && bLt < 8 * brickAndGap) { return 7; }
		if (bRt > 8 * brickAndGap + 5 && bRt < 9 * brickAndGap || bLt > 8 * brickAndGap + 5 && bLt < 9 * brickAndGap) { return 8; }
		if (bRt > 9 * brickAndGap + 5 && bRt < 10 * brickAndGap || bLt > 9 * brickAndGap + 5 && bLt < 10 * brickAndGap) { return 9; }
		if (bRt > 10 * brickAndGap + 5 && bRt < 11 * brickAndGap || bLt > 10 * brickAndGap + 5 && bLt < 11 * brickAndGap) { return 10; }
		if (bRt > 11 * brickAndGap + 5 && bRt < 12 * brickAndGap || bLt > 11 * brickAndGap + 5 && bLt < 12 * brickAndGap) { return 11; }
		if (bRt > 12 * brickAndGap + 5 && bRt < 13 * brickAndGap || bLt > 12 * brickAndGap + 5 && bLt < 13 * brickAndGap) { return 12; }
		if (bRt > 13 * brickAndGap + 5 && bRt < 14 * brickAndGap || bLt > 13 * brickAndGap + 5 && bLt < 14 * brickAndGap) { return 13; }
		return NaN;
	}

	function addPoints(pts) {
		points += pts;
	}

	function updateBallSpeed() {
		if (brickCount < 4) { dx *= 1.00; dy *= 1.00; }
		if (brickCount == 4) { dx *= 1.25; dy *= 1.25; }
		if (brickCount == 12) { dx *= 1.50; dy *= 1.50; }
		if (brickCount == 36) { dx *= 1.75; dy *= 1.75; }
		if (brickCount == 62) { dx *= 2.00; dy *= 2.00; }
	}

	function drawGameOver(){
		graphics.setLargeTextProps();
		graphics.drawText("Game Over :(", 141, 350);
	}
	
	function go() {		
		if(bats < 1 || Math.abs(dx) > 0 || Math.abs(dy) > 0){ 
			drawGameOver();	
			return;
		 }
		
		graphics.setCountdownTextProps();
		graphics.drawText("3", 250, 200);
		setTimeout(function () { graphics.drawText("2", 500, 200); }, 1000);
		setTimeout(function () { graphics.drawText("1", 750, 200); }, 2000);
		setTimeout(function () { graphics.setLargeTextProps(); }, 2999);
		setTimeout(function () { graphics.drawText("Go!", 405, 500); }, 3000);
		setTimeout(function () { graphics.clearTopLayer(); }, 3300);
		setTimeout(function (){
			if (knuckleBall) {
				graphics.drawPaddles(--bats);
				dx = -dx;
				dy = -dy;
				knuckleBall = false;				
			}
			dx = 7;
			dy = -5;
		}, 3300);
	}

	function update(elapsedTime) {
		calculateBallCollisions();
		gameBall.update(dx, dy, dr, elapsedTime);
		
	}

	function render() {
		graphics.clear();
		graphics.drawPaddles(bats);
		graphics.drawScore(points);
		gameBall.draw();
		gameBat.draw();
		gameBricks.draw();
	}

	function breakoutLoop(currentTime) {

		let elapsedTime = currentTime - lastTimeStamp;
		lastTimeStamp = currentTime;
		if (!knuckleBall) {
			processInput(elapsedTime);
			update(elapsedTime);
			render();
		} else {
			processInput(elapsedTime);
		}

		requestAnimationFrame(breakoutLoop);
	};

	keyboard.registerCommand(KeyEvent.DOM_VK_A, gameBat.moveLeft);
	keyboard.registerCommand(KeyEvent.DOM_VK_LEFT, gameBat.moveLeft);
	keyboard.registerCommand(KeyEvent.DOM_VK_D, gameBat.moveRight);
	keyboard.registerCommand(KeyEvent.DOM_VK_RIGHT, gameBat.moveRight);
	keyboard.registerCommand(KeyEvent.DOM_VK_SPACE, go);

	console.log('Breakout!');
	requestAnimationFrame(breakoutLoop);

}(Breakout.graphics, Breakout.input));