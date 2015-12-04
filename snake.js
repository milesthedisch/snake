window.addEventListener('DOMContentLoaded', function () {

	// c is context, x is the x position and y is the y position //

	var c, x, y, dx, dy;
	var canvas;
	var food;
	var reqAnimId;

	//KEYS

	var W = 'w'.charCodeAt(0),
		A = 'a'.charCodeAt(0),
		S = 's'.charCodeAt(0),
		D = 'd'.charCodeAt(0)

	init();
	animate();

	// initate the canvas

	function init() {
		// creating the canvas and the context
		canvas = document.getElementById("canvas");
    	c = canvas.getContext("2d");
   		// the actual position
   		y = 0;
    	x = 0;
    	// the foods position
    	fx = randPos(30, 400 - 30)
    	fy = randPos(30, 400 - 30)
    	// the direction
    	dx = 0;
    	dy = 1;
	}

	//Foods how big?

	var centerX = fx,
		centerY = fy,
		radSnake = 50,
		radius = 30,
		x = 200,
		y = 100;
		

	// initiate the animationFrame

	function animate() {
		reqAnimId = window.requestAnimationFrame(animate)
		draw();
	}

	// Check movements

	function movement(directionX, directionY){
		dx = directionX;
		dy = directionY;
	}

	function randPos(min, max) {
    	return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	function drawCircle(centerX, centerY, radius, colour) {
		c.beginPath();
		c.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
		c.fillStyle = colour;
		c.fill();
	}

	// Draw the shape on render

	function draw() {

		// X and y are bound by the canavs height and width

		if (x < (0 + radSnake) || y < (0 + radSnake) || x > (canvas.width - radSnake) || y > (canvas.height - radSnake))  {
			c.clearRect(0,0,canvas.width,canvas.height);
			window.cancelAnimationFrame(reqAnimId);
			alert("animation done!");
			return;
		}

		c.clearRect(0,0,canvas.width,canvas.height);
		c.fillStyle = '#87CEEB';

		x += dx;
		y += dy;

		drawCircle(x, y, radSnake, "skyblue");

		drawCircle(centerX, centerY, radius, "red");
		//check for food being eaten
		// eat(eatCheck())
		eatCheck()
	}

	// Event listener

	function code(e) {
	    e = e || window.event;
	    return(e.keyCode || e.which);
	}

    document.onkeypress = function(e){
	        var key = code(e);
	        switch (key) {
	        	case W: movement(0, -1); break;
	        	case A: movement(-1, 0); break;
	        	case S: movement(0, 1); break;
	  	        case D: movement(1, 0); break;
  	        }
	};

    //Feed ME

	function eatCheck(){
		if (Math.pow(x-centerX , 2) + Math.pow(y-centerY, 2) <= Math.pow(radSnake+radius, 2) && Math.PI ){
			console.log('ym')
			return true;
		} else {
			return false;
		}
	}

	// function eat(check){
	// 	if (check) {
	// 		var yTmp = randPos(30, 400 - 30)
	// 		var xTmp = randPos(30, 400 - 30)
	// 		centerX = Math.pow(x-centerX , 2) + Math.pow(y-centerY, 2) <= Math.pow(radSnake+radius, 2) && Math.PI 
	//   			 // 30 is the radius of the food, couldnt reference the var in here.
	// 			centerY = randPos(30, 400 - 30);
	// 		}
	// 		radSnake += 1;
	// 		console.log('nom')
	// 	}
	// }


});