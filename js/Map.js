var map = (function () {
    'use strict';
    var publicAPI = {
        'collision': function detection(game, coordinates) {
            var playersArray = game.objects["players"].filter(function(players){
                return players.state['dead'] !== true;
            });
            var deadArray = game.objects['players'].filter(function(players){
                return players.state['dead'] === true;
            });
            var playersAmount = playersArray.length;
            var items = game.objects["food"];
            var i = 0;
            var j = 1; 
            for (i; i < playersAmount; i++) {            
                var playerLength = playersArray[i].positions.length;
                var player = playersArray[i];
                var allOtherPlayers = playersArray.filter(function(players, m){
                    return players !== player;
                });
                if ( player.x === items.x && player.y === items.y ) {
                    console.log('nom');
                    player.eat(game, items);
                }           
                for (j; j < playerLength; j++) {
                    if (player.positions[0].x === player.positions[j].x && player.positions[0].y === player.positions[j].y)
                    {
                        console.log('hit self');
                        player.stop();
                    }                                
                }
                if (player.x < 0 || player.y < 0 || player.x > game.canvasWidth - 1 || player.y > game.canvasHeight - 1) {
                    console.log('hit map, players:', i);
                    player.stop();
                }
                deadArray.forEach(function(deadplayers){
                    deadplayers.positions.forEach(function(deadpos, a){
                        if (deadpos.x === player.positions[a].x && deadpos.y === player.positions[a].y) {
                            console.log('you hit a dead player')
                            player.stop();
                        }
                    });
                });
                allOtherPlayers.forEach(function(otherplayer){
                    if (otherplayer.state['dead'] === true) { return; }
                    if (otherplayer.dx === (player.dx * -1) && otherplayer.dy === (player.dy * -1) || player.dx === (otherplayer.dx * -1) && player.dy === (otherplayer.dy * -1)) {   
                        if ((otherplayer.lastPos[0].x === player.x && otherplayer.lastPos[0].y === player.y) || (player.lastPos[0].x === otherplayer.x && player.lastPos[0].y === otherplayer.y)){
                                    console.log('head collision', 'player:', player.positions[0], 'otherplayer:', otherplayer.positions[0],
                                                'playerGhost:', player.ghost, 'otherPlayerGhost:', otherplayer.ghost);
                                    otherplayer.stop();
                                    player.stop();
                        }
                    }
                    otherplayer.positions.forEach(function(otherPos, b){
                        player.positions.forEach(function(playerPos, k){
                            if (k !== 0) {
                                if (playerPos.x === otherPos.x && playerPos.y === otherPos.y) {
                                        console.log('you hit players body');
                                        otherplayer.stop();
                                }     
                            } else if (b !== 0) {
                                if (playerPos.x === otherPos.x && playerPos.y === otherPos.y) {
                                        console.log('you hit another players body');
                                        player.stop();
                                }   
                            } else {
                                if (playerPos.x === otherPos.x && playerPos.y === otherPos.y) {
                                        console.log('you hit another player');
                                        player.stop('merge');
                                        otherplayer.stop('merge');
                                } 
                            }
                        });
                    });
                });
            } //End of master for loop
        }
    };
    return publicAPI;

}());