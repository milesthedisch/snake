var map = (function () {
    var publicAPI = {
        'collision': function (game, coordinates) {
            'use strict';
            debugger;
            var playersArray = game.objects["players"].filter(function(players){
                return players.state['dead'] !== true;
            })
            var playersAmount = playersArray.length
            var items = game.objects["food"]
            var i = 0;
            var j = 1;
            var k = 0;
            for (i; i < playersAmount; i++) {
                var playerLength = playersArray[i].positions.length;
                var player = playersArray[i]
                    if (player.x < 0 ||
                        player.y < 0 || 
                        player.x > game.canvasWidth - 1 ||
                        player.y > game.canvasHeight - 1) {
                        console.log('hit map, players:', i);
                        player.stop();
                    }
                    else if ( player.x === items.x && player.y === items.y ) {
                        player.eat(game, items);
                    }
                // if (playersAmount > 1) {
                //     for (k; k < playersAmount; k++){
                //         if (player.x === playersArray[k].x) {
                //             player.stop();
                //             playersArray[k].stop();
                //         }
                //     }
                // }    
                for (j; j < playerLength; j++) {
                    if (player.tail.x === player.positions[j].x && player.tail.y === player.positions[j].y) {
                        player.stop();
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
    return publicAPI

}())