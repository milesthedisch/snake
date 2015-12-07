// Snake Constructor
var Snake = function (canvas) {
    'use strict';

    // Values
    this.canvas = canvas;
    this.context = this.canvas.getContext('2d');
    this.canvasWidth = canvas.getOffsetWidth;
    this.canvasHeight = this.getOffsetHeight;
    this.canvasGridSize = 10;
    this.x = 200;
    this.y = 100;
    this.dx = 0;
    this.dy = 0;
    this.fx = this.randPos(30, 640 - 30);
    this.fy = this.randPos(30, 640 - 30);
    this.radSnake = 50;
    this.radius = 30;

    // Call init
    this.init();
};

Snake.prototype.init = function () {
    'use strict';

    this.animate();
};

Snake.prototype.animate = function () {
    'use strict';

    this.draw();
    window.requestAnimationFrame(this.animate.bind(this));
};

Snake.prototype.movement = function (directionX, directionY) {
    'use strict';

    this.dx = directionX;
    this.dy = directionY;
};

Snake.prototype.randPos = function (min, max) {
    'use strict';

    return Math.floor(Math.random() * (max - min + 1)) + min;
};

Snake.prototype.drawCircle = function (centerX, centerY, radius, colour) {
    'use strict';

    this.context.beginPath();
    this.context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
    this.context.fillStyle = colour;
    this.context.fill();
};

Snake.prototype.draw = function () {
    'use strict';

    // X and y are bound by the canavs height and width

    if (this.x < (0 + this.radSnake) || this.y < (0 + this.radSnake) || this.x > (this.canvasWidth - this.radSnake) || this.y > (this.canvasHeight - this.radSnake))  {
        this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
        window.cancelAnimationFrame(reqAnimId);
        console.log("DEAD!");
        return;
    }

    // c.clearRect(0,0,canvas.width,canvas.height);

    this.context.fillStyle = '#87CEEB';

    // x += dx;
    // y += dy;

    /*
    snake.forEach(function(snk, i){
        drawCircle(snk.x, snk.y, radSnake, "skyblue")
        snk.unshift()
        snk.push({x: x, y: y})
    })
    */
    
    // make grid //
    this.grid(this.canvasWidth, this.canvasHeight, this.canvasGridSize)
    //  [][][]  //

    this.drawCircle(this.x, this.y, this.radSnake, "skyblue");

    this.drawCircle(this.fx, this.fy, this.radius, "red");
    //check for food being eaten
    // eat(eatCheck())
    // eat(eatCheck())
};

Snake.prototype.eatCheck = function () {
    'use strict';

    if (Math.pow(this.x - this.fx , 2) + Math.pow(this.y - this.fy, 2) <= Math.pow(this.radSnake + this.radius + 4, 2)) {
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

    for (var i = 0; i < Math.floor(this.canvasWidth / this.canvasGridSize); i++) {
        this.context.beginPath();
        this.context.moveTo(0, i * this.canvasGridSize);
        this.context.lineTo(0, this.canvasWidth);
        this.context.stroke();
    }

    // Vertical lines
    for (var j = 0; j < Math.floor(this.canvasHeight / this.canvasGridSize); j++) {
        this.context.beginPath();
        this.context.moveTo(j * this.canvasGridSize, 0);
        this.context.lineTo(this.canvasHeight, 0);
        this.context.stroke();
    }
};

Snake.prototype.bindEventListeners = function () {
    'use strict';

    document.onkeypress = function (e) {

        var key = String.fromCharCode(e.keycode);

        switch (key) {
            case 'W': {
                this.movement(0, -1);
                break;
            }

            case 'A': {
                this.movement(-1, 0);
                break;
            }

            case 'S': {
                this.movement(0, 1);
                break;
            }

            case 'D': {
                this.movement(1, 0);
                break;
            }
        }
    };
};

var myGame = new Snake(document.querySelector('canvas'));