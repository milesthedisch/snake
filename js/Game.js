var Game = function (canvas, debug, test, players, food) {
    'use strict';
    this.debug = debug || false;
    this.objects = {
        "players" : players || [],
        "food" : food || []
    };
    // Canvas
    this.canvas = canvas;
    this.context = this.canvas.getContext('2d');    
    this.canvasWidth = 40;
    this.canvasHeight = 40;
    this.rendererHeight = this.canvas.offsetWidth;
    this.rendererWidth = this.canvas.offsetHeight;

    // Ratio for renderer and canvas 
    this.ratioWidth = this.rendererWidth / this.canvasWidth;
    this.ratioHeight = this.rendererHeight / this.canvasHeight;
};

Game.prototype.init = function () {
    'use strict';
    debugger;
    this.objects['players'].forEach(function(player){
        player.init();
        player.bindEventListeners();
    });
    this.objects['food'].smartSpawn(this, this.objects['players']);
     // !! For now just have one player later add an array and loops;
    
    this.tick(100);
    this.animate();
};

// Game.prototype.gameOver = function (deadPlayer) {
//     this.objects["players"][deadPlayer].stop();
// };

Game.prototype.drawGridLines = function () {
    'use strict';
    if (this.debug) {
        // Horizontal Lines 
        for (var i = 0; i < this.rendererWidth; i = i + this.ratioWidth) {
            this.context.beginPath();
            this.context.moveTo(0, i);
            this.context.lineTo(this.rendererWidth, i);
            this.context.closePath();
            this.context.stroke();
         }
        // Vertical lines
        for (var j = 0; j < this.rendererHeight; j = j + this.ratioHeight) {
            this.context.beginPath();
            this.context.moveTo(j, 0);
            this.context.lineTo(j, this.rendererHeight);
            this.context.closePath();
            this.context.stroke();
        }
    }
};

Game.prototype.animate = function () {
    'use strict';
    this.draw();
    this.ref = window.requestAnimationFrame(this.animate.bind(this));
};

Game.prototype.draw = function () {
    'use strict';
    var _this = this;
    //clear every frame
    this.context.clearRect(0, 0, this.rendererWidth,this.rendererHeight);
    this.context.fillStyle = '#ffffff';
    // Drawing snake //
    this.drawSnakes();    
    // Drawing Grid //
    this.drawGridLines(); 
    // Draw food //
    this.context.fillStyle = 'red';
    this.context.fillRect(this.objects['food'].x * this.ratioWidth, this.objects['food'].y * this.ratioHeight, this.ratioWidth, this.ratioHeight);
};

Game.prototype.drawSnakes = function (color) {
    'use strict';
    var _this = this;
    this.objects['players'].forEach(function(player){
        player.positions.forEach(function(s){
            _this.context.fillStyle = color || 'green';
            _this.context.fillRect(s.x * _this.ratioWidth, s.y * _this.ratioHeight, _this.ratioWidth, _this.ratioHeight);    
        });
    });
};

Game.prototype.tick = function (delay) {
    'use strict';
    var _this = this;
    this.timeout = setTimeout(_this.tick.bind(this, delay), delay);
    this.update(); 
};

Game.prototype.update = function () {
    'use strict';
    var game = this;
    this.objects['players'].forEach(function(player){
        player.update(player);
    });
    map.collision(game);
};

Game.prototype.lastFrame = function (player) {
    
}