// Test one head on collision

// Collide the snakes head on with each other.
// The snakes head should merge into one pixel.

///////////////
//  Testing  //
///////////////

Snake.prototype.wallCollision = function (dirX, dirY, x, y) {
    this.dx = dirX;
    this.dy = dirY;

    this.ax = -dirX;
    this.ay = dirY;

    this.createSnake(1, x, y, x, y);
    this.tick(1000);
    this.animate();
};

Snake.prototype.headOnCollision = function (dirX, dirY, x, y ) {
    
    this.dx = dirX;
    this.dy = dirY || 0;

    this.ax = -(dirX);
    this.ay = dirY || 0;

    this.createSnake(1, x, y, x, y);
    this.tick(1000);
    this.animate();
};

Snake.prototype.nearMiss = function (x, y) {

    this.dx = -1;
    this.dy = 0;

    this.ax = 0;
    this.ay = -1;

    this.createSnake(1, x + 2, y, x, y + 2);

    this.tick(1000);
    this.animate();
};

Snake.prototype.nearMiss2 = function (x, y) {

    this.dx = 1;
    this.dy = 0;

    this.ax = 0;
    this.ay = 1;

    this.createSnake(1, x - 1, y + 1, x - 1, y - 1);

    this.tick(1000);
    this.animate(); 
};

