// var utils = module.import('utils.js') // need browserify

var Snake = function (canvas, gridSize, options) {
    'use strict';

    // canvas
    this.debug = true;
    this.canvas = canvas;
    this.options = options || 'snake'
    this.context = this.canvas.getContext('2d');    
    this.canvasWidth = 50;
    this.canvasHeight = 50;
    this.rendererHeight = this.canvas.offsetWidth;
    this.rendererWidth = this.canvas.offsetHeight;
    this.ratioWidth = this.rendererWidth / this.canvasWidth;
    this.ratioHeight = this.rendererHeight / this.canvasHeight;
    this.canvasGridSize = gridSize || 10;
    console.log(this.ratioWidth)

    // If i want circles
    if (this.options === 'circle') {
        this.radSnake = 5;
        this.radius = 3;    
    }
    // If i want snakes
    if (this.options === 'snake') {
        this.snake = [];    
    }

    // poistional values
    // this.x = 2
    // this.y = 0 
    this.dx = 0 
    this.dy = 1 
    this.fx = utils.randPos(0, this.canvasWidth - 1)
    this.fy = utils.randPos(0, this.canvasHeight - 1)
    
    // initiate everything;
    this.init();
}

Snake.prototype.createSnake = function (length) {
    'use strict'
    for (var i = length - 1; i >= 0; i--) {
        this.snake.push({x: i, y: 0})
    }    
}

Snake.prototype.init = function () {
    'use strict';
    this.createSnake(10);
    this.bindEventListeners();
    this.tick();
    this.animate();
}

Snake.prototype.tick = function () {
    'use strict'
    var _this = this;
    this.timeout = setTimeout(_this.tick.bind(_this), 100)
    this.update();  
}

Snake.prototype.update = function () {
    'use strict'
    var _this = this

    var nx = this.snake[0].x 
    var ny = this.snake[0].y

    nx += this.dx 
    ny += this.dy

    var tail = this.snake.pop();
        tail.x = nx
        tail.y = ny
    this.snake.unshift(tail)

    this.eat(this.collision(this.options))
}

Snake.prototype.movement = function (directionX, directionY) {
    'use strict'

    this.dx = directionX
    this.dy = directionY

    // if (this.debug) {
    //     this.update();
    //     this.context.clearRect(0, 0, this.rendererWidth,this.rendererHeight);
    //     this.context.fillStyle = '#ffffff';
    //     // Drawing snake //
    //     this.drawSnake()
    // }
}

Snake.prototype.animate = function () {
    'use strict'
    this.draw();
    this.ref = window.requestAnimationFrame(this.animate.bind(this))
}

Snake.prototype.draw = function () {
    'use strict';
    var _this = this;

    //clear every frame
    this.context.clearRect(0, 0, this.rendererWidth,this.rendererHeight);

    this.context.fillStyle = '#ffffff';

    // Drawing snake //
    this.drawSnake()

    // Drawing Grid //
    this.drawGridLines(this.canvasWidth, this.canvasHeight, this.canvasGridSize)

    // Draw food //
    this.context.fillStyle = 'red'
    this.context.fillRect(this.fx * this.ratioWidth, this.fy * this.ratioHeight, this.ratioWidth, this.ratioHeight);
    // Draw moving circles //
    // this.drawCircle(this.x, this.y, this.radSnake, "skyblue");
    // this.drawCircle(this.fx, this.fy, this.radius, "red");
    // this.ref = window.requestAnimationFrame(this.draw.bind(this))
};

Snake.prototype.eat = function (check) {
    'use strict'

    // if (check) {
 //        var yTmp = this.randPos(30, 640 - 30);
 //        var xTmp = this.randPos(30, 640 - 30);
 //        var checker = Math.pow(this.x - xTmp , 2) + Math.pow(this.y - yTmp, 2) <= Math.pow(this.radSnake + this.radius, 2);
 //        if (!checker && check) {
 //            this.fy = yTmp;
 //            this.fx = xTmp;
 //            this.radSnake += 5;
 //            console.log('nom');
 //            return;
 //        } else if (checker) {
 //            this.eat();
 //            return;
 //        }
 //    }

    if (check) {
        var yTmp = utils.randPos(0, this.canvasHeight - 1)
        var xTmp = utils.randPos(0, this.canvasWidth - 1)
        var checker = this.snake.every(function(element){
            return (xTmp != element.x && yTmp != element.y) 
        })
        if (checker && check) {
            this.snake.push({x: this.fx, y: this.fy})
            this.fy = yTmp;
            this.fx = xTmp;
            console.log('yum')
        } else if (!checker) {
            this.eat()
            return;
        }
    }
}
Snake.prototype.collision = function (options) {
    'use strict';
    var _this = this;
    switch (options) {
        case "snake" : {
            console.log('collision detection')
            // For wall collision
            if (this.snake[0].x < 0 || 
                this.snake[0].y < 0 || 
                this.snake[0].x > this.canvasWidth - 1||
                this.snake[0].y > this.canvasHeight - 1) 
            {   

                this.dx = 0
                this.dy = 0
                clearTimeout(this.timeout)
                this.cancel = window.cancelAnimationFrame(this.ref);
                
            }

            _this.snake.forEach(function(s, i){
                if ( i != 0 ) {
                    if (s.x === _this.snake[0].x && s.y === _this.snake[0].y ) {
                        _this.cancel = window.cancelAnimationFrame(_this.ref);
                        clearTimeout(_this.timeout)
                    }      
                }
            })

            // For food collision
            console.log('x: ',this.snake[0].x, 'y: ', this.snake[0].y, 'fx:', this.fx, 'fy: ', this.fy)
            if ( this.snake[0].x === this.fx && this.snake[0].y === this.fy) {
                return true;
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
                console.log('nom')
                return true;
            } else {
                return false;
            }

            break;
        }
    }
}

Snake.prototype.drawGridLines = function () {
    'use strict';
    if (!this.debug) {
        // Horizontal Lines 
        for (var i = 0; i < this.canvasWidth; i++) {
            this.context.beginPath();
            this.context.moveTo(0, i);
            this.context.lineTo(this.canvasWidth, i);
            this.context.closePath();
            this.context.stroke();
         }

        // Vertical lines
        for (var j = 0; j < Math.round(this.canvasHeight / this.canvasGridSize); j++) {
            this.context.beginPath();
            this.context.moveTo(j * this.canvasGridSize, 0);
            this.context.lineTo(this.canvasGridSize * j, this.canvasHeight);
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

Snake.prototype.drawSnake = function () {
    'use strict';
    var _this = this

    this.snake.forEach(function(s){
        _this.context.fillStyle = 'green'
        _this.context.fillRect(s.x * _this.ratioWidth, s.y * _this.ratioHeight, _this.ratioWidth, _this.ratioHeight)     
    })
}


Snake.prototype.bindEventListeners = function () {
    'use strict';

    var _this = this;
    document.onkeypress = function (e) {

        var key = String.fromCharCode(e.keyCode);

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

            // case 'e' === key: {
            //     _this.pauseGame()
            // }
        }
    };
};

// var Snake = function (canvas, gridSize, options)

window.addEventListener('DOMContentLoaded', function(){
    var myGame = new Snake(document.querySelector('canvas'));    
});







