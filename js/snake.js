var Snake = function(id) {
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
    this.id = id || null;    
};

Snake.prototype.eat = function (game, food) {
    'use strict';
    this.score++
    this.positions.push({x: food.x, y: food.y});
    food.init(game, game.objects['players']);
};

Snake.prototype.snakeSpawn = function (map) {
    'use strict';
    var _this = this;
    var mapOffset = {x: map.canvasWidth - 2, y: map.canvasHeight - 2};
    var x = utils.randPos(1, mapOffset.x);
    var y = utils.randPos(1, mapOffset.y);
    this.positions.pop();
    this.positions.push({x: x, y: y});
}

Snake.prototype.init = function (players, map, i) {
    'use strict';
    this.snakeSpawn(map);
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
    // Store last frames positions in positions
    this.positions = this.lastPos;
    this.dx = null;
    this.dy = null;
}

Snake.prototype.update = function (player) { 
        // Dead flag
        if (this.state['dead'] === true) return;

        // Last frame
        this.last();

        // Current frame
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






