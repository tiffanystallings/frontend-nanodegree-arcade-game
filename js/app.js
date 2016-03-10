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
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
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
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    window.requestAnimationFrame(Enemy.prototype.update);

    this.x += this.speed * dt;

    if (this.x > 600) {
        this.x = -100;
    };

    //Collision
    if (checkCollision(this, player)) {
        player.resetPlayer();
        player.loseLife();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//Establishing water block locations for collision.
var WaterBlock = function(x, y) {
    this.x = x;
    this.y = y;
    this.w = 101;
    this.h = 83;
};

WaterBlock.prototype.update = function(dt) {
    if (checkCollision(this, player)) {
        player.resetPlayer();
        player.loseLife();
    }
}

WaterBlock.prototype.instantiate = function(coords) {
    water = [];
    if (water.length < coords.length) {
        for (i = 0; i < coords.length; i++) {
            water.push(new WaterBlock(coords[i][0], coords[i][1]));
        };
    }
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

Player.prototype.update = function() {
    window.requestAnimationFrame(Player.prototype.update);
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

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

Player.prototype.loseLife = function() {
    this.lives -= 1;
    console.log(this.lives);
}

Player.prototype.resetPlayer = function(){
    player.x = 202;
    player.y = 375;
}

// This class defines the style for UI buttons
var Button = function(x, y, w, h, text) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.text = text;
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

//Star collectible class
var Star = function (x, y) {
    this.sprite = 'images/star.png';
    this.x = x;
    this.y = y;
    this.w = 50;
    this.h = 40
}

Star.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Star.prototype.update = function() {
    window.requestAnimationFrame(Star.prototype.update);

    if (checkCollision(this, player)) {
        player.resetPlayer();
        player.score += 300;
        this.x = -100;
        this.y = -100;
    }
}


// Instantiating water objects
var water = [new WaterBlock(0, 0)];

// Instantiating player and enemies.
var allEnemies = [new Enemy(50), new Enemy(135), new Enemy(220)];
var player = new Player(202, 375);

// Instantiating collectibles
var star = new Star (202, 50);


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
