// Snake Constructor
var Snake = function (canvas) {
    'use strict';
    // Values
    this.canvas = canvas;
    this.context = this.canvas.getContext('2d');
    this.canvasWidth = this.canvas.offsetWidth;
    this.canvasHeight = this.canvas.offsetHeight;
    this.canvasGridSize = 10;

    this.x = 200;
    this.y = 100;
    this.dx = 0;
    this.dy = 1;
    this.fx = this.randPos(30, 640 - 30);
    this.fy = this.randPos(30, 640 - 30);
    this.radSnake = 50;
    this.radius = 30;

    this.snake = [];

    // Call init
    this.init();
};

Snake.prototype.init = function () {
    'use strict';
    var length = 5;     
    for (var i = length - 1; i >= 0; i--) {
        this.snake.push({x: i * this.canvasGridSize, y: 0})
    }

    this.bindEventListeners();
    this.animate()
};

Snake.prototype.animate = function () {
    'use strict';   
    var _this = this
    this.ref = window.requestAnimationFrame(_this.animate.bind(_this))  
    if (this.update() === true) {
       window.cancelAnimationFrame(this.ref)
    } 

    this.update();

    this.draw();
};

Snake.prototype.movement = function (directionX, directionY) {
    'use strict';

    this.dx = directionX;
    this.dy = directionY;
};

Snake.prototype.randPos = function (min, max) {
    'use strict';
    if (typeof min === 'number' && typeof max === 'number') {
        return Math.floor(Math.random() * (max - min + 1)) + min;    
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
    this.context.fillRect(0,0, this.canvasWidth, this.canvasHeight)

    var _this = this;

    var nx = this.snake[0].x 
    var ny = this.snake[0].y
    
    var nx = nx + this.dx * 10; 
    var ny = ny + this.dy * 10;

    var tail = this.snake.pop();
    tail.x = nx
    tail.y = ny
    this.snake.unshift(tail)

    this.snake.forEach(function(s){
        _this.context.fillStyle = 'green'
        _this.context.fillRect(s.x, s.y, _this.canvasGridSize, _this.canvasGridSize)     
    })
}

Snake.prototype.draw = function () {
    'use strict';
    var _this = this;

    //clear every frame
    this.context.clearRect(0,0,canvas.width,canvas.height);

    this.context.fillStyle = '#ffffff';

    // Drawing snake //
    this.drawSnake()

    // Drawing Grid //
    this.drawGridLines(this.canvasWidth, this.canvasHeight, this.canvasGridSize)

    // Draw moving circles //
    this.drawCircle(this.x, this.y, this.radSnake, "skyblue");

    this.drawCircle(this.fx, this.fy, this.radius, "red");
};

Snake.prototype.update = function () {
    'use strict';
    var head = this.snake[0]
    // X and y are bound by the canavs height and width.
    // edge collition detection.

    if (this.x < (0 + this.radSnake) ||
        this.y < (0 + this.radSnake) || 
        this.x > (this.canvasWidth - this.radSnake) || 
        this.y > (this.canvasHeight - this.radSnake)) {
        this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
        return true;
    }

    if (head.x < 0 || 
        head.y < 0 || 
        head.x > this.canvasWidth ||
        head.y > this.canvasHeight) {
        this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
        return true;
    }

    this.x += this.dx
    this.y += this.dy

    this.eat(this.eatCheck())
}

Snake.prototype.eatCheck = function () {
    'use strict';

    if (Math.pow(this.x - this.fx , 2) + Math.pow(this.y - this.fy, 2) <= Math.pow(this.radSnake + this.radius + 4, 2)) {
        console.log('nom')
        return true;
    }

    else {
        return false;
    }
};

Snake.prototype.eat = function (check) {
    'use strict';
    if (check) {
        var yTmp = this.randPos(30, 640 - 30);
        var xTmp = this.randPos(30, 640 - 30);
        var checker = Math.pow(this.x - xTmp , 2) + Math.pow(this.y - yTmp, 2) <= Math.pow(this.radSnake + this.radius, 2);
        if (!checker && check) {
            this.fy = yTmp;
            this.fx = xTmp;
            this.radSnake += 5;
            console.log('nom');

            return;
        }

        else if (checker) {
            this.eat();

            return;
        }
    }
};

Snake.prototype.drawGridLines = function () {
    'use strict';
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
};

Snake.prototype.bindEventListeners = function () {
    'use strict';

    var _this = this;
    document.onkeypress = function (e) {

        var key = String.fromCharCode(e.keyCode);

        switch (true) {
            case ('w' === key && _this.dy != -1): {
                _this.movement(0, -1);
                break;
            }

            case ('a' === key && _this.dx != 1): {
                _this.movement(-1, 0);
                break;
            }

            case ('s' === key && _this.dy != 1): {
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

window.addEventListener('DOMContentLoaded', function(){
    var myGame = new Snake(document.querySelector('canvas'));    
});

