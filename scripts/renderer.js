// ------------------------------------------------------------------
// This is the graphics object.  The various rendering components
// are located here.
// ------------------------------------------------------------------
Breakout.graphics = (function () {
	'use strict';

	let canvasBackground = document.getElementById('canvas-background');
	let backgroundContext = canvasBackground.getContext('2d');
	let canvas = document.getElementById('canvas-main');
	let context = canvas.getContext('2d');
	let topLayer = document.getElementById('canvas-topLayer');
	let topContext = topLayer.getContext('2d');
	let paddles = document.getElementById('paddles');
	let paddleImage = new Image();
	paddleImage.src = 'images/bat.png';

	function drawBackground() {
		backgroundContext.clearRect(0, 0, canvasBackground.width, canvasBackground.height);
		var img = new Image();
		img.src = 'images/Safeco.png';
		img.addEventListener('load', function () {
			backgroundContext.drawImage(img, 0, 0);
		}, false);
	}

	function drawPaddles(count) {
		for (var i = 0; i < count; i++){
			context.save();	
			context.drawImage(
				paddleImage,
				i*(75) +10*(i+1),
				740,
				75,
				8
				);

			context.restore();
		}	
	}

	function setCountdownTextProps(){		
		topContext.font = '45px Roboto';
		topContext.fillStyle = "rgba(0, 0, 0, 0.25)";
		topContext.fillRect(0, 0, canvas.width, canvas.height);
		topContext.fillStyle = '#00d0d0';				
	}

	function setScoreTextProps(){
		context.font = '15px Roboto';
		context.fillStyle = '#00d0d0';
	}

	function setLargeTextProps(){
		topContext.font = '125px Roboto';
		topContext.fillStyle = "rgba(0, 0, 0, 0.25)";
		topContext.fillRect(0, 0, canvas.width, canvas.height);
		topContext.fillStyle = '#00d0d0';	
	}
       
	function drawText(text, x, y){
		topContext.fillText(text, x, y);
		
		// This was used to set the correct x coordinate for text.
		// For no conceivable reason text is drawn from the x: left y: bottom
		// or x: left y:middle of the character/string
		//console.log(topContext.measureText(text));
	}

	function drawScore(score){
		setScoreTextProps();
		var scoreText = 'Score: ' + score;
		var textWidth = context.measureText(scoreText).width + 10;
		context.fillText(scoreText, canvas.width - textWidth , canvas.height - 10);
	}

	//------------------------------------------------------------------
	// Public function that allows the client code to clear the canvas.
	//------------------------------------------------------------------
	function clear() {
		context.save();
		context.setTransform(1, 0, 0, 1, 0, 0);
		context.clearRect(0, 0, canvas.width, canvas.height);
		context.restore();
	}

	function clearTopLayer() {
		topContext.save();
		topContext.setTransform(1, 0, 0, 1, 0, 0);
		topContext.clearRect(0, 0, canvas.width, canvas.height);
		topContext.restore();
	}

	/********** Baseball **********/
	function Baseball(spec) {
		var that = {},
			ready = false,
			image = new Image();
		var center = {
			x: spec.center.x,
			y: spec.center.y
		};

		image.onload = function () {
			ready = true;
		};

		image.src = spec.imageSrc;

		that.update = function (dx, dy, rotationAngle, elapsedTime) {
			spec.center.x += dx;
			spec.center.y += dy;
			spec.rotation += rotationAngle;
		};

		that.init = function (rotationAngle) {
			spec.center.x += (spec.moveRate / 1000);
			spec.center.y -= (spec.moveRate / 1000);
			spec.rotation += rotationAngle;
		};

		that.getCenter = function () {
			return center;
		};

		that.reset = function () {
			spec.center.x = canvas.width / 2 + 25;
			spec.center.y = canvas.height - 50;
			spec.rotation = 0;
		};

		that.getRate = function () {
			return spec.moveRate;
		};

		that.draw = function () {
			if (ready) {
				context.save();

				context.translate(spec.center.x, spec.center.y);
				context.rotate(spec.rotation);
				context.translate(-spec.center.x, -spec.center.y);

				context.drawImage(
					image,
					spec.center.x - spec.width / 2,
					spec.center.y - spec.height / 2,
					spec.width, spec.height);

				context.restore();
			}
		};

		return that;
	}

	/**********    Bat   **********/
	function Bat(spec) {
		var that = {},
			ready = false,
			image = new Image();

		image.onload = function () {
			ready = true;
		};

		image.src = spec.imageSrc;

		that.update = function (dx, dy, rotationAngle) {
			spec.center.x += dx;
			spec.center.y += dy;
			spec.rotation += rotationAngle;
		};


		that.reset = function () {
			spec.center.x = canvas.width / 2;
			spec.center.y = canvas.height - 25;
		};


		that.draw = function () {
			if (ready) {
				context.save();

				context.translate(spec.center.x, spec.center.y);
				context.rotate(spec.rotation);
				context.translate(-spec.center.x, -spec.center.y);

				context.drawImage(
					image,
					spec.center.x - spec.width / 2,
					spec.center.y - spec.height / 2,
					spec.width, spec.height);

				context.restore();
			}
		};

		that.getCenter = function () {
			return spec.center.x;
		};

		that.leftEdge = function () {
			return spec.center.x - spec.width / 2;
		};

		that.rightEdge = function () {
			return spec.center.x + spec.width / 2;
		};

		that.getWidth = function () {
			return spec.width;
		};

		that.moveLeft = function (elapsedTime) {
			if ((spec.center.x - (spec.width / 2)) > 0) {
				spec.center.x -= (spec.moveRate / 1000) * elapsedTime;
			}
		};

		that.moveRight = function (elapsedTime) {
			if ((spec.center.x + (spec.width / 2)) < 1000) {
				spec.center.x += (spec.moveRate / 1000) * elapsedTime;
			}
		};

		return that;
	}

	/**********  Brick  **********/
	function Brick(spec) {
		var that = {};
		var pointValue = spec.pointValue;
		var exists = spec.exists;
		var center = {
			x: spec.x,
			y: spec.y
		};
		var width = spec.width;
		var height = spec.height;

		that.getPoints = function () {
			return pointValue;
		};

		that.doesExist = function () {
			return exists;
		};

		that.draw = function () {
			context.save();
			context.linewidth = 5;
			context.translate(spec.x + spec.width / 2, spec.y + spec.height / 2);
			context.translate(-(spec.x + spec.width / 2), -(spec.y + spec.height / 2));

			if (exists) {
				context.fillStyle = spec.fill;
			} else {
				context.fillStyle = 'rgba(0, 0, 0, 0)';
			}

			context.fillRect(spec.x, spec.y, spec.width, spec.height);

			context.strokeStyle = spec.stroke;
			context.strokeRect(spec.x, spec.y, spec.width, spec.height);

			context.restore();
		};

		that.update = function (spec) {
			exists = spec.exists;
		}

		that.getCenter = function () {
			return center;
		}

		that.getHeight = function () {
			return height;
		}

		that.getWidth = function () {
			return width;
		}
		return that;
	}

	/********** Bricks  **********/
	function Bricks() {
		var that = {};
		var gap = 5;
		var brickWidth = (canvas.width - (15 * gap)) / 14;
		var brickHeight = 20
		var brickArr = [];
		var indexList = [];

		that.getBrick = function (index) {
			return brickArr[index];
		}
		var count = 0;
		for (var i = 0; i < 8; i++) {
			for (var j = 0; j < 14; j++) {
				indexList.push(count++);
				if (i == 0 || i == 1) { //green
					brickArr.push(Brick({
						exists: true,
						x: j * (brickWidth + gap) + gap, y: i * (brickHeight + gap) + 100, width: brickWidth, height: brickHeight,
						fill: 'rgba(0, 225, 0, 1)',
						stroke: 'rgba(0, 0, 0, 0)',
						pointValue: 5
					}));
				}

				if (i == 2 || i == 3) { //blue
					brickArr.push(Brick({
						exists: true,
						x: j * (brickWidth + gap) + gap, y: i * (brickHeight + gap) + 100, width: brickWidth, height: brickHeight,
						fill: 'rgba(0, 0, 225, 1)',
						stroke: 'rgba(0, 0, 0, 0)',
						pointValue: 3
					}));
				}

				if (i == 4 || i == 5) { //orange
					brickArr.push(Brick({
						exists: true,
						x: j * (brickWidth + gap) + gap, y: i * (brickHeight + gap) + 100, width: brickWidth, height: brickHeight,
						fill: 'rgba(225, 140, 0, 1)',
						stroke: 'rgba(225, 0, 0, 0)',
						pointValue: 2
					}));
				}

				if (i == 6 || i == 7) { //yellow
					brickArr.push(Brick({
						exists: true,
						x: j * (brickWidth + gap) + gap, y: i * (brickHeight + gap) + 100, width: brickWidth, height: brickHeight,
						fill: 'rgba(225, 225, 0, 1)',
						stroke: 'rgba(0, 0, 0, 0)',
						pointValue: 1
					}));
				}
			}
		}

		that.draw = function () {
			for (var i = 0; i < brickArr.length; i++) {
				brickArr[i].draw();
			}
		};

		that.indexExists = function (index) {
			return indexList[index];
		}

		that.setFalse = function (index) {
			indexList[index] = 0;
		}

		that.update = function (index) {
			for (var i = 0; i < brickArr.length; i++) {
				brickArr[i].update();
			}
		};

		return that;
	}

	return {
		drawBackground: drawBackground,
		drawPaddles: drawPaddles,
		drawScore: drawScore,
		setCountdownTextProps: setCountdownTextProps,
		setLargeTextProps: setLargeTextProps,
		drawText: drawText,
		clearTopLayer: clearTopLayer,
		clear: clear,
		Baseball: Baseball,
		Bat: Bat,
		Bricks: Bricks
	};

}());
