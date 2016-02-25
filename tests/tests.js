// Test one head on collision

// Collide the snakes head on with each other.
// The snakes head should merge into one pixel.

// ! Should try to make this test functions inherit from the Game constuctor !

///////////////
//  Testing  //
///////////////
var tests = (function () {
    'use strict';
   var i = 1;
   var publicAPI = {
        'wallCollision' : function (player, bounds) {
            // WIP: Map offset to test diffrent size maps.
            var _this = player;
            if (_this.id % 4 === 0 ) { i++ };
            if ( _this.id % 2 === 0){
                if (_this.id % 4 === 0){
                  _this.dy = 1;
                  _this.positions[0] = {x: 5, y: 6 + (i - 2 - 1)};
                } else {
                  _this.dy = -1;
                  _this.positions[0] = {x: 5 , y: 4 - (i - 1) - 1};
                }
            } else {
                if ((_this.id + 1) % 2 === 0) {
                    if ((_this.id + 1) % 4 === 0) {
                        _this.dx = -1; 
                        _this.positions[0] = {x: 4 - (i - 1) - 1, y: 5 } 
                    } else {
                        _this.dx = 1;
                        _this.positions[0] = {x: 6 + (i - 1) - 1, y: 5};
                    }  
                }
            } 
        },
        'headOnCollision' : function (player) {
            var offset = 1 || offset;
            var _this = player;
            if (_this.id % 4 === 0 ) { i++ };
            if ( _this.id % 2 === 0){
                if (_this.id % 4 === 0){
                  _this.dy = -1;
                  _this.positions[0] = {x: 5, y: 6 + (i - 2)}
                } else {
                  _this.dy = 1;
                  _this.positions[0] = {x: 5 , y: 4 - (i)}
                }
            } else {
                if ((_this.id + 1) % 2 === 0) {
                    if ((_this.id + 1) % 4 === 0) {
                        _this.dx = 1; 
                        _this.positions[0] = {x: 4 - (i - 1), y: 5 } 
                    } else {
                        _this.dx = -1;
                        _this.positions[0] = {x: 6 + (i - 2), y: 5}
                    }  
                }
            } 
        },
        'headOnCollision2' : function (player) {
            var offset = 1 || offset;
            var _this = player;
            if (_this.id % 4 === 0 ) { i++ };
            if ( _this.id % 2 === 0){
                if (_this.id % 4 === 0){
                  _this.dy = -1;
                  _this.positions[0] = {x: 5, y: 9 + (i - 2)}
                } else {
                  _this.dy = 1;
                  _this.positions[0] = {x: 5 , y: 2 - (i - 1)}
                }
            } else {
                if ((_this.id + 1) % 2 === 0) {
                    if ((_this.id + 1) % 4 === 0) {
                        _this.dx = 1; 
                        _this.positions[0] = {x: 2 - (i - 1), y: 5 } 
                    } else {
                        _this.dx = -1;
                        _this.positions[0] = {x: 9 + (i - 2), y: 5}   
                    }  
                }
            } 
        },
        'bodyCollision' : function (player) {
            var offset = 1 || offset;
            var _this = player;
            if (_this.id % 4 === 0 ) { i++ };
            if ( _this.id % 2 === 0){
                if (_this.id % 4 === 0){
                  _this.dy = -1;
                  _this.positions[0] = {x: 5, y: 9 + (i - 2)}
                } else {
                  _this.dy = 1;
                  _this.positions[0] = {x: 5 , y: 2 - (i - 1)}
                }
            } else {
                if ((_this.id + 1) % 2 === 0) {
                    if ((_this.id + 1) % 4 === 0) {
                        _this.dx = 1; 
                        _this.positions[0] = {x: 3 - (i - 1), y: 5 } 
                    } else {
                        _this.dx = -1;
                        _this.positions[0] = {x: 7 + (i - 1), y: 5}
                        _this.positions.push({x: 7 + (i), y: 5})    
                    }  
                }
            } 
        },
        'bodyCollision2' : function (player){
            var offset = 1 || offset;
            var _this = player;
            if (_this.id % 4 === 0 ) { i++ };
            if ( _this.id % 2 === 0){
                if (_this.id % 4 === 0){
                  _this.dy = -1;
                  _this.positions[0] = {x: 5, y: 8 + (i - 2)}
                } else {
                  _this.dy = 1;
                  _this.positions[0] = {x: 5 , y: 2 - (i - 1)}
                  _this.positions.push({x: 5, y: 2 - (i)})

                }
            } else {
                if ((_this.id + 1) % 2 === 0) {
                    if ((_this.id + 1) % 4 === 0) {
                        _this.dx = 1; 
                        _this.positions[0] = {x: 3 - (i - 1), y: 5 } 
                    } else {
                        _this.dx = -1;
                        _this.positions[0] = {x: 8 + (i - 1), y: 5}
                    }  
                }
            } 
        }
    }

    return publicAPI;
})()         