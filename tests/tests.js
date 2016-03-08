// ! Should try to make this test functions inherit from the Game constuctor !

///////////////
//  Testing  //
///////////////

// TODO 

// var Tests = function (player, bounds) {
//     this.player = player || null;
//     this.bounds = bounds || null;
//     this.i = 1;
// };

var tests = (function () {
    'use strict';
   
   var i = 1;
   /*
   * @params offsets {object} top: {int}, down: {int}, right: {int}, left: {int}
   * @params direction {object} n: {int}, s: {int}, e: {int}, w: {int}
   * @params callback {function} 
   */

   var helper = function (offsets, direction, player, bounds, increment) {
        // Offsets for each players
        var top = offsets.top;
        var down = offsets.down;
        var right = offsets.right;
        var left = offsets.left;

        // Map directions
        var N = direction.n;
        var S = direction.s;
        var E = direction.e;
        var W = direction.w;
        
        // Half of the map 
        var halfX = Math.floor(bounds.gameWidth/2);
        var halfY = Math.floor(bounds.gameHeight/2);
        
        if (player.x < 1 || player.y < 1 || player.x > bounds.gameWidth || player.y > bounds.gameHeight) {
                player.clear();
        } else {
         if (player.id % 4 === 0 ) { i++; }
            if ( player.id % 2 === 0){
                if (player.id % 4 === 0){
                    // North
                  player.dy = N;
                  player.positions[0] = {x: halfX, y: halfY + top + i };
                } else {
                   // South
                  player.dy = S;
                  player.positions[0] = {x: halfX , y: halfY - down - i };
                }
            } else {
                if ((player.id + 1) % 2 === 0) {
                    if ((player.id + 1) % 4 === 0) {
                        // East
                        player.dx = E; 
                        player.positions[0] = {x: halfX - right - i, y: halfY };
                    } else {
                        // West
                        player.dx = W;
                        player.positions[0] = {x: halfX + left + i , y: halfY };
                    }  
                }
            } 
        }
   };
   var publicAPI = {
        'wallCollision' : function (player, bounds) {
          var offsets = {
            top: 1,
            right: 1,
            down: 1,
            left: 1,
          };
          var direction = {
            n: 1,
            s: -1,
            e: -1,
            w: 1
          };
          helper(offsets, direction, player, bounds);
        },
        'headOnCollision' : function (player, bounds) { 
            var halfX = Math.floor(bounds.gameWidth/2);
            var halfY = Math.floor(bounds.gameHeight/2);
            var _this = player;
            if (_this.id % 4 === 0 ) { i++ ;}
            if ( _this.id % 2 === 0){
                if (_this.id % 4 === 0){
                  _this.dy = -1;
                  _this.positions[0] = {x: halfX, y: halfY + 1 + (i - 2)};
                } else {
                  _this.dy = 1;
                  _this.positions[0] = {x: halfX , y: halfY - 1  - (i)};
                }
            } else {
                if ((_this.id + 1) % 2 === 0) {
                    if ((_this.id + 1) % 4 === 0) {
                        _this.dx = 1; 
                        _this.positions[0] = {x: halfX - 1 - (i - 1), y: halfY};
                    } else {
                        _this.dx = -1;
                        _this.positions[0] = {x: halfX + 1 + (i - 2), y: halfY};
                    }  
                }
            } 
        },
        'headOnCollision2' : function (player, bounds) {
            var halfX = Math.floor(bounds.gameWidth/2);
            var halfY = Math.floor(bounds.gameHeight/2);
            var _this = player;
            if (_this.id % 4 === 0 ) { i++ };
            if ( _this.id % 2 === 0){
                if (_this.id % 4 === 0){
                  _this.dy = -1;
                  _this.positions[0] = {x: halfX, y: halfY + 4 + (i - 2)};
                } else {
                  _this.dy = 1;
                  _this.positions[0] = {x: halfX , y: halfY - 3 - (i - 1)};
                }
            } else {
                if ((_this.id + 1) % 2 === 0) {
                    if ((_this.id + 1) % 4 === 0) {
                        _this.dx = 1; 
                        _this.positions[0] = { x: halfX - 3 - (i - 1), y: halfY } 
                    } else {
                        _this.dx = -1;
                        _this.positions[0] = {  x: halfX - 4 + (i - 2), y: halfY }   
                    }  
                }
            } 
        },
        'bodyCollision' : function (player, bounds) {
            var halfX = Math.floor(bounds.gameWidth/2);
            var halfY = Math.floor(bounds.gameHeight/2);
            var _this = player;
            if (_this.id % 4 === 0 ) { i++ };
            if ( _this.id % 2 === 0){
                if (_this.id % 4 === 0){
                  _this.dy = -1;
                  _this.positions[0] = {x: 5, y: halfY + 4 + (i - 2)}
                } else {
                  _this.dy = 1;
                  _this.positions[0] = {x: 5 , y: halfY - 3 - (i - 1)}
                }
            } else {
                if ((_this.id + 1) % 2 === 0) {
                    if ((_this.id + 1) % 4 === 0) {
                        _this.dx = 1; 
                        _this.positions[0] = {x: halfX - 2 - (i - 1), y: 5 } 
                    } else {
                        _this.dx = -1;
                        _this.positions[0] = {x: halfX + 2 + (i - 1), y: 5};
                        // _this.positions.push({x: halfX + 2 + (i), y: 5})    
                    }  
                }
            } 
        },
        'bodyCollision2' : function (player, bounds){
            var halfX = Math.floor(bounds.gameWidth/2);
            var halfY = Math.floor(bounds.gameHeight/2);
            var _this = player;
            if (_this.id % 4 === 0 ) { i++ };
            if ( _this.id % 2 === 0){
                if (_this.id % 4 === 0){
                  _this.dy = -1;
                  _this.positions[0] = {x: 5, y: 8 + (i - 2)};
                } else {
                  _this.dy = 1;
                  _this.positions[0] = {x: 5 , y: 2 - (i - 1)};
                  _this.positions.push({x: 5, y: 2 - (i)});

                }
            } else {
                if ((_this.id + 1) % 2 === 0) {
                    if ((_this.id + 1) % 4 === 0) {
                        _this.dx = 1; 
                        _this.positions[0] = {x: 3 - (i - 1), y: 5 } 
                    } else {
                        _this.dx = -1;
                        _this.positions[0] = {x: 8 + (i - 1), y: 5};
                    }  
                }
            } 
        }
    };
    return publicAPI;
})()         