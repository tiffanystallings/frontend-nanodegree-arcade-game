/* Engine.js
 * This file provides the game loop functionality (update entities and render),
 * draws the initial game board on the screen, and then calls the update and
 * render methods on your player and enemy objects (defined in your app.js).
 *
 * A game engine works by drawing the entire game screen over and over, kind of
 * like a flipbook you may have created as a kid. When your player moves across
 * the screen, it may look like just that image/character is moving or being
 * drawn but that is not the case. What's really happening is the entire "scene"
 * is being drawn over and over, presenting the illusion of animation.
 *
 * This engine is available globally via the Engine variable and it also makes
 * the canvas' context (ctx) object globally available to make writing app.js
 * a little simpler to work with.
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
        level = new Level;

    canvas.width = 505;
    canvas.height = 606;
    doc.body.appendChild(canvas);

    /* This function serves as the kickoff point for the game loop itself
     * and handles properly calling the update and render methods.
     */
    function main() {
        /* Get our time delta information which is required if your game
         * requires smooth animation. Because everyone's computer processes
         * instructions at different speeds we need a constant value that
         * would be the same for everyone (regardless of how fast their
         * computer is) - hurray time!
         */

        if (pauseGame) {
            return;
        } else {
            var now = Date.now(),
                dt = (now - lastTime) / 1000.0;

            /* Call our update/render functions, pass along the time delta to
             * our update function since it may be used for smooth animation.
             */

            update(dt);
            render();


            /* Set our lastTime variable which is used to determine the time delta
             * for the next time this function is called.
             */
            lastTime = now;

            /* Use the browser's requestAnimationFrame function to call this
             * function again as soon as the browser is able to draw another frame.
             */
            win.requestAnimationFrame(main);

            checkWin();
            checkLose();
        }
    }

    function init() {
        lastTime = Date.now();
        reset();
    }

    /* This function is called by main (our game loop) and itself calls all
     * of the functions which may need to update entity's data. Based on how
     * you implement your collision detection (when two entities occupy the
     * same space, for instance when your character should die), you may find
     * the need to add an additional function call here. For now, we've left
     * it commented out - you may or may not want to implement this
     * functionality this way (you could just implement collision detection
     * on the entities themselves within your app.js file).
     */
    function update(dt) {

        updateEntities(dt);
    }

    /* This is called by the update function and loops through all of the
     * objects within your allEnemies array as defined in app.js and calls
     * their update() methods. It will then call the update function for your
     * player object. These update methods should focus purely on updating
     * the data/properties related to the object. Do your drawing in your
     * render methods.
     */
    function updateEntities(dt) {
        var allEnemies = level.enemies;
        allEnemies.forEach(function(enemy) {
            enemy.update(dt);
        });
        level.player.update();
        level.water.forEach(function(water) {
            water.update(dt);
        });
        level.star.update();

    }

    /* This function initially draws the "game level", it will then call
     * the renderEntities function.
     */
    function render() {
        ctx.clearRect(0,-33, 505, 83);
        level.render();
        renderEntities();
        UI();
    }

    /* This function is called by the render function and is called on each game
     * tick. Its purpose is to then call the render functions you have defined
     * on your enemy and player entities within app.js
     */
    function renderEntities() {
        /* Loop through all of the objects within the allEnemies array and call
         * the render function you have defined.
         */
        var allEnemies = level.enemies;
        allEnemies.forEach(function(enemy) {
            enemy.render();
        });

        level.player.render();
        level.star.render();
    }

    /* This function does nothing but it could have been a good place to
     * handle game reset states - maybe a new game menu or a game over screen
     * those sorts of things. It's only called once by the init() method.
     */
    function reset() {
        pauseGame = true;
        splashScreen();
    }

    // Setting up the background for the start, game over, and level up screens.
    function splashScreen() {
        background();
        var button = playButton();
        clickPlay();

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

    function checkWin() {
        if (level.star.collected === true) {
            level.star.collected = false
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
            }
        }
    }

    function checkLose() {
        if (level.player.lives < 0) {
            pauseGame = true;
            background();
            var button = retryButton();
            clickRetry();

            ctx.font = '55pt Impact';
            ctx.textAlign = 'center';
            ctx.fillText('GAME OVER!', 252, 185);

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
        }
    }

    function nextLevel(l) {
        pauseGame = true;
        background();
        var button = nextLevelButton();
        clickNext(l);

        ctx.font = '55pt Impact';
        ctx.textAlign = 'center';
        ctx.fillText('Nicely Done!', 252, 185);

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

    function gameOver() {
        pauseGame = true;
        background();
        var button = retryButton();
        clickRetry();

        ctx.font = '55pt Impact';
        ctx.textAlign = 'center';
        ctx.fillText('GAME OVER!', 252, 185);

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
        'images/heart.png',
        'images/star.png',
        'images/gem-blue.png',
        'images/gem-orange.png',
        'images/gem-green.png',
        'images/rock.png'
    ]);
    Resources.onReady(init);

    /* Assign the canvas' context object to the global variable (the window
     * object when run in a browser) so that developers can use it more easily
     * from within their app.js files.
     */
    global.ctx = ctx;
    global.canvas = canvas;
})(this);
