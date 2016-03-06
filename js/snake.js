var Snake = function player(id, dx, dy) {
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
    this.color = null;
};

Snake.prototype.eat = function (game, food) {
    'use strict';
    this.score++;
    this.positions.push({x: food.x, y: food.y});
    food.init(game, game.objects['players']);
};

Snake.prototype.snakeRandSpawn = function (map) {
    'use strict';
    var mapOffset = {x: map.gameWidth - 2, y: map.gameHeight - 2};
    var x = utils.randPos(1, mapOffset.x);
    var y = utils.randPos(1, mapOffset.y);
    this.positions.pop();
    this.positions.push({x: x, y: y});
};

Snake.prototype.init = function (players, map, i) {
    'use strict';
    if (map.state.test) {
        this.testSpawn(this, map);
    } else {
        this.snakeRandSpawn(map);       
    }
};

Snake.prototype.testSpawn = function (player, map) {
    'use strict';
    var test = map.allTests[map.testCounter];
        test(this, map);
};

Snake.prototype.movement = function (directionX, directionY) {
    'use strict';
    this.dx = directionX;
    this.dy = directionY;
};

Snake.prototype.stop = function (collisionType){
    'use strict';
    if (collisionType !== 'merge') {
        // Store last frames positions in positions
        this.positions = this.lastPos;    
    }
    this.state = {
        'dead': true
    };
    this.dx = null;
    this.dy = null;
};

Snake.prototype.clear = function () {
   var keys = Object.keys(this);
   for (var val in keys) {
        keys[val] = undefined;
   }
};

Snake.prototype.update = function (player) { 
        // Dead flag
        if (this['state']['dead'] === true) return;

        // Last frame
        this.last();

        // Current frame

        // Head of snake are this.x and this.y.
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
    this.lastPos = null;
    this.lastPos = utils.deepCopy(this.positions);
};

Snake.prototype.next = function () {
    this.ghost = {x: this.tail.x + this.dx, y: this.tail.y + this.dy};
    this.nextPos = utils.deepCopy(this.positions);
    this.nextPos.shift();
    this.nextPos.unshift(this.ghost);
};








