

//Function for detecting collision.
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

// Enemies our player must avoid
var Enemy = function(y) {
    this.sprite = 'images/enemy-bug.png';
    this.x = -100;
    this.y = y;
    this.w = 70;
    this.h = 70;
    this.speed = Math.floor(Math.random() * 300) + 50;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    window.requestAnimationFrame(Enemy.prototype.update);

    this.x += this.speed * dt;

    if (this.x > 600) {
        this.x = -100;
    };

    //Collision
    if (checkCollision(this, level.player)) {
        level.player.resetPlayer();
        level.player.loseLife();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Establishing water block locations for collision.
var WaterBlock = function(x, y) {
    this.x = x;
    this.y = y;
    this.w = 101;
    this.h = 83;
};

// Check if player has stepped into a water block.
WaterBlock.prototype.update = function(dt) {
    if (checkCollision(this, level.player)) {
        level.player.resetPlayer();
        level.player.loseLife();
    }
}

// Makes an array of x, y coordinates for water block locations.
WaterBlock.prototype.instantiate = function(coords) {
    level.water = [];

}

// This class defines the player object and holds game data.
var Player = function(x, y) {
    this.sprite = 'images/char-boy.png';
    this.x = x;
    this.y = y;
    this.w = 50;
    this.h = 70;
    this.lives = 3;
    this.score = 0;
};

// Update the player's position.
Player.prototype.update = function() {
    window.requestAnimationFrame(Player.prototype.update);
};

// Draw the player on the screen.
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Move the player on key press
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

// Subtracts a life from player
Player.prototype.loseLife = function() {
    this.lives -= 1;
}

// Puts player back at beginning.
Player.prototype.resetPlayer = function(){
    this.x = 202;
    this.y = 375;
}

// Class for UI buttons.
var Button = function(x, y, w, h, text) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.text = text;
}

// Defines the style of buttons.
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

// Star collectible class
var Star = function (x, y) {
    this.sprite = 'images/star.png';
    this.x = x;
    this.y = y;
    this.w = 50;
    this.h = 40;
    this.collected = false;
}

// Draw the star on the canvas
Star.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Enable collection of star.
// Player gains points and the star moves off screen.
Star.prototype.update = function() {
    window.requestAnimationFrame(Star.prototype.update);

    if (checkCollision(this, level.player)) {
        level.player.score += 300;
        this.x = -100;
        this.y = -100;
        this.collected = true;
    }
}

var Level = function() {
    this.cells = {
        'water': 'images/water-block.png',
        'grass': 'images/grass-block.png',
        'stone': 'images/stone-block.png',
        'h': 83,
        'w': 101
    };
        // Build Level 1.
    this.numRows = 6;
    this.numCols = 5;

    var s = this.cells.stone,
        w = this.cells.water,
        g = this.cells.grass;

    this.map = [
        [w, w, w, w, w],
        [s, s, s, s, s],
        [s, s, s, s, s],
        [s, s, s, s, s],
        [g, g, g, g, g],
        [g, g, g, g, g]
    ];

    this.enemies = [new Enemy(50), new Enemy(135), new Enemy(220)];
    this.player = new Player(202, 375);
    this.star = new Star(202, 50);
    this.water = [];
}

Level.prototype.render = function() {
    var row, col,
        waterCoords = [];

    for (row = 0; row < this.numRows; row++) {
        for (col= 0; col < this.numCols; col++) {
            var cellX = col * this.cells.w;
            var cellY = row * this.cells.h;
            var cellCoords = [cellX, cellY - this.cells.h];
            ctx.drawImage(Resources.get(this.map[row][col]), cellX, cellY);

            // Track coordinates of water blocks for collision.
            if (this.map[row][col] == this.cells.water &&
              checkIfIn(waterCoords, cellCoords) === false) {
                waterCoords.push(cellCoords);
            };
        };
    };

    if (this.water.length < waterCoords.length) {
        for (i = 0; i < waterCoords.length; i++) {
            this.water.push(new WaterBlock(waterCoords[i][0], waterCoords[i][1]));
        };
    };
}

function level2() {
    var level2 = new Level();
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
    level2.star = new Star (202, 50);
    level2.water = [];

    level2.player.x = 202;
    level2.player.y = 375;

    return level2;
}

/* Level2.prototype.render = function() {
    var row, col,
        waterCoords = [];
    for (row = 0; row < this.numRows; row++) {
        for (col= 0; col < this.numCols; col++) {
            var cellX = col * this.cells.w;
            var cellY = row * this.cells.h;
            var cellCoords = [cellX, cellY - this.cells.h];
            ctx.drawImage(Resources.get(this.map[row][col]), cellX, cellY);

            // Track coordinates of water blocks for collision.
            if (this.map[row][col] == this.cells.water &&
              checkIfIn(waterCoords, cellCoords) === false) {
                waterCoords.push(cellCoords);
            };
        };
    };

    if (this.water.length < waterCoords.length) {
        for (i = 0; i < waterCoords.length; i++) {
            this.water.push(new WaterBlock(waterCoords[i][0], waterCoords[i][1]));
        };
    };
}
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
/*
// Instantiating water objects
var water = [new WaterBlock(0, 0)];

// Instantiating player and enemies.
var allEnemies = [new Enemy(50), new Enemy(135), new Enemy(220)];
var player = new Player(202, 375);

// Instantiating collectibles
var star = new Star (202, 50);

*/
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
