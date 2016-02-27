var map = (function (ut) {
    'use strict';
    var publicAPI = {
        'collision': function detection(game, coordinates) {
            // Filters out the player that are no dead on each update frame.
            var playersArray = game.objects["players"].filter(function(players){
                return players.state['dead'] !== true;
            });

            // Filters out the players that are dead on each update frame.
            var deadArray = game.objects['players'].filter(function(players){
                return players.state['dead'] === true;
            });

            // Set up constants before major loop.
            var playersAmount = playersArray.length;
            var items = game.objects["food"];
            var i = 0;
            var j = 1; 

            // For loop that loops through each player in the players array.
            for (i; i < playersAmount; i++) {   
                
            // Takes that player length of positions.
                var playerLength = playersArray[i].positions.length;
                var player = playersArray[i];
                if (player.state.dead) continue;  

            // Filters out all players that are not the current player.   
                var allOtherPlayers = playersArray.filter(function(players, m){
                    return players !== player;
                });       

            // For the amount of the positions that are on the snake loop through each.
                for (j; j < playerLength; j++) {
                    if (player.positions[0].x === player.positions[j].x && player.positions[0].y === player.positions[j].y)
                    {
                        console.log('HIT SELF');
                        player.stop();
                    }  
                }

             // If current player is less than the bounds of the map then 
                if (player.x < 0 || player.y < 0 || player.x > game.canvasWidth - 1 || player.y > game.canvasHeight - 1) {
                    console.log('players:', player.id, "HIT MAP");
                    player.stop();
                }

            // Go through the filtered array of dead players and for each dead position  
                player.positions.forEach(function(pos,i,tion){
                    deadArray.forEach(function(zom,b,ie){
                        zom.positions.forEach(function(tomb,s,tone){
                            if (tomb.x === pos.x && tomb.y === pos.y) {
                                player.stop();
                            }
                        });
                    });
                });
                allOtherPlayers.forEach(function(otherplayer){
                    // if (otherplayer.state['dead'] === true) { return; }
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
                                        console.log('HIT players BODY');
                                        otherplayer.stop();
                                }     
                            } else if (b !== 0) {
                                if (playerPos.x === otherPos.x && playerPos.y === otherPos.y) {
                                        console.log('HIT players BODY');
                                        player.stop();
                                }   
                            } else {
                                if (playerPos.x === otherPos.x && playerPos.y === otherPos.y) {
                                    if (player.state.dead){
                                        console.log(otherplayer.id, " HIT DEADPLAYER ", player.id);
                                        otherplayer.stop();
                                    } else if (otherplayer.state.dead){
                                        console.log(player.id, " HIT DEADPLAYER ", otherplayer.id);
                                        player.stop();
                                    } else {
                                        console.log(player.id , " MERGE HIT " , otherplayer.id);
                                        player.stop('merge');
                                        otherplayer.stop('merge');
                                    }
                                } 
                            }
                        });
                    });
                });

            // If current player position match the position of the food eat.
                if ( player.x === items.x && player.y === items.y ) {
                    ut.logCollision(player, items);
                    // ut.logCollision(player, items);
                    player.eat(game, items);
                } 
            } //End of master for loop
        }
    };
    return publicAPI;

}(utils));