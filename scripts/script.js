// variables to track mouse movement
var oldX = 0; var oldY = 0; var newX = 0; var newY = 0;

// variables to choose which project to display
var proj; var projChoiceClass;

// variables to choose which about picture to display
var abtPic; var abtPicClass;

// variables for tracking sections
var numSections; var currentSection; var prevSection;

// variables to control circle dragger movement on navigation bar
var oldPos = 0; var newPos; var currentPos; var moveAmt;
var newIndex = 0; var setPos;
var dragging = false;

// variables for links to project pages
const proj1 = "and-justice-for-all";
const proj2 = "glitchin-gifs";
const proj3 = "a-type-of-mosaic";
const proj4 = "metamorph-typeface";
const proj5 = "pleasures-of-the-door";
var projectLink;

// variable for controlling animation of scroll indicator
var scrollTimer;

// preloader controls - listen for page to finish loading
var preload = document.getElementById("preload-overlay");
window.addEventListener('load', function() {
	preload.className += "preload-hide";
});

// animate scroll indicator
function scrollAnimate() {
	console.log("scrollAnimate");
    $(".scroll-hint").toggleClass("scrollBounce");
}

// randomly select project to display when page loads
function setProj() {
		proj = Math.floor(Math.random() * 5) + 1;
		projChoiceClass = "projects-" + proj;
    	$("#img-container").addClass(projChoiceClass);
    	setProjLink();
};

// randomly select project to display when mouse moves more than 40 pixels
function chooseProj() {
	if ((newY > (oldY + 40)) || (newY < (oldY - 40)) || (newX > (oldX + 40)) || (newX < (oldX - 40))) {
		$("#img-container").removeClass(projChoiceClass);
		setProj();
    	oldX = newX;
    	oldY = newY;
	}
};

// set link to project based on which cover image is displayed
function setProjLink() {
	if (proj == 1) {
		projectLink = proj1;
	}
	else if (proj == 2) {
		projectLink = proj2;
	}
	else if (proj == 3) {
		projectLink = proj3;
	}
	else if (proj == 4) {
		projectLink = proj4;
	}
	else if (proj == 5) {
		projectLink = proj5;
	}
}

// randomly select an about picture to display
function setAbtPic() {
	abtPic = Math.floor(Math.random() * 14) + 1;
    abtPicClass = "abt-image" + abtPic;
   	$("#about-img").addClass(abtPicClass);
}

// display about picture when mouse moves more than 100 pixels
function chooseAbtPic() {
	if ((newY > (oldY + 100)) || (newY < (oldY - 100)) || (newX > (oldX + 100)) || (newX < (oldX - 100))) {
		$("#about-img").removeClass(abtPicClass);
		setAbtPic();
    	oldX = newX;
    	oldY = newY;
	}
};

// move dragger circle on navigation bar when user scrolls
function moveDragger() {
	setPos = (newIndex) * moveAmt;
	$( ".nav-dragger" ).animate({top: (setPos  + '%'),}, 300);
	console.log("setPos is " + setPos);

};

// set navigation bar text when sections change -- unused
// function setTrackerText() {
// 	if (newIndex > 0) {
// 		currentSection = newIndex;
// 		$( ".section-tracker" ).text(currentSection + "/" + numSections);
// 	}
// 	else if (newIndex == 0) {
// 		$( ".section-tracker" ).text( "" );
// 	}
// }

// show navigation bar if not on home section  and vice versa
function navHideShow() {
	if (newIndex > 0) {
		$(".nav-container").removeClass("nav-container-hide");
	}
	else if (newIndex == 0) {
		$(".nav-container").addClass("nav-container-hide");
	}
}

// setup fullpage functions
new fullpage('#fullpage', {
	licenseKey: 'A82ACDA6-81874E36-8100F2A7-1F26EC7D',
	onLeave: function(origin, destination, direction){
		prevSection = this;

		newIndex = destination.index;
		// setTrackerText();
		if (dragging == false) {
			moveDragger();
			navHideShow();
		}
		if(origin.index == 0){
			clearInterval(scrollTimer);
    		$(".scroll-hint").addClass("scroll-hint-hide");
    		$(".top-bar").removeClass("top-bar-hide");
		}
		if(destination.index == 0)  {
			scrollTimer = setInterval('scrollAnimate()', 800);
			$(".scroll-hint").removeClass("scroll-hint-hide");
    		$(".top-bar").addClass("top-bar-hide");
		}
	},
	afterLoad: function(origin, destination, direction){
	}
});

