var splashScreen = function() {
	ctx.fillStyle = "#000";
	ctx.fillRect(0,0, canvas.width, canvas.height)

	//Define and draw the start button.
	button = new Button(canvas.width/2-150, canvas.height/2-50,
		300, 100)
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

		else {
			button.draw();
		}
	});
}

var Button = function(x, y, w, h) {
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;
}

Button.prototype.clicked = function() {;
	ctx.fillstyle = '#fff';
	ctx.clearRect(0,0, canvas.width, canvas.height);
	main();
}

Button.prototype.draw = function() {
	ctx.fillStyle = '#4e66d2';
	ctx.fillRect(button.x, button.y, button.w, button.h);
}

