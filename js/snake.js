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

    for (var i = length; i > 0; i--) {
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







