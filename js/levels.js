var splashScreen = function() {
	ctx.fillStyle = "#000";
	ctx.fillRect(0,0, canvas.width, canvas.height)

	button = new Button(canvas.width/2-150, canvas.height/2-50,
		300, 100)

	button.draw();
}

var Button = function(x, y, w, h) {
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;
	this.hover = false;
	this.clicked = false;
}

Button.prototype.update = function() {

}

Button.prototype.draw = function() {
	ctx.fillStyle = "#4e66d2";
	ctx.fillRect(button.x, button.y, button.w, button.h);
}

