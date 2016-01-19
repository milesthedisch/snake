var map = (function () {
    var publicAPI = {
        'collision': function detection(game, coordinates) {
            'use strict';
            debugger;
            var playersArray = game.objects["players"].filter(function(players){
                return players.state['dead'] !== true;
            })
            var deadArray = game.objects['players'].filter(function(players){
                return players.state['dead'] === true;
            })
            var playersAmount = playersArray.length
            var items = game.objects["food"]
            var i = 0;
            var j = 1;
            var k = 0;
            var l = 0;
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
                    console.log('nom');
                    player.eat(game, items);
                }  
                deadArray.forEach(function(deadplayers){
                    deadplayers.positions.forEach(function(deadpos, i){
                        if (deadpos.x === player.positions[i].x && deadpos.y === player.positions[i].y) {
                            console.log('you hit a dead player')
                            player.stop();
                        }
                    });
                });
                for (k; k < playerLength; k++) {
                    if (i !== k) {
                        var opponent = playerArray[k]
                        player.positions.forEach(function(pos){
                            if (pos.x === opponent.x && pos.y === opponent.y){
                                player.stop();
                                opponent.stop();
                            }
                        })
                    }
                }
                for (j; j < playerLength; j++) {
                    if (player.tail.x === player.positions[j].x && player.tail.y === player.positions[j].y) {
                        player.stop();
                    }                                
                }
            } //End of master for loop
        }
    }
    return publicAPI

}())