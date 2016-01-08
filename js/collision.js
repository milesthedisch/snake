var map = {
    'map': {
        // coordinates 
    },
    'collision' : function () {
        // 
    }   
};

var Snake = function (map) {
    this.collision = map;
};

this.collision.map(map);
this.collision.player();

Game.prototype.collision = function (options) {
    'use strict';
    var _this = this;
    switch (options) {
        case "snake" : {
            // For wall collision
            if (this.gameflag) {return;}
            if (this.dx === -1 && this.snake[0].x < 0 || 
                this.dy === -1 && this.snake[0].y < 0 || 
                this.dx === 1 && this.snake[0].x > this.canvasWidth - 1 ||
                this.dy === 1 && this.snake[0].y > this.canvasHeight - 1 
                // ||
                // this.ax === -1 && this.snake2[0].x < 0 || 
                // this.ay === -1 && this.snake2[0].y < 0 || 
                // this.ax === 1 && this.snake2[0].x > this.canvasWidth - 1||
                // this.ay === 1 && this.snake2[0].y > this.canvasHeight - 1 
                ) 
            {   
                console.log('hit wall')
                this.gameOver();
            }

            _this.snake.forEach(function(s, i){
                // check for head on collision
                // know which direction the head is moving 
                // if the snakes head is moving left check every one grid left of it.
                // if the snakes head is moving up check every one grid right of it.
                // if (i === 0) {
                //     if ((_this.dx === 1 && _this.ax === -1) && s.x + 1 === _this.snake2[0].x) {
                //         _this.gameOver();
                //         return;
                //     }
                //     if ((_this.dx === -1 && _this.ax === 1) && s.x - 1 === _this.snake2[0].x) {
                //         _this.gameOver();
                //         return;
                //     }
                //     if ((_this.dy === -1 && _this.ay === 1) && s.y - 1 === _this.snake2[0].y) {
                //         _this.gameOver();
                //         return;
                //     }
                //     if ((_this.dy === 1 && _this.ay === -1)  && s.y + 1 === _this.snake2[0].y) {
                //         _this.gameOver();
                //         return;
                //     }
                // }
                // _this.snake2.every(function(a, j){
                //     if ( a.x === s.x && a.y === s.y ){
                //         console.log('hit snake 2');
                //         _this.gameOver();
                //     }
                // });
                if ( i !== 0 ) {
                    if (s.x === _this.snake[0].x && s.y === _this.snake[0].y ) {
                        console.log('hit self')
                        _this.gameOver();
                    }      
                }
            });

            // _this.snake2.forEach(function(s, i){
            //     // check every part except the head
            //     if (i === 0) {
            //         if ((_this.dx === 1 && _this.ax === -1) && s.x + 1 === _this.snake[0].x) {
            //             _this.gameOver();
            //             return;
            //         }
            //         if ((_this.dx === -1 && _this.ax === 1) && s.x - 1 === _this.snake[0].x) {
            //             _this.gameOver();
            //             return;
            //         }
            //         if ((_this.dy === -1 && _this.ay === 1) && s.y - 1 === _this.snake[0].y) {
            //             _this.gameOver();
            //             return;
            //         }
            //         if ((_this.dy === 1 && _this.ay === -1)  && s.y + 1 === _this.snake[0].y) {
            //             _this.gameOver();
            //             return;
            //         }
            //     }
            //     _this.snake.every(function(a, j){
            //         if ( a.x === s.x && a.y === s.y ){
            //             console.log('hit other snake');
            //             _this.gameOver();
            //         }    
            //     });
            //     if ( i !== 0 ) {
            //         if (s.x === _this.snake2[0].x && s.y === _this.snake2[0].y ) {
            //             console.log('hit self')
            //             _this.gameOver();
            //         }      
            //     }
            // });

            // For food collision
            if ( this.snake[0].x === this.fx && this.snake[0].y === this.fy) {
                console.log('yum1')
                return true;
            // } else if (this.snake2[0].x === this.fx && this.snake2[0].y === this.fy) {
            //     console.log('yum2');
            //     return 'snake2';
            // } 
            } else {
                return false;
            }

            break;
        }

        // case "circle" : {

        //     // For wall collision (circle)
        //     if (this.x < (0 + this.radSnake) ||
        //         this.y < (0 + this.radSnake) || 
        //         this.x > (this.canvasWidth - this.radSnake) || 
        //         this.y > (this.canvasHeight - this.radSnake)) 
        //     {
        //         this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
        //         return true;
        //     }   

        //     //For food collision (circle)
        //     if (Math.pow(this.x - this.fx , 2) + Math.pow(this.y - this.fy, 2) <= Math.pow(this.radSnake + this.radius + 4, 2)) {
        //         return true;
        //     } else {
        //         return false;
        //     }

        //     break;
        // }
    }
};