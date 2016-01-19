// Test one head on collision

// Collide the snakes head on with each other.
// The snakes head should merge into one pixel.

///////////////
//  Testing  //
///////////////
var Tests = (function () {
    'use strict';
   var publicAPI = {

        'wallCollision' : function (id) {
            switch (this.id) {
                case this.id % 2 === 0:
                    if (this.id === 2){
                      this.dx = 1;
                    } else if (this.id === 0) {
                      this.dx = -1;
                    } else {
                      this.id % 4 === 0 ? this.dx = -1 : this.dx = 1;
                    }
                    break;
                case this.id % 2 !== 0:
                    this.id % 3 === 0 ? this.dy = 1 : this.dy = -1;
                    break; 
            }
            // this.position.push({x: })
            this.tick(1000);
        },

        'headOnCollision' : function (dirX, dirY, x, y ) {
            
            this.dx = dirX;
            this.dy = dirY || 0;

            this.ax = -(dirX);
            this.ay = dirY || 0;

            this.createSnake(1, x, y, x, y);
            this.tick(1000);
            this.animate();
        },

        'nearMiss' : function (x, y) {

            this.dx = -1;
            this.dy = 0;

            this.ax = 0;
            this.ay = -1;

            this.createSnake(1, x + 2, y, x, y + 2);

            this.tick(1000);
            this.animate();
        },

        'nearMiss2' : function (x, y) {

            this.dx = 1;
            this.dy = 0;

            this.ax = 0;
            this.ay = 1;

            this.createSnake(1, x - 1, y + 1, x - 1, y - 1);

            this.tick(1000);
            this.animate(); 
        }

    }

    return publicAPI;
})()         