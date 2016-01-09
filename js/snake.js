// var utils = module.import('utils.js') // need browserify

var Snake = function() {
    'use strict';
    // If i want snakes
    this.positions = []; 
    // Positional values
    this.dx = 0;
    this.dy = 1; 
    // Score
    this.score = null;     
};

var Circle = function() {
    'use strict';
    // If i want circles
    this.x = null;
    this.y = null;

    this.radSnake = 5;
    this.radius = 3;    
};

Snake.prototype.createSnake = function (length, x, y, x2, y2) {
    'use strict';

    for (var i = 0; i <= length; i++) {
        this.positions.push({x: i, y: 0});
    }    
};

Snake.prototype.init = function () {
    'use strict';
    this.createSnake(3, 2, 2, 2, 2);
};

Snake.prototype.movement = function (directionX, directionY) {
    'use strict';

    this.dx = directionX;
    this.dy = directionY;
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

Snake.prototype.bindEventListeners = function () {
    'use strict';

    var _this = this;
    document.onkeydown = function (e) {
        var key = utils.keyPress(e);
        console.log(key)
        switch (true) {
            case ('w' === key && _this.dy != 1): {
                _this.movement(0, -1)
                break;
            }

            case ('a' === key && _this.dx != 1): {
                _this.movement(-1, 0)
                break;
            }

            case ('s' === key && _this.dy != -1): {
                _this.movement(0, 1)
                break;
            }

            case ('d' === key && _this.dx != -1): {
                _this.movement(1, 0)
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







