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
    this.delay = 1000;
};

Game.prototype.init = function () {
    'use strict';
    var _this = this;
    debugger;
    this.objects['players'].forEach(function(player, i, players){
        player.init(players, _this, i);
        player.bindEventListeners(_this.delay);
    });


    // Take this out of Game constuctor soon!!
    for (var i = 0; i < this.objects['players'].length; i++) {
        for (var k = 1; k < this.objects['players'].length; k++){
            if (this.objects['players'][i].positions[0].x === this.objects['players'][k].positions[0].x && this.objects['players'][i].positions[0].y === this.objects['players'][k].positions[0].y){
                this.objects['players'][i].init(this.objects['players'], this, i);
            }
        }
    }



    this.objects['food'].init(this, this.objects['players']);
    this.tick(this.delay);
    this.animate();
};

Game.prototype.drawGridLines = function draw() {
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
        player.state['dead'] === true ? color = 'grey' : color = 'green'
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
