var utils = (function IIFE(global) {
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

        'playerFactory' : function (length, dx, dy) {
            var players = [];
            console.log(dx, dy);
            for (var i = length; 0 < i; --i) {
                players.push(new Snake(i, dx, dy));
            }
            return players;
        },

        'itemFactory' : function (length) {
            var items = [];
            for (var i = length; 0 < i; --i) {
                items.push(new Food(i));
            }
            return items;
        },

        'randomSet': function () {
            var set = {};
            set.x = Math.round(Math.random()) ? Math.round(Math.random()) * -1 : Math.round(Math.random());
            set.y = set.x ? 0 : Math.round(Math.random()) ? -1 : 1;
            return set;
        }
    };
    return publicAPI;
})(window || window.document);
