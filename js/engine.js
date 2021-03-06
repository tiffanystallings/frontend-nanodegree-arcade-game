/**
 * @description Provides game loop functionality
 * @constructor
 * @param {object} global - The global scope
 */
var Engine = (function(global) {
    /* Predefine the variables we'll be using within this scope,
     * create the canvas element, grab the 2D context for that canvas
     * set the canvas elements height/width and add it to the DOM.
     */
    var doc = global.document,
        win = global.window,
        canvas = doc.createElement('canvas'),
        ctx = canvas.getContext('2d'),
        pauseGame = false,
        lastTime;
        level = new Level();

    canvas.width = 505;
    canvas.height = 606;
    doc.body.appendChild(canvas);

    /**
     * @description Starts game loop and calls update and render functions
     */
    function main() {
        if (pauseGame) {
            return;
        } else {
            var now = Date.now(),
                dt = (now - lastTime) / 1000.0;

            update(dt);
            render();

            lastTime = now;

            /* Use the browser's requestAnimationFrame function to call this
             * function again as soon as the browser is able to draw another frame.
             */
            win.requestAnimationFrame(main);

            checkWin();
            checkLose();
        }
    }

    /**
     * @description Calls all neccessary update functions
     */
    function init() {
        lastTime = Date.now();
        reset();
    }

    /**
     * @description Calls updateEntities
     * @param {number} dt - Delta time
     */
    function update(dt) {

        updateEntities(dt);
    }

    /**
     * @description Loops through level entities, updates them, and checks collision
     * @param {number} dt - Delta time
     */
    function updateEntities(dt) {
        var allEnemies = level.enemies;
        var allGems = level.gems;
        var player = level.player;
        var star = level.star;
        var water = level.water;
        player.update();

        allEnemies.forEach(function(enemy) {
            enemy.update(dt);
            if (checkCollision(enemy, player)) {
                player.loseLife();
                player.resetPlayer();
            }
        });

        star.update();
        if (checkCollision(star, player)) {
            star.gained();
        }

        allGems.forEach(function(gem) {
            gem.update();
            if (checkCollision(gem, player)) {
                gem.collected();
            }
        });

        water.forEach(function(water) {
            if (checkCollision(water, player)) {
                player.loseLife();
                player.resetPlayer();
            }
        });
    }

    /**
     * @description Draws the game level and the HUD
     */
    function render() {
        ctx.clearRect(0,-33, 505, 83);
        level.render();
        renderEntities();
        ui();
    }

    /**
     * @description Renders all variable game objects
     */
    function renderEntities() {
        var allEnemies = level.enemies;
        var allGems = level.gems;

        level.star.render();
        allGems.forEach(function(gem) {
            gem.render();
        });
        level.player.render();
        allEnemies.forEach(function(enemy) {
            enemy.render();
        });
    }

    /**
     * @description Halts main loop and renders a splash screen
     */
    function reset() {
        pauseGame = true;
        splashScreen();
    }

    /**
     * @description Renders the opening screen
     */
    function splashScreen() {
        background();
        var button = playButton();
        clickPlay();

        /**
         * @description Checks for click collision with the play button
         */
        function clickPlay() {
            document.addEventListener('click', function(e) {
                var clickObj = {
                    'x': e.offsetX,
                    'y': e.offsetY,
                    'h': 3,
                    'w': 3
                };

                if (checkCollision(button, clickObj)) {
                    ctx.fillstyle = '#fff';
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    pauseGame = false;
                    main();
                }
            });
        }
    }

    /**
     * @description Checks if player has collected the star, and handles level progression
     */
    function checkWin() {
        /**
         * @description Checks collision with the replay button
         */
        function clickReplay() {
            document.addEventListener('click', function(e) {
                var clickObj = {
                    'x': e.offsetX,
                    'y': e.offsetY,
                    'h': 3,
                    'w': 3
                };
                if (checkCollision(button, clickObj)) {
                    location.reload();
                }
            });
        }
        if (level.star.collected === true) {
            level.star.collected = false;
            ctx.clearRect(0,-33, 505, 83);

            if (level.id === 1) {
                nextLevel(level2());
            }
            else if (level.id === 2) {
                nextLevel(level3());
            }
            else {
                pauseGame = true;
                background();
                var button = replayButton();
                clickReplay();

                ctx.font = '55pt Impact';
                ctx.textAlign = 'center';
                ctx.fillText('YOU WIN!', 252, 185);
                ctx.fillText('Score: ' + level.player.score, 252, 433);
            }
        }
    }

    /**
     * @description Checks if player has lost the game and handles game over screen
     */
    function checkLose() {
        /**
         * @description Checks collision with the retry button
         */
        function clickRetry() {
            document.addEventListener('click', function(e) {
                var clickObj = {
                    'x': e.offsetX,
                    'y': e.offsetY,
                    'h': 3,
                    'w': 3
                };
                if (checkCollision(button, clickObj)) {
                    location.reload();
                }
            });
        }
        if (level.player.lives < 0) {
            pauseGame = true;
            background();
            var button = retryButton();
            clickRetry();

            ctx.font = '55pt Impact';
            ctx.textAlign = 'center';
            ctx.fillText('GAME OVER!', 252, 185);
            ctx.fillText('Score: ' + level.player.score, 252, 433);
        }
    }

    /**
     * @description Renders screen for level progression
     * @param {function} l - The level to progress to
     */
    function nextLevel(l) {
        pauseGame = true;
        background();
        var button = nextLevelButton();
        clickNext(l);

        ctx.font = '55pt Impact';
        ctx.textAlign = 'center';
        ctx.fillText('Nicely Done!', 252, 185);

        /**
         * @description Checks collision with next level button
         * @param {function} l - The level to progress to
         */
        function clickNext(l) {
            document.addEventListener('click', function(e) {
                var clickObj = {
                    'x': e.offsetX,
                    'y': e.offsetY,
                    'h': 3,
                    'w': 3
                };
                if (checkCollision(button, clickObj)) {
                    ctx.clearRect(0,0, canvas.width, canvas.height);
                    pauseGame = false;
                    level = l;
                }
            });
        }
    }

    /* Go ahead and load all of the images we know we're going to need to
     * draw our game level. Then set init as the callback method, so that when
     * all of these images are properly loaded our game will start.
     */
    Resources.load([
        'images/stone-block.png',
        'images/water-block.png',
        'images/grass-block.png',
        'images/enemy-bug.png',
        'images/char-boy.png',
        'images/Heart.png',
        'images/Star.png',
        'images/gem-blue.png',
        'images/gem-orange.png',
        'images/gem-green.png'
    ]);
    Resources.onReady(init);

    /* Assign the canvas' context object to the global variable (the window
     * object when run in a browser) so that developers can use it more easily
     * from within their app.js files.
     */
    global.ctx = ctx;
    global.canvas = canvas;
})(this);