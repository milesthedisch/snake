// var utils = module.import('utils.js') // need browserify

var Game = function (canvas, options, debug, test) {
    'use strict';

    this.gameflag = null;    

    this.test = test || false;
    this.debug = debug || false;

    // canvas
    this.canvas = canvas;
    this.options = options || 'snake';
    this.context = this.canvas.getContext('2d');    
    this.canvasWidth = 40;
    this.canvasHeight = 40;
    this.rendererHeight = this.canvas.offsetWidth;
    this.rendererWidth = this.canvas.offsetHeight;
    this.ratioWidth = this.rendererWidth / this.canvasWidth;
    this.ratioHeight = this.rendererHeight / this.canvasHeight;
    this.players = [];
}

var Snake = function() {
    'use strict';
    // If i want snakes
    this.positions = []; 
    // Positional values
    this.dx = 0;
    this.dy = 1; 
    // Score
    this.score = null;     
}


var Circle = function() {
    'use strict';
    // If i want circles
    this.x = null;
    this.y = null;

    this.radSnake = 5;
    this.radius = 3;    
}

var Food = function() {
    'use strict';
    this.x = null;
    this.y = null;
}



Snake.prototype.createSnake = function (length, x, y, x2, y2) {
    'use strict';

    for (var i = 0; i <= length; i++) {
        this.positions.push({x: i, y: 0});
    }    

};

Food.prototype.smartSpawn = function (game, players) {
    'use strict';
    this.spawn(game);
    var check = this.smart(players);
    while (!check) {
        this.spawn(game);
        check = this.smart(players);
    }
}

Food.prototype.spawn = function (game) {
    this.x = utils.randPos(0, game.canvasWidth - 1);
    this.y = utils.randPos(0, game.canvasHeight - 1);
};

Food.prototype.smart = function (players) {
    'use strict'
    var _this = this;
    var check = false;
    if (typeof this.x === 'number' && typeof this.y === 'number') {
        players.forEach(function(player){
            player.positions.every(function(snake){
                check = (_this.x != snake.x && _this.y != snake.y);
            });  
        })
    }
    return check;
}

Game.prototype.init = function (player1, mice) {
    'use strict';
    if (this.test) {
        // this.headOnCollision(1, 0, 5, this.canvasWidth / 2);
        this.wallCollision(-1, 0, 5, this.canvasWidth / 2);
        // this.nearMiss(9, 9);
    } else {
        this.players.push(player1);
        mice.smartSpawn(this, this.players);


        // For now just have one player later add an array;

        player1.bindEventListeners();
        this.tick(50);
        this.animate();
    }
};

Snake.prototype.init = function () {
    'use strict';
    this.createSnake(3, 2, 2, 2, 2);
};

Game.prototype.tick = function (delay) {
    'use strict';
    if (this.gameflag === true) return;
    var _this = this;
    this.timeout = setTimeout(_this.tick.bind(this, delay), delay);
    this.update(); 
};

Game.prototype.update = function (dead) {
    'use strict';
    this.players.forEach(function(player){

        player.nx = player.positions[0].x;
        player.ny = player.positions[0].y;

        player.nx += player.dx;
        player.ny += player.dy;

        player.tail = player.positions.pop();
        player.tail.x = player.nx;
        player.tail.y = player.ny;

        player.positions.unshift(player.tail);

        // console.log(player.positions[0].x);

    })

    // if (this.gameflag !== true) {
    //     var _this = this;

    //     var nx = this.snake[0].x; 
    //     var ny = this.snake[0].y;

    //     // var bx = this.snake2[0].x;
    //     // var by = this.snake2[0].y;

    //     nx += this.dx;
    //     ny += this.dy;

    //     // bx += this.ax;
    //     // by += this.ay;

    //     var tail = this.snake.pop();
    //         tail.x = nx;
    //         tail.y = ny;
    //     this.snake.unshift(tail);

    //     // var tail2 = this.snake2.pop();
    //     //     tail2.x = bx;
    //     //     tail2.y = by;
    //     // this.snake2.unshift(tail2);

    //     console.log(this.snake[0].x);
    //     this.eat(this.collision(this.options));

        
    // } else {
    //     this.dx = 0;
    //     this.dy = 0;
    //     this.ax = 0;
    //     this.ay = 0;
    //     return;
    // }
};

Game.prototype.animate = function () {
    'use strict';
    this.draw();
    this.ref = window.requestAnimationFrame(this.animate.bind(this));
};

