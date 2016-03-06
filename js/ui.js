var UI = function() {
	heartImage = Resources.get('images/heart.png');
	ctx.drawImage(heartImage, 0, 35, heartImage.width * 0.5, heartImage.height * 0.5);

	ctx.font = '36pt Impact';
	ctx.fillStyle = '#fff';
	ctx.textBaseline = 'hanging';
	ctx.fillText('x'+player.lives, 75, 65);
}