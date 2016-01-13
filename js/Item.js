var Food = function() {
    'use strict';
    this.x = null;
    this.y = null;
};

Food.prototype.init = function (game, players) {
    'use strict';
    this.spawn(game);
    var check = this.smart(players);
    while (!check) {
        this.spawn(game);
        check = this.smart(players);
    }
};

Food.prototype.spawn = function (game) {
    var map = {x: game.canvasWidth , y: game.canvasHeight}
    this.x = utils.randPos(0, map.x - 1);
    this.y = utils.randPos(0, map.y - 1);
};

Food.prototype.smart = function (players) {
    'use strict'
    var _this = this;
    var check = false;
    if (typeof this.x === 'number' && typeof this.y === 'number') {
        players.forEach(function(player){
            player.positions.every(function(snake){
                check = (_this.x != snake.x && _this.y != snake.y);
            });  
        });
    }
    return check;
};