Snake.prototype.movement = function (directionX, directionY, player) {
    'use strict';

    player = player || 1;

    if (player === 1) {
        this.dx = directionX;
        this.dy = directionY;
    }

    // if (player === 2) {
    //     this.ax = directionX;
    //     this.ay = directionY;
    // }
        
    if (this.debug) {
        this.update();
        this.context.clearRect(0, 0, this.rendererWidth,this.rendererHeight);
        this.context.fillStyle = '#ffffff';
        this.draw();
    }
};

Game.prototype.draw = function (dead) {
    'use strict';
    var _this = this;
    //clear every frame
    this.context.clearRect(0, 0, this.rendererWidth,this.rendererHeight);

    this.context.fillStyle = '#ffffff';

    // Drawing snake //
    if (dead === "dead"){
        this.drawSnakes('#777777',"dead");
    } else {
        this.drawSnakes();    
    }

    // Drawing Grid //
    this.drawGridLines();

    // Draw food //
    this.context.fillStyle = 'red';
    this.context.fillRect(this.fx * this.ratioWidth, this.fy * this.ratioHeight, this.ratioWidth, this.ratioHeight);
   
    // Draw moving circles //
    // this.drawCircle(this.x, this.y, this.radSnake, "skyblue");
    // this.drawCircle(this.fx, this.fy, this.radius, "red");
    // this.ref = window.requestAnimationFrame(this.draw.bind(this))
};

Snake.prototype.eat = function (check) {
    'use strict';
        console.log(check)
        if (check === true) {
            this.snake.push({x: this.fx, y: this.fy});
            this.food();
            this.score++;
            console.log('score: ', this.score);
        } 
};



Game.prototype.gameOver = function () {
    this.gameflag = true;
    clearTimeout(this.timeout);
    window.cancelAnimationFrame(this.ref);
    this.draw('dead');
    this.drawGridLines();
};

Game.prototype.drawGridLines = function () {
    'use strict';
    if (this.debug) {
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

Circle.prototype.drawCircle = function (centerX, centerY, radius, colour) {
    'use strict';

    this.context.beginPath();
    this.context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
    this.context.fillStyle = colour;
    this.context.fill();
};

Game.prototype.drawSnakes = function (color) {
    'use strict';
    var _this = this;
        this.players.forEach(function(player){
            player.positions.forEach(function(s){
                _this.context.fillStyle = color || 'green';
                _this.context.fillRect(s.x * _this.ratioWidth, s.y * _this.ratioHeight, _this.ratioWidth, _this.ratioHeight);    
            });
        })
};

Snake.prototype.bindEventListeners = function () {
    'use strict';

    var _this = this;
    document.onkeydown = function (e) {
        var key = utils.keyPress(e);
        console.log(key, this.positions)
        switch (true) {
            case ('w' === key && _this.dy != 1): {
                _this.movement(0, -1);
                break;
            }

            case ('a' === key && _this.dx != 1): {
                _this.movement(-1, 0);
                break;
            }

            case ('s' === key && _this.dy != -1): {
                _this.movement(0, 1);
                break;
            }

            case ('d' === key && _this.dx != -1): {
                _this.movement(1, 0);
                break;
            }
        }
    };
};


///////////////
//  Testing  //
///////////////

Snake.prototype.wallCollision = function (dirX, dirY, x, y) {
    this.dx = dirX;
    this.dy = dirY;

    this.ax = -dirX;
    this.ay = dirY;

    this.createSnake(1, x, y, x, y);
    this.tick(1000);
    this.animate();
};

Snake.prototype.headOnCollision = function (dirX, dirY, x, y ) {
    
    this.dx = dirX;
    this.dy = dirY || 0;

    this.ax = -(dirX);
    this.ay = dirY || 0;

    this.createSnake(1, x, y, x, y);
    this.tick(1000);
    this.animate();
};

Snake.prototype.nearMiss = function (x, y) {

    this.dx = -1;
    this.dy = 0;

    this.ax = 0;
    this.ay = -1;

    this.createSnake(1, x + 2, y, x, y + 2);

    this.tick(1000);
    this.animate();
};

Snake.prototype.nearMiss2 = function (x, y) {

    this.dx = 1;
    this.dy = 0;

    this.ax = 0;
    this.ay = 1;

    this.createSnake(1, x - 1, y + 1, x - 1, y - 1);

    this.tick(1000);
    this.animate(); 
};
// var Snake = function (canvas, gridSize, options)
window.addEventListener('DOMContentLoaded', function(){
    var myGame = new Game(document.querySelector('canvas'), null, null, false);
    var player1 = new Snake();
    var mice = new Food();
    player1.init()
    myGame.init(player1, mice);
});







