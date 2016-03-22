//Class Definitions

/**
 * @description Defines enemies for the player to avoid
 * @constructor
 * @param {number} y - The y position of the enemy
 */
var Enemy = function(y) {
    this.sprite = 'images/enemy-bug.png';
    this.x = -100;
    this.y = y;
    this.w = 70;
    this.h = 70;
    this.speed = Math.floor(Math.random() * 300) + 50;
};

/**
 * @description Moves enemies and checks player collision
 * @param {number} dt - Delta time
 */
Enemy.prototype.update = function(dt) {
    // Animation
    window.requestAnimationFrame(Enemy.prototype.update);

    this.x += this.speed * dt;

    if (this.x > 600) {
        this.x = -100;
    };

    // Collision
    if (checkCollision(this, level.player)) {
        level.player.resetPlayer(202, 375);
        level.player.loseLife();
    }
};

/**
 * @description Draw the enemy on the screen
 */
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/**
 * @description Defines water blocks for the player to avoid
 * @constructor
 * @param {number} x
 * @param {number} y
 */
var WaterBlock = function(x, y) {
    this.x = x;
    this.y = y + 43;
    this.w = 101;
    this.h = 43;
};

/**
 * @description Checks player collision with water
 * @param {number} dt
 */
WaterBlock.prototype.update = function(dt) {
    if (checkCollision(this, level.player)) {
        level.player.resetPlayer(202, 375);
        level.player.loseLife();
    }
}

/**
 * @description Defines player object and holds game data
 * @constructor
 * @param {number} x
 * @param {number} y
 */
var Player = function(x, y) {
    this.sprite = 'images/char-boy.png';
    this.x = x;
    this.y = y;
    this.w = 50;
    this.h = 70;
    this.lives = 3;
    this.score = 0;
};

/**
 * @description Animates player movement
 */
Player.prototype.update = function() {
    window.requestAnimationFrame(Player.prototype.update);
};

/**
 * @description Draw the player on the screen
 */
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/**
 * @description Move player on key press
 * @param {string} key
 */
Player.prototype.handleInput = function(key) {
    if (key == 'left') {
        if (this.x - 100 > 0) {
            this.x -= 100
        }
    }
    else if (key == 'up') {
        if (this.y - 85 > -100) {
            this.y -= 85
        }
    }
    else if (key == 'right') {
        if (this.x + 100 < 500) {
            this.x += 100;
        }
    }
    else if (key == 'down') {
        if (this.y + 85 < 400) {
            this.y += 85;
        }
    };
};

/**
 * @description Subtracts a life from the player
 */
Player.prototype.loseLife = function() {
    this.lives -= 1;
}

/**
 * @description Resets player to start position
 * @param {number} x
 * @param {number} y
 */
Player.prototype.resetPlayer = function(x, y){
    this.x = x;
    this.y = y;
}

/**
 * @description Draw a button on the screen
 * @constructor
 * @param {number} x
 * @param {number} y
 * @param {number} w - Width
 * @param {number} h - Height
 * @param {string} text - Button text
 */
var Button = function(x, y, w, h, text) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.text = text;
}

/**
 * @description Styles and draws buttons
 */
Button.prototype.draw = function() {
    ctx.fillStyle = '#4e66d2';
    ctx.strokeStyle = '#fff'
    ctx.lineWidth = 5;
    ctx.fillRect(this.x, this.y, this.w, this.h);
    ctx.strokeRect(this.x, this.y, this.w, this.h);

    ctx.font = '36pt Impact';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#fff';
    ctx.fillText(this.text, this.x + this.w/2,
        this.y + this.h/2);
}

/**
 * @description Defines a collectible star
 * @constructor
 * @param {number} x
 * @param {number} y
 */
var Star = function (x, y) {
    this.sprite = 'images/Star.png';
    this.x = x;
    this.y = y;
    this.w = 50;
    this.h = 40;
    this.collected = false;
}

/**
 * @description Draws star on the canvas
 */
Star.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

/**
 * @description Player collects star and gains points
 */
Star.prototype.update = function() {
    window.requestAnimationFrame(Star.prototype.update);

    if (checkCollision(this, level.player)) {
        level.player.score += 300;
        this.x = -100;
        this.y = -100;
        this.collected = true;
    }
}

/**
 * @description Defines a collectible gem
 * @constructor
 * @param {string} color - The color of the gem to be rendered
 * @param {number} x
 * @param {number} y
 */
var Gem = function (color, x, y) {
    this.x = x;
    this.y = y;
    this.w = 50;
    this.h = 40;

    if (color == 'orange') {
        this.sprite = 'images/gem-orange.png';
        this.points = 50;
    }
    else if (color == 'blue') {
        this.sprite = 'images/gem-blue.png';
        this.points = 100;
    }
    else {
        this.sprite = 'images/gem-green.png';
        this.points = 200;
    }
}

/**
 * @description Renders the gem on the game level
 */
