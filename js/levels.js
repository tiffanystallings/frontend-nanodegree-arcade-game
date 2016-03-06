var splashScreen = function() {


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

