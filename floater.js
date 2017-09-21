//Floater object
function Floater(id){
	this.element = document.getElementById(id);
	this.candy = this.element.children[0];
	this.size = Math.random()*20 + 150;
	this.element.style.width = this.size + "px"
	this.initialPosition = setRandPos(this.element);

	
	//POSITION
	this.posAmp = Math.random()*10 + 20; // position oscillation amplitude
	this.posFreq = Math.random()*500 + 500; // speed of position oscillation

	// x y rotation is applied to the image inside the floater div to make it rotate after perspective has been applied
	//X ROTATION
	this.candyRotXCenter = 40; // image is rotated 40deg around the x axis to appear on the surface of the water
	this.candyRotXAmp = Math.random()*5 + 5; // x rotation varies anywhere between 35 and 45
	this.candyRotXFreq = Math.random()*500 + 500; // frequency of this rotation

	//Y ROTATION
	this.candyRotYAmp = Math.random()*20; // y rotation varies anywhere between -20 and 20 degrees
	this.candyRotYFreq = Math.random()*500 + 500; // frequency of this rotation
	
	var self = this;
	this.bob = function() {
		//set the Y position to the initial Y position plus sine of the current time
		var now = new Date();
		self.element.style.top = (self.initialPosition.y + self.posAmp*Math.sin(now/self.posFreq)) + "px";

		//now rotate the inner element in the x and y directions.
		self.candy.style.transform = "rotateX(" + (self.candyRotXCenter + self.candyRotXAmp*Math.sin(now/self.candyRotXFreq)) + "deg) rotateY(" + (self.candyRotYAmp*Math.sin(now/self.candyRotYFreq)) + "deg)";

		self.element.style.zIndex = "-1";
	}
	
	function setRandPos(elem) {
		var pos = {}

		pos.x = Math.random()*100;
		elem.style.left = pos.x + "%";

		pos.y = Math.random() * window.innerHeight;

		return pos;

	}
}

/*	setup
	for each img tag with the class "floater"
	make a floater object for it and call bob on it
*/
function setup() {

	var floaterElements = document.getElementsByClassName("floater");
	var floaters = [];
	for (var i = 0; i < floaterElements.length; i++) {
		f = new Floater(floaterElements[i].id);
		floaters.push(f);
	}
	return floaters;
}

function go(){

	var floaters = setup();

	function doBob(){
		for (var f = 0; f < floaters.length; f++) {
			// do the bob
			floaters[f].bob();
		}

		// set the background height to be the full page height
		document.body.style.height = window.innerHeight + "px";


		window.requestAnimationFrame(doBob);
	}

	window.requestAnimationFrame(doBob);
}

go();

