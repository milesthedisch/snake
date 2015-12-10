// var utils = module.import('utils.js') // need browserify

var Snake = function (canvas, gridSize, options) {
    'use strict';
    
    // canvas
    this.debug = true;
    this.canvas = canvas;
    this.options = options || 'circle'
    this.context = this.canvas.getContext('2d');    
    this.canvasWidth = this.canvas.offsetWidth;
    this.canvasHeight = this.canvas.offsetHeight;
    this.canvasGridSize = gridSize || 5;

    // poistional values
    this.x = 2
    this.y = 0 
    this.dx = 0
    this.dy = 1
    this.fx = utils.randPos(0, 63)
    this.fy = utils.randPos(0, 63)
    
    // If i want circles
    if (this.options === 'circle') {
        this.radSnake = 5;
        this.radius = 3;    
    }
    // If i want snakes
    if (this.options === 'snake') {
        this.snake = [];    
        this.head = this.snake[0];
    }

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
    this.createSnake(5);
    this.bindEventListeners();
    this.tick();
    this.animate();
}

Snake.prototype.tick = function () {
    'use strict'
    update();   
    setTimeout(tick, 100);
}

Snake.prototype.animate = function () {
    'use strict';
    var _this = this;
    this.ref = window.requestAnimationFrame(_this.animate.bind(_this))

    // utils.debug(this.drawGridLines) 
}

Snake.prototype.update = function () {
    'use strict'

    this.x += this.dx
    this.y += this.dy

    this.eat(this.collision(this.options))
}

Snake.prototype.movement = function (directionX, directionY) {
    'use strict'

    this.dx = directionX
    this.dy = directionY

    if (this.debug) {
        this.update();
        this.draw();
    }
}

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
        var yTmp = this.randPos(0, 63)
        var xTmp = this.randPos(0, 63)
        var checker = this.snake.every(function(element){
            console.log('yum')
            return (xTmp != element.x && yTmp != element.y) 
        })
        
        if (checker && check) {
            this.snake[0].x = this.fy;
            this.snake[0].y = this.fx;
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
    switch (options) {
        case "snake" : {

            // For wall collision
            if (this.head.x < 0 || 
                this.head.y < 0 || 
                this.head.x > this.canvasWidth ||
                this.head.y > this.canvasHeight) 
            {
                this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
                window.cancelAnimationFrame(this.ref)
            }

            // For food collision
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
    if (this.debug) {
        // Horizontal Lines 
        for (var i = 0; i < Math.round(this.canvasWidth / this.canvasGridSize); i++) {
            this.context.beginPath();
            this.context.moveTo(0, (i * this.canvasGridSize));
            this.context.lineTo(this.canvasWidth, i * this.canvasGridSize);
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
    var myGame = new Snake(document.querySelector('canvas', 5, 'snake'));    
});