Gem.prototype.render = function() {
    var sprite = Resources.get(this.sprite);
    spriteWidth = sprite.width * 0.5;
    spriteHeight = sprite.height * 0.5;
    ctx.drawImage(sprite, this.x + 8, this.y + 83, spriteWidth, spriteHeight);
}

/**
 * @description Checks if gem has been collected and credits player
 */
Gem.prototype.update = function() {
    window.requestAnimationFrame(Gem.prototype.update);

    if (checkCollision(this, level.player)) {
        level.player.score += this.points;
        this.x = -100;
        this.y = -100;
    }
}

/**
 * @description Defines first game level
 * @constructor
 */
var Level = function() {
    this.id = 1;
    this.cells = {
        'water': 'images/water-block.png',
        'grass': 'images/grass-block.png',
        'stone': 'images/stone-block.png',
        'h': 83,
        'w': 101
    };
    this.numRows = 6;
    this.numCols = 5;

    // Creates short calls for blocks
    var s = this.cells.stone,
        w = this.cells.water,
        g = this.cells.grass;

    // ... and uses them to draw the map
    this.map = [
        [w, w, w, w, w],
        [s, s, s, s, s],
        [s, s, s, s, s],
        [s, s, s, s, s],
        [g, g, g, g, g],
        [g, g, g, g, g]
    ];

    // Instantiate objects
    this.enemies = [new Enemy(50), new Enemy(135), new Enemy(220)];
    this.player = new Player(202, 375);
    this.star = new Star(202, 50);
    this.water = [];
    this.gems = [new Gem('orange', 220, 202)]
}

/**
 * @description Parses the map and renders the level
 */
Level.prototype.render = function() {
    var row, col,
        waterCoords = [];

    for (row = 0; row < this.numRows; row++) {
        for (col= 0; col < this.numCols; col++) {
            var cellX = col * this.cells.w;
            var cellY = row * this.cells.h;
            var cellCoords = [cellX, cellY - this.cells.h];
            ctx.drawImage(Resources.get(this.map[row][col]), cellX, cellY);

            // Track coordinates of water blocks for collision
            if (this.map[row][col] == this.cells.water &&
              checkIfIn(waterCoords, cellCoords) === false) {
                waterCoords.push(cellCoords);
            };
        };
    };

    // Pushes water coordinates to the level object
    if (this.water.length < waterCoords.length) {
        for (i = 0; i < waterCoords.length; i++) {
            this.water.push(new WaterBlock(waterCoords[i][0], waterCoords[i][1]));
        };
    };
}

/**
 * @description Creates the second game level based on the Level class
 */

function level2() {
    var level2 = new Level();
    level2.id = 2;
    var s = level2.cells.stone,
        w = level2.cells.water,
        g = level2.cells.grass;

    level2.map = [
        [g, g, g, g, g],
        [s, s, s, s, s],
        [w, w, s, w, w],
        [s, s, s, s, s],
        [s, s, s, s, s],
        [g, g, g, g, g]
    ];
    level2.enemies = [new Enemy(50), new Enemy(220), new Enemy(300)];
    level2.player = level.player;
    level2.star = new Star (404, 50);
    level2.water = [];
    level2.gems = [new Gem('orange', 320, 195), new Gem('blue', 120, -45)];

    level2.player.x = 202;
    level2.player.y = 375;

    return level2;
}

/**
 * @description Creates the third level
 */
function level3() {
    var level3 = new Level();
    level3.id = 3;
    var s = level3.cells.stone,
        w = level3.cells.water,
        g = level3.cells.grass;

    level3.map = [
        [w, w, g, w, w],
        [s, s, s, s, s],
        [s, s, s, s, s],
        [s, s, s, s, s],
        [w, g, g, g, w],
        [w, w, g, w, w]
    ];
    level3.enemies = [new Enemy(50), new Enemy(135), new Enemy(220)];
    level3.player = level.player;
    level3.star = new Star (202, -10);
    level3.water = [];
    level3.gems = [new Gem('orange', 320, 195), new Gem('blue', 220, 110), new Gem('green', 120, 25)];

    level3.player.x = 202;
    level3.player.y = 375;

    return level3;
}

//Helper functions

/**
 * @description Checks for collision of two game objects
 * @param {object} obj1
 * @param {object} obj2
 */
function checkCollision(obj1, obj2) {
    if (obj1.x < obj2.x + obj2.w &&
        obj1.x + obj1.w > obj2.x &&
        obj1.y < obj2.y + obj2.h &&
        obj1.h + obj1.y > obj2.y) {
        return true;
    }
    else {
        return false;
    }
}

/**
 * @description Iterates over an array in search of a specified value
 * @param {array} array - The array being checked
 * @param {number} value - The value to search for
 */
function checkIfIn(array, value) {
    var count = 0;
    for (var i = 0; i < array.length; i++) {
        if (array[i][0] == value[0] && array[i][1] == value[1]) {
            count ++;
        }
    };
    if (count === 0) {
        return false;
    } else {
        return true;
    }
}

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    level.player.handleInput(allowedKeys[e.keyCode]);
});
