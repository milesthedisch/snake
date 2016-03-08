var Game = function game(opts) {
    'use strict';
    opts = _.defaults(opts, {
        debug: false, 
        test: false, 
        players: [new Snake()], 
        food: [new Food()], 
        canvas: document.querySelector('canvas'),
        delay: 900
    });
    // debuggin and testing state
    this.state = {
        'debug' : opts.debug || false,
        'test' : opts.test || false
    };

    // collision objects in game
    this.objects = {
        "players" : opts.players || [],
        "food" : opts.food || []
    };

    // Canvas
    this.canvas = opts.canvas || document.querySelector('canvas');
    this.context = this.canvas.getContext('2d');    
    this.gameWidth = 11;
    this.gameHeight = 11;
    this.rendererHeight = this.canvas.offsetWidth;
    this.rendererWidth = this.canvas.offsetHeight;

    // Ratio for renderer and game 
    this.ratioWidth = this.rendererWidth / this.gameWidth;
    this.ratioHeight = this.rendererHeight / this.gameHeight;
    this.delay = opts.delay || 900;

    // Test scripts
    this.allTests = [] || null;
    this.testCounter = 0;
};

Game.prototype.spawnCheck = function (players) {
    'use strict';
    var _this = this;
     players.forEach(function(player, k){
        
        var otherPlayers = players.filter(function(otherPlayer){
            return otherPlayer.id !== player.id;
        });

        if (otherPlayers) {
            otherPlayers.forEach(function(op){
                var opx = op.positions[0].x,
                    opy = op.positions[0].y,
                    px = player.positions[0].x,
                    py = player.positions[0].y;

                if (opx === px && opy === py){
                    op.init(players, _this, op.id);
                }
            });
        }
     });   
};

Game.prototype.init = function () {
    'use strict';
    var _this = this;
    if (this.state.debug) { 
        this.initTests(); 
        debugger;
    }

    // For two players.
    this.bindEventListenersFor2(this.delay);

    this.objects.players.forEach(function(player, i, players){
        player.init(players, _this, i); 
        if (i === players.length - 1 && _this.state.test === false) { 
            _this.spawnCheck(players); 
        }
    });

    this.objects.food.forEach(function(item){
        item.init(_this, _this.objects.players);
    });

    this.tick(this.delay);
    this.animate();  
};

Game.prototype.drawGridLines = function draw() {
    'use strict';
    if (this.state.debug) {
        // Horizontal Lines 
        for (var i = 0; i < this.rendererWidth; i = i + this.ratioWidth) {
            this.context.beginPath();
            this.context.moveTo(0, i);
            this.context.lineTo(this.rendererWidth, i);
            this.context.closePath();
            this.context.stroke();
         }
        // Vertical lines
        for (var j = 0; j < this.rendererHeight; j = j + this.ratioHeight) {
            this.context.beginPath();
            this.context.moveTo(j, 0);
            this.context.lineTo(j, this.rendererHeight);
            this.context.closePath();
            this.context.stroke();
        }
    }
};

Game.prototype.animate = function () {
    'use strict';
    this.draw();
    this.ref = window.requestAnimationFrame(this.animate.bind(this));
    console.log('drawing');
};

Game.prototype.bindEventListenersFor2 = function (delay) {
    'use strict';
        var me = this.objects.players;
        if (!delay) {
            throw "Delay is supposed to be number greater than 0";
        }  
        document.onkeydown = 
        _.throttle(function (e) {
            me.forEach(function(snake,i,collection){
                    if (snake.id === 1) {
                    var key = utils.keyPress(e);
                        switch (true) {
                            case ('w' === key && snake.dy != 1): {
                               snake.movement(0, -1);
                                break;
                            }

                            case ('a' === key && snake.dx != 1): {
                               snake.movement(-1, 0);
                                break;
                            }

                            case ('s' === key && snake.dy != -1): {
                               snake.movement(0, 1);
                                break;
                            }

                            case ('d' === key && snake != -1): {
                               snake.movement(1, 0);
                                break;
                            }
                        }
                    } 
                    else {
                          key = utils.keyPress(e);
                          switch (true) {
                            case ('up' === key && snake.dy != 1): {
                                snake.movement(0, -1);
                                break;
                            }

                            case ('left' === key && snake.dx != 1): {
                                snake.movement(-1, 0);
                                break;
                            }

                            case ('down' === key && snake.dy != -1): {
                                snake.movement(0, 1);
                                break;
                            }

                            case ('right' === key && snake.dx != -1): {
                                snake.movement(1, 0);
                                break;
                            }
                        }
                    }
                });
        }, delay);
};

// Game.prototype.bindEventListener = function (player, callback) {
    
// };

Game.prototype.draw = function () {
    'use strict';
    var _this = this;
    //clear every frame
    this.context.clearRect(0, 0, this.rendererWidth,this.rendererHeight);
    this.context.fillStyle = '#ffffff';
    // Drawing snake //
    this.drawSnakes();    
    // Drawing Grid //
    this.drawGridLines(); 
    // Draw food //
    this.context.fillStyle = 'red';
    this.context.fillRect(this.objects['food'].x * this.ratioWidth, this.objects['food'].y * this.ratioHeight, this.ratioWidth, this.ratioHeight);
};

Game.prototype.drawSnakes = function (color) {
    'use strict';
    var _this = this;
    this.objects['players'].forEach(function(player){
        player.state['dead'] === true ? color = 'black' : player.id === 1 ? color = "green" : color = player.state['color']
        player.color = color;
        player.positions.forEach(function(s){
            _this.context.fillStyle = color || 'green';
            _this.context.fillRect(s.x * _this.ratioWidth, s.y * _this.ratioHeight, _this.ratioWidth, _this.ratioHeight);    
        });
    });
};

Game.prototype.tick = function (delay) {
    'use strict';
    var _this = this;
    this.timeout = setTimeout(_this.tick.bind(this, delay), delay);
    this.update(); 
    console.log('tick');
};

Game.prototype.update = function () {
    'use strict';
    var game = this;
    // this.bindEventListeners(this.delay);
    this.objects.players.forEach(function(player, i){
        player.update(player);     
    });
    map.collision(game); 
    if (this.state.test === true){
        if (this.allDead()){
            this.testCounter++;
            this.gameOver();
            if (this.state.test && this.testCounter < this.allTests.length) {
                this.init();
                this.drawSnakes();
            } else {
                this.gameOver();
            }
        }
    }
};

Game.prototype.allDead = function () {
    'use strict';   
    return this.objects['players'].every(function(player){
        return player.state['dead'];
    });
};

Game.prototype.purge = function () {
    'use strict';
    var players = this.objects.players;
        players = utils.erase(players);   
};

Game.prototype.gameOver = function () {
    'use strict';
    this.draw();
    this.timeout = this.timeout + 1;
    while (this.timeout--){
        clearTimeout(this.timeout);
    }
    window.cancelAnimationFrame(this.ref);
    this.purge();
};

Game.prototype.initTests = function () {
    'use strict';
    var testsAPI = tests        
        for (var test in testsAPI) {
            if (tests.hasOwnProperty(test)) {
                this.allTests.push(testsAPI[test]);
            }
        }
};

    