$(function(){

	var Slider = Backbone.Model.extend({

		initialize: function() {
			this.slides = []; //list of elements to fade
			this.slide = -1; //current visible slide
		},

		addSlide: function(slide) {
			//add a slide
			this.slides.push(slide);
			//the last slide is the current visible slide
			this.slide++;
		},

		last: function(){
			return this.slides.length-1;
		},

		//this function decrements the indexes like (3,2,1,0,3,2,1,0,...)
		next: function(){
			//check if we even have slides
			if(this.slides.length > 1){
				//compute the next slide index
				if((this.slide-1) >= 0){
					this.slide--;
					//trigger the event to perform the actual animation
					this.trigger('change:slide', this, this.slide, this.slide+1);
				}else {
					this.slide = this.slides.length-1;
					this.trigger('change:slide', this, this.slide, 0);
				}
			}
		}
	});

	//initialize the slider
	var slider = new Slider;

	//listen for the change event
	slider.on('change:slide', function(model, index, prev) {

		console.log("Fading in: " + index);
		//first make the item invisible 
		$('#slides li:eq(' + index + ')').hide(0);
		//make this slide visible
		$('#slides li:eq(' + index + ')').css('z-index', 2).fadeIn(function(){
			//set the prev slide back to z-index 1
			$('#slides li:eq(' + prev + ')').css('z-index', 1);
			//make prev slide invisible
			$('#slides li:eq(' + prev + ')').hide(0);
			//make this slide z-index 1
			$(this).css('z-index', 1);

			console.log("Prev: " + prev);
			
		});
		
	});

	//use jquery to loop over all slides and add them to the slider
	$("#slides li").each(function(index, element) {
		slider.addSlide(element);
	});

	//fade in each slide every 5sec
	setInterval(function(){
		slider.next();
	}, 5000);
	
});