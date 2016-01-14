var map = (function () {
    var publicAPI = {
        'collision': function (game, coordinates) {
            'use strict';
            var playersAmount = game.objects["players"].length
            var playersArray = game.objects["players"]
            var items = game.objects["food"]
            var i = 0;
            var j = 1;
            var k = 0;
            for (i; i < playersAmount; i++) {
                var playerLength = playersArray[i].positions.length
                if (playersArray[i].state.dead !== true)   
                    if (playersArray[i].x < 0 ||
                        playersArray[i].y < 0 || 
                        playersArray[i].x > game.canvasWidth - 1 ||
                        playersArray[i].y > game.canvasHeight - 1) {
                        console.log('hit map, players:', i);
                        playersArray[i].stop();
                    }
                    else if ( playersArray[i].x === items.x && playersArray[i].y === items.y ) {
                        playersArray[i].eat(game, items);
                    }
                if (playersAmount > 1) {
                    for (k; k < playersAmount; k++){
                        if (playersArray[i].x === playersArray[k].x) {
                            playersArray[i].stop();
                            playersArray[k].stop();
                        }
                    }
                }    
                for (j; j < playerLength; j++) {
                 if (playersArray[i].state['dead'] === true) return;
                    if (playersArray[i].x === playersArray[i].positions[j].x && playersArray[i].y === playersArray[i].positions[j].y) {
                        debugger;
                        playersArray[i].stop();
                    }                                
                }
            }
        }
    }
        // _this.snake.forEach(function(s, i){
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
                //     if ( i !== 0 ) {
                //         if (s.x === _this.snake[0].x && s.y === _this.snake[0].y ) {
                //             console.log('hit self')
                //             _this.gameOver();
                //         }      
                //     }
                // });

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

                // break;
            // }
        // }
    // };

    // var map = {
    //     'map': {
    //         // coordinates 
    //     },
    //     'collision' : function () {
    //         // 
    //     }   
    // };

    // var Game = function (map) {
    //     this.collision = map;
    // };

    // this.collision.map(map);
    // this.collision.player();

    return publicAPI

}())