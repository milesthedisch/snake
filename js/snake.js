// var utils = module.import('utils.js') // need browserify

var Snake = function (canvas, options, debug, test) {
    'use strict';

    this.gameflag = null;    

    this.test = test || false;
    this.debug = debug || false;

    // canvas
    this.canvas = canvas;
    this.options = options || 'snake';
    this.context = this.canvas.getContext('2d');    
    this.canvasWidth = 64;
    this.canvasHeight = 64;
    this.rendererHeight = this.canvas.offsetWidth;
    this.rendererWidth = this.canvas.offsetHeight;
    this.ratioWidth = this.rendererWidth / this.canvasWidth;
    this.ratioHeight = this.rendererHeight / this.canvasHeight;

    // If i want circles
    if (this.options === 'circle') {
        this.radSnake = 5;
        this.radius = 3;    
    }
    // If i want snakes
    if (this.options === 'snake') {
        this.snake = [];    
    }
    // Position of food
    this.fx = 0;
    this.fy = 0;
    // scores in console
    this.score = 0;
    this.score2 = 0;
    // poistional values
    this.dx = 0;
    this.dy = 1;   
    // snake 2
    this.ax = 0;
    this.ay = 1; 
    // initiate everything;
    this.init();
};

Snake.prototype.createSnake = function (length, x, y, x2, y2) {
    'use strict';

    for (var i = 0; i <= length; i++) {
        this.snake.push({x: i, y: 0});
    }    

};

Snake.prototype.food = function () {
    'use strict';
    var _this = this;
    this.fx = utils.randPos(0, this.canvasWidth - 1);
    this.fy = utils.randPos(0, this.canvasHeight - 1);

    var checker = this.snake.every(function(element){
        return (_this.fx != element.x && _this.fy != element.y);
    });

    while (!checker) {
        this.fx = utils.randPos(0, this.canvasWidth - 1);
        this.fy = utils.randPos(0, this.canvasHeight - 1);
        checker = this.snake.every(function(element){
            return (_this.fx != element.x && _this.fy != element.y);
        });
        return;
    }
};

Snake.prototype.init = function () {
    'use strict';
    if (this.test) {
        // this.headOnCollision(1, 0, 5, this.canvasWidth / 2);
        this.wallCollision(-1, 0, 5, this.canvasWidth / 2);
        // this.nearMiss(9, 9);
    } else {
        this.createSnake(1, 2, 2, 2, 2);
        this.food();
        this.bindEventListeners();
        this.tick(100);
        this.animate();
    }
};

Snake.prototype.tick = function (delay, dead) {
    'use strict';
    if (this.gameflag === true) return;
    var _this = this;
    this.timeout = setTimeout(_this.tick.bind(this, delay), delay);
    this.update(); 
};

Snake.prototype.update = function (dead) {
    'use strict';
    if (this.gameflag !== true) {
        var _this = this;

        var nx = this.snake[0].x; 
        var ny = this.snake[0].y;

        // var bx = this.snake2[0].x;
        // var by = this.snake2[0].y;

        nx += this.dx;
        ny += this.dy;

        // bx += this.ax;
        // by += this.ay;

        var tail = this.snake.pop();
            tail.x = nx;
            tail.y = ny;
        this.snake.unshift(tail);

        // var tail2 = this.snake2.pop();
        //     tail2.x = bx;
        //     tail2.y = by;
        // this.snake2.unshift(tail2);

        console.log(this.snake[0].x);
        this.eat(this.collision(this.options));

        
    } else {
        this.dx = 0;
        this.dy = 0;
        this.ax = 0;
        this.ay = 0;
        return;
    }
};

Snake.prototype.animate = function () {
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

    if (player === 2) {
        this.ax = directionX;
        this.ay = directionY;
    }
        
    if (this.debug) {
        this.update();
        this.context.clearRect(0, 0, this.rendererWidth,this.rendererHeight);
        this.context.fillStyle = '#ffffff';
        this.draw();
    }
};

Snake.prototype.draw = function (dead) {
    'use strict';
    var _this = this;
    //clear every frame
    this.context.clearRect(0, 0, this.rendererWidth,this.rendererHeight);

    this.context.fillStyle = '#ffffff';

    // Drawing snake //
    if (dead === "dead"){
        this.drawSnake('#777777',"dead");
    } else {
        this.drawSnake();    
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
        }  else if (check === 'snake2') {
            console.log
            this.snake2.push({x: this.fx, y: this.fy});
            this.food();
            this.score2++;
            console.log('score: ', this.score);
        }
};

