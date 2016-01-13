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

Snake.prototype.eat = function (game, food) {
    'use strict';
    debugger;
    this.score++
    this.positions.push({x: food.x, y: food.y});
    food.init(game, game.objects['players']);
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

Snake.prototype.stop = function (game){
    'use strict'
    this.state = {
        'dead': true
    }
    // Deleted exsiting positions
    this.positions.splice(0);
    // Store last frames positions in positions
    this.positions = this.lastPos;
    this.dx = null;
    this.dy = null;
}

Snake.prototype.update = function (player) { 
        if (this.state['dead'] === true) {
            return;
        }
        // Last frame
        this.last();

        this.x = this.positions[0].x;
        this.y = this.positions[0].y;
        this.x += this.dx;
        this.y += this.dy;
        this.tail = this.positions.pop();
        this.tail.x = this.x;
        this.tail.y = this.y;
        this.positions.unshift(this.tail);

        // Next Frame
        this.next();
};

Snake.prototype.last = function () {
    this.lastPos = utils.deepCopy(this.positions);
}

Snake.prototype.next = function () {
    this.nx = this.tail.x + this.dx;
    this.ny = this.tail.y + this.dy;
    this.ghost = {x: this.nx, y: this.ny};
}

Snake.prototype.bindEventListeners = function (delay) {
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
    }, delay);
};




