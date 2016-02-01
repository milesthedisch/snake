var Game = function (canvas, debug, test, players, food) {
    'use strict';
    // debuggin and testing state
    this.state = {
        'debug' : false || debug,
        'test'  : false || test
    }

    // collision objects in game
    this.objects = {
        "players" : players || [],
        "food" : food || []
    };

    // Canvas
    this.canvas = canvas;
    this.context = this.canvas.getContext('2d');    
    this.canvasWidth = 11;
    this.canvasHeight = 11;
    this.rendererHeight = this.canvas.offsetWidth;
    this.rendererWidth = this.canvas.offsetHeight;

    // Ratio for renderer and canvas 
    this.ratioWidth = this.rendererWidth / this.canvasWidth;
    this.ratioHeight = this.rendererHeight / this.canvasHeight;
    this.delay = 1000;

    // Test scripts
    this.allTests = [] || null;
    this.testCounter = 0;
};

Game.prototype.spawnCheck = function (players) {
    var _this = this;
     players.forEach(function(player, k){
        
        var otherPlayers = players.filter(function(otherPlayer){
            return otherPlayer.id !== player.id
        })

        if (otherPlayers) {
            otherPlayers.forEach(function(op){
                var opx = op.positions[0].x,
                    opy = op.positions[0].y,
                    px = player.positions[0].x,
                    py = player.positions[0].y

                if (opx === px && opy === py){
                    op.init(players, _this, op.id)
                }
            })
        }
     })   
}

Game.prototype.init = function () {
    'use strict';
    var _this = this;
    this.concatTests();
    this.objects['players'].forEach(function(player, i, players){
        player.init(players, _this, i); 
        player.bindEventListeners(_this.delay); 
        if (i === players.length - 1 && _this.state['test'] === false) { 
            _this.spawnCheck(players); 
        }
    })
    debugger;
    this.objects['food'].init(this, this.objects['players']);
    this.tick(this.delay);
    this.animate();
    console.log(this.objects.players)
    
};

Game.prototype.drawGridLines = function draw() {
    'use strict';
    if (this.state['debug']) {
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
    console.log('drawing')
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
        player.state['dead'] === true ? color = 'black' : player.id === 1 ? color = "green" : color = player.state['color']
        player.color = color;
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
    
    console.log('tick')
};

Game.prototype.update = function () {
    'use strict';
    var game = this;
    this.objects['players'].forEach(function(player, i){
        player.update(player);     
    });
    map.collision(game); 
    if (this.allDead()){
        this.testCounter++
        this.gameOver();
        if (this.state['test'] && this.testCounter < this.allTests.length) {
            this.init();
            this.drawSnakes();
        } else {
            this.gameOver();
        }
    }
}

Game.prototype.allDead = function () {
    'use strict';   
    return this.objects['players'].every(function(player){
        return player.state['dead'];
    })
};

Game.prototype.purge = function () {
    'use strict';
    var players = this.objects['players'];
        players = utils.erase(players)   
}

Game.prototype.gameOver = function () {
    'use strict';
    this.draw();
    this.timeout = this.timeout + 1
    while (this.timeout--){
        clearTimeout(this.timeout);
    }
    window.cancelAnimationFrame(this.ref);
    this.purge();
}

Game.prototype.concatTests = function () {
    'use strict';
    var testsAPI = tests        
        for (var test in testsAPI) {
            if (tests.hasOwnProperty(test)) {
                this.allTests.push(testsAPI[test]);
            }
        }
}

    