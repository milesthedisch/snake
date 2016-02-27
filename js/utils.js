var utils = (function IIFE() {
    'use strict';
    var publicAPI = {

        'keyPress' : function (e) {
            switch (e.keyCode) {
                case 37: {
                    return 'left';
                }
                case 38: {
                    return 'up';
                } 
                case 39: { 
                    return 'right';
                }
                case 40: {
                    return 'down';
                }
            }

            return (String.fromCharCode(e.keyCode)).toLowerCase();
        },

        'randPos' : function (min, max) {
            if (typeof min === 'number' && typeof max === 'number') {
                return Math.floor(Math.random() * (max - min + 1)) + min;    
            }
        },

        'randColor' : function () {
            var letters = '0123456789ABCDEF'.split('');
            var color = '#';
            for (var i = 0; i < 6; i++ ) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            return color.toString();
        },  

        'deepCopy' : function (arr) {
            var out = [];
            for (var i = 0, len = arr.length; i < len; i++) {
                var item = arr[i];
                var obj = {};
                for (var k in item) {
                    obj[k] = item[k];
                }
                out.push(obj);
            }
            return out;
        },

        'erase' : function (arr) {
            return arr.map(function(value){
                value.state.dead = false;
                return value.positions.splice(value.positions.length);
            });
        },

        'logCollision' : function (player, collision) {
            collision = collision.constructor.name;
            if (typeof player === 'object'){
                Object.keys(player).find(function(val){
                   if (val === "id") player = player[val];
                });
            } else {
              player = player.constructor.name;
            }
            console.log(player, + " HIT: " + collision);
        },

        'playerFactory' : function (length) {
            var players = [];
            for (var i = 0; i < length; i++){
                player[i] = new Snake(i);
                // players[i].dx = i % 2 === 0 ? 1 : -1;
                // players[i].dy = i % 2 === 0 ? -1 : 1;
            }       
            return players;
        } 

    };

    return publicAPI;
})();
