/**
 * @description Renders the HUD for the player to track lives and score
 */
function ui() {
    heartImage = Resources.get('images/Heart.png');
    ctx.drawImage(heartImage, 0, 35, heartImage.width * 0.5, heartImage.height * 0.5);

    ctx.font = '36pt Impact';
    ctx.fillStyle = '#fff';
    ctx.textBaseline = 'hanging';
    ctx.fillText('x' + level.player.lives, 100, 65);

    ctx.textAlign = 'right';
    ctx.fillText(level.player.score, 500, 65);
}

/**
 * @description Creates a 'Play!' button
 * @returns The rendered button
 */
function playButton() {
    var button = new Button(canvas.width/2-150, canvas.height/2-50,
        300, 100, 'Play!');
    button.draw();
    return button;
}

/**
 * @description Creates a 'Retry' button
 * @returns The rendered button
 */
function retryButton() {
    var button = new Button(canvas.width/2-150, canvas.height/2-50,
        300, 100, 'Retry');
    button.draw();
    return button;
}

/**
 * @description Creates a 'Replay' button
 * @returns The rendered button
 */
function replayButton() {
    var button = new Button(canvas.width/2-150, canvas.height/2-50,
        300, 100, 'Replay');
    button.draw();
    return button;
}

/**
 * @description Creates a 'Next Level' button
 * @returns The rendered button
 */
function nextLevelButton() {
    var button = new Button(canvas.width/2-150, canvas.height/2-50,
        300, 100, 'Next Level');
    button.draw();
    return button;
}

/**
 * @description Renders a background for splash screens
 */
function background() {
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
}