// after page loads
$(document).ready(function() {

	// determine how much the dragger circle moves based on how many sections there are
	numSections = $('.fp-section').length - 1;
	moveAmt = 100 / (numSections+1);

	// activate scroll indicator
    $(".scroll-hint").removeClass("scroll-hint-hide");
	scrollTimer = setInterval('scrollAnimate()', 800);

	// set navigation draggable functions and responses
	$(".nav-dragger").draggable({ 
		axis: 'y',
		zIndex: 100,
		containment : ".nav-container",
		drag: function() {},
		start: function() {},
		stop: function() {},
	});

	// set navigation droppable functions and responses
	$(".nav-bullet").droppable({ 
		accept: ".nav-dragger",
		tolerance: "intersect",
		over: function( event, ui ) {}
	});

	// set functions when dragging starts
	$( ".nav-dragger" ).on( "dragstart", function() {
		$(".zoom-wrapper").addClass("zoom-out");
    	$(".top-bar").addClass("top-bar-hide");
		dragging = true;
	} );

	// set functions when dragging is happening
	$( ".nav-dragger" ).on( "drag", function() {
		$( "#bullet-0" ).on( "dropover", function() {
			fullpage_api.moveTo(1);
		} );
		$( "#bullet-1" ).on( "dropover", function() {
			fullpage_api.moveTo(2);
		} );
		$( "#bullet-2" ).on( "dropover", function() {
			fullpage_api.moveTo(3);
		} );
		$( "#bullet-3" ).on( "dropover", function() {
			fullpage_api.moveTo(4);
		} );
		$( "#bullet-4" ).on( "dropover", function() {
			fullpage_api.moveTo(5);
		} );
		$( "#bullet-5" ).on( "dropover", function() {
			fullpage_api.moveTo(6);
		} );
		$( "#bullet-6" ).on( "dropover", function() {
			fullpage_api.moveTo(7);
		} );
	} );

	// set functions when dragging ends
	$( ".nav-dragger" ).on( "dragstop", function() {
		moveDragger();
		navHideShow();
		$(".zoom-wrapper").removeClass("zoom-out");
    	$(".top-bar").removeClass("top-bar-hide");
		dragging = false;
	} );

	// set project that's displayed initially
	setProj();

	// allow click function of scroll indicator -- to first project
  	$(".scroll-hint").click(function(){
          fullpage_api.moveTo(2);
    });	

  	// go back to landing/home section when user clicks name
    $( "#home-button" ).click(function() {
			fullpage_api.moveTo(1);
		} );

    // show about page container when user clicks "about"
 	$("#about-button").click(function(){
 		console.log("clicked about button");
    	$(".about-container").toggleClass("about-container-hide");
    	$("#about-img, #info-col, .contact-info").toggleClass("about-elements-hide");

    	if ($(".about-container").hasClass("about-container-hide")) {
    		$("#about-button").text("about");
    		fullpage_api.setAllowScrolling(true);
    	}
    	if ($(".about-container").hasClass("about-container-hide") == false) {
    		$("#about-button").text("close");
    		fullpage_api.setAllowScrolling(false);
    	}
    });

 	// track mouse movement and change about picture
    $(".about-container").mousemove(function(event){
		newX = event.pageX;
		newY = event.pageY;
		chooseAbtPic();
	});

    // track mouse movement inside home image and change project picture
	$("#img-container").mousemove(function(event){
		newX = event.pageX;
		newY = event.pageY;
		chooseProj();
	});

	// open project link in new window when user clicks home image
	$("#img-container").click(function(){
		window.open(projectLink);
	});

	// show and hide preview info when user hovers over preview image
	$(".preview-img").hover(function(){
        $(".preview-title-container").toggleClass("preview-title-container-show");
        $(".preview-img-overlay").toggleClass("preview-img-overlay-show");
     });

});
