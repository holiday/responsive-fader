/* 
	Slide object is a combination of text and a detached background image 
	Note: Had to be made this way to support the parallax effect
*/
var Slide = function(el, bg) {
	this.el = el;
	this.bg = bg;
	this.over_z_index = 2;
	this.under_z_index = 1;
}

Slide.prototype.hide = function() {
	$(this.el).hide(0);
	$(this.bg).hide(0);
};

Slide.prototype.fadeIn = function(callback) {
	$(this.bg).fadeIn();
	$(this.el).fadeIn(function() {
		callback();
	});
}

Slide.prototype.moveUp = function() {
	$(this.el).css('z-index', this.over_z_index);
	$(this.bg).css('z-index', this.over_z_index);
};

Slide.prototype.moveDown = function() {
	$(this.el).css('z-index', this.under_z_index);
	$(this.bg).css('z-index', this.under_z_index);
};

/* Fader class that will cycle through slides */
var Fader = function(slides_selector, slides_bg_selector, delay) {
	this.slides_selector = slides_selector;
	this.slides_bg_selector = slides_bg_selector;
	this.slides = [];
	this.delay = delay;
	this.current_slide = -1;

	this.init(this);
}

Fader.prototype.init = function() {
	var self = this;
	//create all the Slide objects
	$(self.slides_selector).each(function(i, el){
		self.slides.push(new Slide(el, $(self.slides_bg_selector)[i]));
		self.current_slide++; //increment the current slide index thats visible
	});
};

Fader.prototype.next = function() {
	if(this.slides.length > 1){
		//compute the next slide index
		if((this.current_slide-1) >= 0){
			this.current_slide--;
			//hide the 
			this.transition(this.slides[this.current_slide], this.slides[this.current_slide+1]);
		}else {
			this.current_slide = this.slides.length-1;
			this.transition(this.slides[this.current_slide], this.slides[0]);
		}
	}
};

Fader.prototype.transition = function(slide, prev_slide) {
	//first make the item invisible 
	slide.hide();
	//make this slide visible
	slide.moveUp();
	slide.fadeIn(function() {
		//set the prev slide back to z-index 1
		prev_slide.moveDown();
		//make prev slide invisible
		prev_slide.hide();
		//make this slide z-index 1
		slide.moveDown();
	});
};

Fader.prototype.start = function() {
	var self = this;
	console.log(this);
	setInterval(function(){
		self.next();
	}, self.delay);
};
