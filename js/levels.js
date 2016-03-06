var splashScreen = function() {
	//Set up background animation.
	var cells = {
         'grass': 'images/grass-block.png',
         'stone': 'images/stone-block.png',
         'h': 83,
         'w': 101
    	},
    	background = [
    		cells.grass,
    		cells.grass,
    		cells.stone,
    		cells.stone,
    		cells.grass,
    		cells.grass],

 		numRows = 6,
 		numCols = 5,
    	row, col;

    for (row = 0; row < numRows; row++) {
    	for (col = 0; col < numCols; col++) {
    		ctx.drawImage(Resources.get(background[row]),
    			col * cells.w, row * cells.h);
    	}
    }

	//Define and draw the start button.
	button = new Button(canvas.width/2-150, canvas.height/2-50,
		300, 100, 'Play!')
	button.draw();

	//Check if start button has been clicked.
	document.addEventListener('click', function(e) {
		var clickObj = {
			'x': e.offsetX,
			'y': e.offsetY,
			'h': 3,
			'w': 3
		};

		if (checkCollision(button, clickObj)) {
			button.clicked();
		}
	});
}

var Button = function(x, y, w, h, text) {
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;
	this.text = text;
}

// Initialized main on button click
Button.prototype.clicked = function() {;
	ctx.fillstyle = '#fff';
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	main();
}

Button.prototype.draw = function() {
	ctx.fillStyle = '#4e66d2';
	ctx.strokeStyle = '#fff'
	ctx.lineWidth = 5;
	ctx.fillRect(button.x, button.y, button.w, button.h);
	ctx.strokeRect(button.x, button.y, button.w, button.h);

	ctx.font = '36pt Impact';
	ctx.textAlign = 'center';
	ctx.textBaseline = 'middle';
	ctx.fillStyle = '#fff';
	ctx.fillText(button.text, button.x + button.w/2,
		button.y + button.h/2);
}

