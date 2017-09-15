//Floater object
function Floater(id){
	this.element = document.getElementById(id);
	this.initialPosition = setRandPos(this.element);
	
	this.amplitude = Math.random()*10 + 20;
	this.frequency = Math.random()*500 + 500;
	this.size = Math.random()*20 + 150;

	this.candy = this.element.children[0];
	this.candyXamp = Math.random()*10 + 5;
	this.candyZamp = Math.random()*40;
	this.candyXcenter = 40;

	this.candyXfreq= Math.random()*500 + 500;
	this.candyZfreq= Math.random()*500 + 500;


	
	var self = this;
	this.bob = function() {
		//set the position to the initial position plus sin of the current time
		//make some randomness in the amplitude and frequency
		var now = new Date();
		self.element.style.top = self.initialPosition.y + self.amplitude*Math.sin(now/self.frequency) + "px";
		
		self.element.style.zIndex = "-1";


		//now rotate the inner element in the x and z directions.
		// X should go from around 35 to 45
		// Z should go from around -20 to +20

		self.candy.style.transform = "rotateX(" + self.candyXcenter + self.candyXamp*Math.sin(now/self.candyXfreq) + "deg)";
		self.candy.style.transform = "rotateZ(" + self.candyZamp*Math.sin(now/self.candyZfreq) + "deg)";
	}
	
	function setRandPos(elem) {
		//set the element's position to a random position on the page
		//return that position
	
		var pos = {};
		pos.x = Math.random()* window.innerWidth;
		pos.y = Math.random()* window.innerHeight;
		
		elem.style.top = pos.y + "px";
		elem.style.left = pos.x + "px";
		
		return pos;
	}
	
	this.element.style.width = this.size + "px"
	
	//deform the image appropriately
	// the higher it is, the smaller it should appear
	// all the images should be deformed to look like they are on the surface of the water
}

/*	setup
	for each img tag with the class "floater"
	make a floater object for it and call bob on it
*/
function go() {
	// set the background size
	document.body.style.width = window.innerWidth + "px";
	document.body.style.height = window.innerHeight + "px";

	var floaters = document.getElementsByClassName("floater");
	for (var i = 0; i < floaters.length; i++) {
		f = new Floater(floaters[i].id);
		setInterval(f.bob, 50);
		//f.bob();
	}
}

go();
