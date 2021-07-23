// variables used to turn off tilt in safari
var is_opera = !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
var is_Edge = navigator.userAgent.indexOf("Edge") > -1;
var is_chrome = !!window.chrome && !is_opera && !is_Edge;
var is_explorer= typeof document !== 'undefined' && !!document.documentMode && !is_Edge;
var is_firefox = typeof window.InstallTrigger !== 'undefined';
var is_safari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

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
var oldIndex = 0; var newIndex = 0; var setPos;
var dragging = false;
var hasDragged = false;

// variables for links to project pages
const proj1 = "and-justice-for-all";
const proj2 = "glitchin-gifs";
const proj3 = "a-type-of-mosaic";
const proj4 = "metamorph-typeface";
const proj5 = "pleasures-of-the-door";
const proj6 = "soulard-farmers-market";
var projectLink;

// variable for controlling animation of scroll indicator
var scrollTimer;

// check if device is mobile
var isMobile = false;
if (window.innerWidth <= 480) {
	isMobile = true;
}

// turn off tilt in safari and mobile
if (is_safari || isMobile) {
	var imgHome = document.getElementById("img-container");
	imgHome.className += "no-tilt";
	var img1 = document.getElementById("img1");
	img1.className += " no-tilt";
	var img2 = document.getElementById("img2");
	img2.className += " no-tilt";
	var img3 = document.getElementById("img3");
	img3.className += " no-tilt";
	var img4 = document.getElementById("img4");
	img4.className += " no-tilt";
	var img5 = document.getElementById("img5");
	img5.className += " no-tilt";
	var img6 = document.getElementById("img6");
	img6.className += " no-tilt";

}

// animate scroll indicator
function scrollAnimate() {
    $(".scroll-hint").toggleClass("scrollBounce");
}

// randomly select project to display when page loads
function setProj() {
		proj = Math.floor(Math.random() * 6) + 1;
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
	else if (proj == 6) {
		projectLink = proj6;
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
	// if user hasn't tried dragging the nav dragger circle, pulse to draw attention
	if (hasDragged == false && isMobile == false) {
		if (oldIndex == 0 && newIndex == 1) {
			$(".nav-dragger").addClass("nav-dragger-animate");
		}
	}
	if (newIndex > 0) {
		$(".nav-container").removeClass("nav-container-hide");
	}
	else if (newIndex == 0) {
		$(".nav-container").addClass("nav-container-hide");
	}
}

// setup fullpage functions
new fullpage('#fullpage', {
	anchors:  ['home', 'and-justice-for-all', 'glitchin-gifs', 'a-type-of-mosaic', 'metamorph-typeface', 'pleasures-of-the-door', 'soulard-farmers-market'],
	licenseKey: 'A82ACDA6-81874E36-8100F2A7-1F26EC7D',
	onLeave: function(origin, destination, direction){
		prevSection = this;
		oldIndex = origin.index;
		newIndex = destination.index;
		sessionStorage.setItem("currentSection", newIndex + 1);
		console.log("onLeave sessionStorage currentSection is " + sessionStorage.getItem("currentSection"));
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
	}
});
	fullpage_api.setRecordHistory(true);

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
		if (hasDragged == false && isMobile == false) {
			hasDragged = true;
			$(".nav-dragger").removeClass("nav-dragger-animate");
		}
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
		dragging = false;
		if (newIndex != 0) {
			$(".top-bar").removeClass("top-bar-hide");
		}
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

 	// close about page when esc key in pressed
    $(document).on('keydown', function(event) {
       if (event.key == "Escape") {
       	if ($(".about-container").hasClass("about-container-hide") == false) {
       		$(".about-container").toggleClass("about-container-hide");
    		$("#about-img, #info-col, .contact-info").toggleClass("about-elements-hide");
    		$("#about-button").text("about");
    		fullpage_api.setAllowScrolling(true);
    	}
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
		window.open(projectLink,"_self");
	});

	// show and hide preview info when user hovers over preview image
	$(".preview-img").hover(function(){
        $(".preview-title-container").toggleClass("preview-title-container-show");
        $(".preview-img-overlay").toggleClass("preview-img-overlay-show");
     });

});