Snake.prototype.collision = function (options) {
    'use strict';
    var _this = this;
    switch (options) {
        case "snake" : {
            // For wall collision
            if (this.gameflag) {return;}
            if (this.dx === -1 && this.snake[0].x < 0 || 
                this.dy === -1 && this.snake[0].y < 0 || 
                this.dx === 1 && this.snake[0].x > this.canvasWidth - 1 ||
                this.dy === 1 && this.snake[0].y > this.canvasHeight - 1 
                // ||
                // this.ax === -1 && this.snake2[0].x < 0 || 
                // this.ay === -1 && this.snake2[0].y < 0 || 
                // this.ax === 1 && this.snake2[0].x > this.canvasWidth - 1||
                // this.ay === 1 && this.snake2[0].y > this.canvasHeight - 1 
                ) 
            {   
                console.log('hit wall')
                this.gameOver();
            }

            _this.snake.forEach(function(s, i){
                // check for head on collision
                // know which direction the head is moving 
                // if the snakes head is moving left check every one grid left of it.
                // if the snakes head is moving up check every one grid right of it.
                // if (i === 0) {
                //     if ((_this.dx === 1 && _this.ax === -1) && s.x + 1 === _this.snake2[0].x) {
                //         _this.gameOver();
                //         return;
                //     }
                //     if ((_this.dx === -1 && _this.ax === 1) && s.x - 1 === _this.snake2[0].x) {
                //         _this.gameOver();
                //         return;
                //     }
                //     if ((_this.dy === -1 && _this.ay === 1) && s.y - 1 === _this.snake2[0].y) {
                //         _this.gameOver();
                //         return;
                //     }
                //     if ((_this.dy === 1 && _this.ay === -1)  && s.y + 1 === _this.snake2[0].y) {
                //         _this.gameOver();
                //         return;
                //     }
                // }
                // _this.snake2.every(function(a, j){
                //     if ( a.x === s.x && a.y === s.y ){
                //         console.log('hit snake 2');
                //         _this.gameOver();
                //     }
                // });
                if ( i !== 0 ) {
                    if (s.x === _this.snake[0].x && s.y === _this.snake[0].y ) {
                        console.log('hit self')
                        _this.gameOver();
                    }      
                }
            });

            // _this.snake2.forEach(function(s, i){
            //     // check every part except the head
            //     if (i === 0) {
            //         if ((_this.dx === 1 && _this.ax === -1) && s.x + 1 === _this.snake[0].x) {
            //             _this.gameOver();
            //             return;
            //         }
            //         if ((_this.dx === -1 && _this.ax === 1) && s.x - 1 === _this.snake[0].x) {
            //             _this.gameOver();
            //             return;
            //         }
            //         if ((_this.dy === -1 && _this.ay === 1) && s.y - 1 === _this.snake[0].y) {
            //             _this.gameOver();
            //             return;
            //         }
            //         if ((_this.dy === 1 && _this.ay === -1)  && s.y + 1 === _this.snake[0].y) {
            //             _this.gameOver();
            //             return;
            //         }
            //     }
            //     _this.snake.every(function(a, j){
            //         if ( a.x === s.x && a.y === s.y ){
            //             console.log('hit other snake');
            //             _this.gameOver();
            //         }    
            //     });
            //     if ( i !== 0 ) {
            //         if (s.x === _this.snake2[0].x && s.y === _this.snake2[0].y ) {
            //             console.log('hit self')
            //             _this.gameOver();
            //         }      
            //     }
            // });

            // For food collision
            if ( this.snake[0].x === this.fx && this.snake[0].y === this.fy) {
                console.log('yum1')
                return true;
            // } else if (this.snake2[0].x === this.fx && this.snake2[0].y === this.fy) {
            //     console.log('yum2');
            //     return 'snake2';
            // } 
            } else {
                return false;
            }

            break;
        }

        case "circle" : {

            // For wall collision (circle)
            if (this.x < (0 + this.radSnake) ||
                this.y < (0 + this.radSnake) || 
                this.x > (this.canvasWidth - this.radSnake) || 
                this.y > (this.canvasHeight - this.radSnake)) 
            {
                this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
                return true;
            }   

            //For food collision (circle)
            if (Math.pow(this.x - this.fx , 2) + Math.pow(this.y - this.fy, 2) <= Math.pow(this.radSnake + this.radius + 4, 2)) {
                return true;
            } else {
                return false;
            }

            break;
        }
    }
};

Snake.prototype.gameOver = function () {
    this.gameflag = true;
    clearTimeout(this.timeout);
    this.context.clearRect(0, 0, this.rendererWidth,this.rendererHeight)
    this.drawSnake('#777777', 'dead')
    window.cancelAnimationFrame(this.ref);
    this.drawGridLines();
};

Snake.prototype.drawGridLines = function () {
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

Snake.prototype.drawCircle = function (centerX, centerY, radius, colour) {
    'use strict';

    this.context.beginPath();
    this.context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
    this.context.fillStyle = colour;
    this.context.fill();
};

Snake.prototype.drawSnake = function (color, dead) {
    'use strict';
    var _this = this;

        this.snake.forEach(function(s){
            _this.context.fillStyle = color || 'green';
            _this.context.fillRect(s.x * _this.ratioWidth, s.y * _this.ratioHeight, _this.ratioWidth, _this.ratioHeight);    
        });

        // this.snake2.forEach(function(s){
        //     _this.context.fillStyle = color || 'brown';
        //     _this.context.fillRect(s.x * _this.ratioWidth, s.y * _this.ratioHeight, _this.ratioWidth, _this.ratioHeight);
        // });
};

Snake.prototype.bindEventListeners = function () {
    'use strict';

    var _this = this;
    document.onkeydown = function (e) {

        var key = utils.keyPress(e);

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
            // This is for the second player
            case ('right' === key && _this.ax != -1): {
                _this.movement(1, 0, 2);
                break;
            }

            case ('down' === key && _this.ay != -1): {
                _this.movement(0, 1, 2);
                break;
            } 

            case ('left' === key && _this.ax != 1): {
                _this.movement(-1, 0, 2);
                break;
            }

            case ('up' === key && _this.ay != 1): {
                _this.movement(0, -1, 2);
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
    var myGame = new Snake(document.querySelector('canvas'), null, null, false); 
});







