var Snake = function(id, dx, dy) {
    'use strict';
    // If i want snakes
    this.positions = []; 
    // Positional values
    this.dx = dx || 0;
    this.dy = dy || 0; 
    // Score
    this.score = null; 
    // state
    this.state = {
        'dead': false, 
        'color': utils.randColor()
    };
    this.id = parseInt(1 + id) || null;    
    // Color
    this.color;
};

Snake.prototype.eat = function (game, food) {
    'use strict';
    this.score++
    this.positions.push({x: food.x, y: food.y});
    food.init(game, game.objects['players']);
};

Snake.prototype.snakeRandSpawn = function (map) {
    'use strict';
    var mapOffset = {x: map.canvasWidth - 2, y: map.canvasHeight - 2};
    var x = utils.randPos(1, mapOffset.x);
    var y = utils.randPos(1, mapOffset.y);
    this.positions.pop();
    this.positions.push({x: x, y: y});
}

Snake.prototype.init = function (players, map, i) {
    'use strict';
    if (map.state['test']) {
        this.testSpawn(this);
    } else {
        this.snakeRandSpawn(map);       
    }
};

Snake.prototype.testSpawn = function (player, map) {
    'use strict';
    tests.headOnCollision3(player);
}

Snake.prototype.movement = function (directionX, directionY) {
    'use strict';
    this.dx = directionX
    this.dy = directionY;
};

Snake.prototype.stop = function (collisionType){
    'use strict'
    if (collisionType !== 'merge') {
        // Store last frames positions in positions
        this.positions = this.lastPos;    
    }
    this.state = {
        'dead': true
    }
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
    this.ghost = {x: this.tail.x + this.dx, y: this.tail.y + this.dy};
    this.nextPos = utils.deepCopy(this.positions);
    this.nextPos.shift();
    this.nextPos.unshift(this.ghost);
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






