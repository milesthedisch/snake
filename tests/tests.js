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
   var publicAPI = {
        'wallCollision' : function (player, bounds) {
            var halfX = Math.floor(bounds.gameWidth/2);
            var halfY = Math.floor(bounds.gameHeight/2);
            var _this = player;
            if (_this.id % 4 === 0 ) { i++; }
            if ( _this.id % 2 === 0){
                if (_this.id % 4 === 0){
                  _this.dy = 1;
                  _this.positions[0] = {x: halfX, y: halfY + 1 + i };
                } else {
                  _this.dy = -1;
                  _this.positions[0] = {x: halfX , y: halfY - 1 - i };
                }
            } else {
                if ((_this.id + 1) % 2 === 0) {
                    if ((_this.id + 1) % 4 === 0) {
                        _this.dx = -1; 
                        _this.positions[0] = {x: halfX - 1 - i, y: halfY };
                    } else {
                        _this.dx = 1;
                        _this.positions[0] = {x: halfX + 1 + i , y: halfY };
                    }  
                }
            } 
        },
        'headOnCollision' : function (player, bounds) {
            var halfX = Math.floor(bounds.gameWidth/2);
            var halfY = Math.floor(bounds.gameHeight/2);
            var _this = player;
            if (_this.id % 4 === 0 ) { i++ };
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
                  _this.positions[0] = {x: halfX, y: halfY + 4 + (i - 2)}
                } else {
                  _this.dy = 1;
                  _this.positions[0] = {x: halfX , y: halfY - 3 - (i - 1)}
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