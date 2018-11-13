image = new image();
		image.src = 'images/bat.png'

		for (var i = 1; i <= count; i++;) {
			context.save();	
			context.drawImage(
				image,
				i*(75) + 10,
				750 - 8,
				75,
				8
				);

			context.restore();
		}