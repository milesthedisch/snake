var Game = function (canvas, options, debug, test) {
    'use strict';

    this.gameflag = null;    

    this.test = test || false;
    this.debug = debug || false;

    // canvas
    this.canvas = canvas;
    this.options = options || 'snake';
    this.context = this.canvas.getContext('2d');    
    this.canvasWidth = 40;
    this.canvasHeight = 40;
    this.rendererHeight = this.canvas.offsetWidth;
    this.rendererWidth = this.canvas.offsetHeight;
    this.ratioWidth = this.rendererWidth / this.canvasWidth;
    this.ratioHeight = this.rendererHeight / this.canvasHeight;
    this.players = [];
};

Game.prototype.init = function (player1, mice) {
    'use strict';
    this.food = mice;

    if (this.test) {
        // this.headOnCollision(1, 0, 5, this.canvasWidth / 2);
        this.wallCollision(-1, 0, 5, this.canvasWidth / 2);
        // this.nearMiss(9, 9);
    } else {
        this.players.push(player1);
        this.food.smartSpawn(this, this.players);
        // For now just have one player later add an array;
        player1.bindEventListeners();
        this.tick(100);
        this.animate();
    }
};

Game.prototype.gameOver = function () {
    this.gameflag = true;
    clearTimeout(this.timeout);
    window.cancelAnimationFrame(this.ref);
    this.draw('dead');
    this.drawGridLines();
};

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

Game.prototype.draw = function (dead) {
    'use strict';
    var _this = this;
    //clear every frame
    this.context.clearRect(0, 0, this.rendererWidth,this.rendererHeight);

    this.context.fillStyle = '#ffffff';

    // Drawing snake //
    if (dead === "dead"){
        this.drawSnakes('#777777',"dead");
    } else {
        this.drawSnakes();    
    }

    // Drawing Grid //
    this.drawGridLines();

    // Draw food //
    this.context.fillStyle = 'red';
    this.context.fillRect(this.food.x * this.ratioWidth, this.food.y * this.ratioHeight, this.ratioWidth, this.ratioHeight);
   
};

Game.prototype.drawSnakes = function (color) {
    'use strict';
    var _this = this;
        this.players.forEach(function(player){
            player.positions.forEach(function(s){
                _this.context.fillStyle = color || 'green';
                _this.context.fillRect(s.x * _this.ratioWidth, s.y * _this.ratioHeight, _this.ratioWidth, _this.ratioHeight);    
            });
        })
};

Game.prototype.tick = function (delay) {
    'use strict';
    if (this.gameflag === true) return;
    var _this = this;
    this.timeout = setTimeout(_this.tick.bind(this, delay), delay);
    this.update(); 
};

Game.prototype.update = function (dead) {
    'use strict';
    this.players.forEach(function(player){

        player.nx = player.positions[0].x;
        player.ny = player.positions[0].y;

        player.nx += player.dx;
        player.ny += player.dy;

        player.tail = player.positions.pop();
        player.tail.x = player.nx;
        player.tail.y = player.ny;

        player.positions.unshift(player.tail);

    })

    if (this.debug) {
        this.update();
        this.context.clearRect(0, 0, this.rendererWidth,this.rendererHeight);
        this.context.fillStyle = '#ffffff';
        this.draw();
    }
};