window.addEventListener('DOMContentLoaded', function () {
	
	// c is context, x is the x position and y is the y position //
	
	var c, x, y, dx, dy, 
		pts = [],
		ptsSnake = [];
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
    	c2 = canvas.getContext("2d")
   		// the actual position
   		y = 0;
    	x = 0;
    	// the foods position
    	fx = randPos(0, 400)
    	fy = randPos(0, 400)
    	// the direction
    	dx = 0;
    	dy = 1;
	}

	//Foods how big?
	
	var centerX = fx,
		centerY = fy,
		radius = 2;

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

	function eatCheck(arr){
		if (Array.isArray(arr)){
			arr.filter(function(pts){
				if ( pts.x2 === x && pts.y2 === y ) {
					alert('yum')
					return true;
				} 
			})
		}
	}

	// Draw the shape on render

	function draw() {

		// X and y are bound by the canavs height and width	

		if (x < 0 || y < 0 || 
			x > canvas.width || y > canvas.height){
			c.clearRect(0,0,canvas.width,canvas.height);
			window.cancelAnimationFrame(reqAnimId);	
			alert("animation done!");
		}

		c.clearRect(0,0,canvas.width,canvas.height);
		c.fillStyle = '#87CEEB';

		x += dx;
		y += dy;

		// draw
		c.beginPath();
		c.arc(x,y, 10, 0, Math.PI*2, false);
		c.fill();

		//draw food
		for ( var degree = 0; degree < 360; degree++ ){
		    radians = degree * Math.PI/180;
		    x2 = centerX + radius * Math.cos(radians);
		    y2 = centerY + radius * Math.sin(radians);
		    pts.push({x2: x2, y2: y2});
		}

		c.beginPath();
		c.moveTo(pts[0].x2,pts[0].y2);

		for (var i = 1; i < pts.length; i++){ 
		    c.lineTo(pts[i].x2,pts[i].y2);
		}		

		c.closePath();
		c.fillStyle="skyblue";
		c.fill();
		c.strokeStyle="lightgray";
		c.lineWidth=3;
		c.stroke()
		//check for food being eaten
		

		eatCheck(pts)
	
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

});