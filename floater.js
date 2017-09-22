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

document.onclick = function(event) {
	function rotateLang(lang){
		if(lang == "en"){
			// turn the page spanish

			// turn off all english elements
			var englishElements = document.getElementsByClassName("english");
			for (var i = 0; i < englishElements.length; i++){
				englishElements[i].style.display = "none";
			}

			// turn on all spanish elements
			var spanishElements = document.getElementsByClassName("spanish");
			for (var i = 0; i < spanishElements.length; i++){
				spanishElements[i].style.display = spanishElements[i].getAttribute("originalDisplay");
			}

			return "es";
		}else if (lang == "es"){
			// turn the page chinese

			// turn off all spanish elements
			var spanishElements = document.getElementsByClassName("spanish");
			for (var i = 0; i < spanishElements.length; i++){
				spanishElements[i].style.display = "none";
			}

			// turn on all chinese elements
			var chineseElements = document.getElementsByClassName("chinese");
			for (var i = 0; i < chineseElements.length; i++){
				chineseElements[i].removeAttribute("style.display");
				chineseElements[i].style.display = chineseElements[i].getAttribute("originalDisplay");
			}

			return "zh";
		}else if (lang == "zh"){
			// turn the page english

			// turn off all chinese elements
			var chineseElements = document.getElementsByClassName("chinese");
			for (var i = 0; i < chineseElements.length; i++){
				chineseElements[i].style.display = "none";
			}

			// turn on all english elements
			var englishElements = document.getElementsByClassName("english");
			for (var i = 0; i < englishElements.length; i++){
				englishElements[i].removeAttribute("style.display");
				englishElements[i].style.display = englishElements[i].getAttribute("originalDisplay");
			}
			return "en";
		}
	}
	var metas = document.getElementsByTagName("meta");
	for(var i = 0; i < metas.length; i++){
		if (metas[i].getAttribute("http-equiv") == "Content-Language"){
			metas[i].content = rotateLang(metas[i].content);
		}
	}
}

function go(){
	console.log(bowser.name);

	//setup
	var floaterElements = document.getElementsByClassName("floater");
	var floaters = [];

	for (var i = 0; i < floaterElements.length; i++) {
		f = new Floater(floaterElements[i].id);
		floaters.push(f);
	}

	// turn off all spanish elements and save their old display
	var spanishElements = document.getElementsByClassName("spanish");
	for (var i = 0; i < spanishElements.length; i++){
		spanishElements[i].setAttribute("originalDisplay", spanishElements[i].style.display);
		spanishElements[i].style.display = "none";
	}

	// turn off all chinese elements
	var chineseElements = document.getElementsByClassName("chinese");
	for (var i = 0; i < chineseElements.length; i++){
		chineseElements[i].setAttribute("originalDisplay", chineseElements[i].style.display);
		chineseElements[i].style.display = "none";
	}

	// save the old display values for the english
	var englishElements = document.getElementsByClassName("english");
	for (var i = 0; i < englishElements.length; i++){
		englishElements[i].setAttribute("originalDisplay", englishElements[i].style.display);
	}
	
	function doBob(){ // loops
		for (var f = 0; f < floaters.length; f++) {
			// do the bob
			floaters[f].bob();
		}

		// do it again
		window.requestAnimationFrame(doBob);
	}
	
	// start the animation
	window.requestAnimationFrame(doBob);

	// change languages every so often
	var l = setInterval(document.onclick, 5000);
}

go();


