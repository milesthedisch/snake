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
    // state
    this.state = {'dead': false};    
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
    for (var i = 0; i < length; i++) {
        this.positions.push({x: i, y: 0});
    }    
};

Snake.prototype.init = function () {
    'use strict';
    this.createSnake(4, 2, 2, 2, 2);
};

Snake.prototype.movement = function (directionX, directionY) {
    'use strict';
    this.dx = directionX;
    this.dy = directionY;
};

Snake.prototype.stop = function (){
    'use strict'
    this.state = {
        'dead': true
    }
    // this.lastFrame();
    this.dx = null;
    this.dy = null;
    console.log(this.positions)
}

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

Snake.prototype.update = function () {  
        if (this.state['dead'] === true) {
            return;
        }
        this.last();
        this.x = this.positions[0].x;
        this.y = this.positions[0].y;
        this.x += this.dx;
        this.y += this.dy;
        this.tail = this.positions.pop();
        this.tail.x = this.x;
        this.tail.y = this.y;
        this.positions.unshift(this.tail);
        this.next();

        console.log('last: ', this.lastPos, 'ghost: ', this.ghost, 'pos: ', this.positions)
};

Snake.prototype.lastFrame = function () {
    var that = this;
    this.lastPositions = this.positions;
    this.lastPositions.forEach(function(pos){
         pos.x += that.dx * -1;
         pos.y += that.dy * -1;
    })
}

Snake.prototype.last = function () {
    this.lastPos = this.positions.slice(0);
}

Snake.prototype.next = function () {
    debugger;
    this.nx = this.tail.x + this.dx;
    this.ny = this.tail.y + this.dy;
    this.ghost = {x: this.nx, y: this.ny};
}



Snake.prototype.bindEventListeners = function () {
    'use strict';

    var _this = this;
    document.onkeydown = _.throttle(function (e) {
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
    }, 50);
};







