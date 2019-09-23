var oldX = 0;
var oldY = 0;
var newX = 0;
var newY = 0;
var proj; var projChoiceClass;
var abtPic; var abtPicClass;
var numSections; var currentSection;
var prevSection;
var diff;
var oldPos = 0; var newPos; var currentPos; var moveAmt;
var newIndex = 0; var setPos;
var dragging = false;

const proj1 = "and-justice-for-all.html";
const proj2 = "glitchin-gifs.html";
const proj3 = "a-type-of-mosaic.html";
const proj4 = "metamorph-typeface.html";
const proj5 = "pleasures-of-the-door.html";
var projectLink;

var scrollTimer;
var scrollTimerOn = false;

var preload = document.getElementById("preload-overlay");
window.addEventListener('load', function() {
	preload.className += "preload-hide";
});




//fullpage

// keeping central set of classnames and selectors
    var WRAPPER =               'fullpage-wrapper';
    var WRAPPER_SEL =           '.' + WRAPPER;

    // slimscroll
    var SCROLLABLE =            'fp-scrollable';
    var SCROLLABLE_SEL =        '.' + SCROLLABLE;

    // util
    var RESPONSIVE =            'fp-responsive';
    var NO_TRANSITION =         'fp-notransition';
    var DESTROYED =             'fp-destroyed';
    var ENABLED =               'fp-enabled';
    var VIEWING_PREFIX =        'fp-viewing';
    var ACTIVE =                'active';
    var ACTIVE_SEL =            '.' + ACTIVE;
    var COMPLETELY =            'fp-completely';
    var COMPLETELY_SEL =        '.' + COMPLETELY;

    // section
    var SECTION_DEFAULT_SEL =   '.section';
    var SECTION =               'fp-section';
    var SECTION_SEL =           '.' + SECTION;
    var SECTION_ACTIVE_SEL =    SECTION_SEL + ACTIVE_SEL;
    var TABLE_CELL =            'fp-tableCell';
    var TABLE_CELL_SEL =        '.' + TABLE_CELL;
    var AUTO_HEIGHT =           'fp-auto-height';
    var AUTO_HEIGHT_SEL =       '.' + AUTO_HEIGHT;
    var AUTO_HEIGHT_RESPONSIVE = 'fp-auto-height-responsive';
    var AUTO_HEIGHT_RESPONSIVE_SEL = '.' + AUTO_HEIGHT_RESPONSIVE;
    var NORMAL_SCROLL =         'fp-normal-scroll';
    var NORMAL_SCROLL_SEL =     '.' + NORMAL_SCROLL;

    // section nav
    var SECTION_NAV =           'fp-nav';
    var SECTION_NAV_SEL =       '#' + SECTION_NAV;
    var SECTION_NAV_TOOLTIP =   'fp-tooltip';
    var SECTION_NAV_TOOLTIP_SEL='.'+SECTION_NAV_TOOLTIP;
    var SHOW_ACTIVE_TOOLTIP =   'fp-show-active';

// https://medium.com/quick-code/simple-javascript-drag-drop-d044d8c5bed5
// const box = document.getElementsByClassName('test-box')[0]
// const containers = document.getElementsByClassName('test-container')
// for(const container of containers) {
//   container.addEventListener("dragover", dragover)
//   container.addEventListener("dragenter", dragenter)
//   container.addEventListener("drop", drop)
// }

// function dragover(e) {
//   e.preventDefault();
// }
// function dragenter(e) {
//   e.preventDefault();
//   if (this.id == "container-1") {
//   	$.fn.fullpage.moveTo(2);
//   }
//   if (this.id == "container-2") {
//   	$.fn.fullpage.moveTo(3);
//   }
//   if (this.id == "container-3") {
//   	$.fn.fullpage.moveTo(4);
//   }
// }
// function drop() {
//   this.append(box);
//   // if (this.id == "container-3") {
//   // 	$.fn.fullpage.moveTo(4);
//   // }
// }

// end of https://medium.com/quick-code/simple-javascript-drag-drop-d044d8c5bed5

function scrollAnimate() {
    $(".scroll-hint").toggleClass("scrollBounce");
}

function setProj() {
		proj = Math.floor(Math.random() * 5) + 1;
		projChoiceClass = "projects-" + proj;
		// if (proj == 2) {
		// 	var micro = Math.floor(Math.random() * 3) + 1;
		// 	projChoiceClass = projChoiceClass + "-" + micro;
		// }
    	$("#img-container").addClass(projChoiceClass);
    	setProjLink();
};

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

function chooseProj() {
	if ((newY > (oldY + 40)) || (newY < (oldY - 40)) || (newX > (oldX + 40)) || (newX < (oldX - 40))) {
		$("#img-container").removeClass(projChoiceClass);
		setProj();
    	oldX = newX;
    	oldY = newY;
	}
};

function setAbtPic() {
	abtPic = Math.floor(Math.random() * 14) + 1;
    abtPicClass = "abt-image" + abtPic;
   	$("#about-img").addClass(abtPicClass);
   	// document.getElementById("about-img").style.background = "url(../about/image" + abtPic + ".jpg) !important";
   	// $("#about-img").css("background", "url(../about/image" + abtPic + ".jpg) !important");
}

function chooseAbtPic() {
	if ((newY > (oldY + 100)) || (newY < (oldY - 100)) || (newX > (oldX + 100)) || (newX < (oldX - 100))) {
		$("#about-img").removeClass(abtPicClass);
		setAbtPic();
    	oldX = newX;
    	oldY = newY;
	}
};

function moveDragger() {
	// newPos = 20 * diff;
	// currentPos = (newPos + oldPos);
	// console.log("newPos is " + newPos + " and oldPos is " + oldPos);
	// console.log("currentPos is " + currentPos);
	// // $( ".nav-dragger" ).animate({top: (currentPos  + 'px'),}, 500);
	// document.getElementById("draggerID").style.top = currentPos + 'px';
	// oldPos = currentPos;

	setPos = (newIndex) * moveAmt;
	$( ".nav-dragger" ).animate({top: (setPos  + '%'),}, 300);
	console.log("setPos is " + setPos);

};

function setTrackerText() {
	if (newIndex > 0) {
		currentSection = newIndex;
		$( ".section-tracker" ).text(currentSection + "/" + numSections);
		// $(".nav-container").removeClass("nav-container-hide");

	}
	else if (newIndex == 0) {
		$( ".section-tracker" ).text( "" );
		// $(".nav-container").addClass("nav-container-hide");
	}
	// else if (newIndex == 0) {
	// 	$( ".section-tracker" ).text( "about" );
	// }
	// else if (newIndex == 1) {
	// 	$( ".section-tracker" ).text( "home" );
	// }
}

function navHideShow() {
	if (newIndex > 0) {
		$(".nav-container").removeClass("nav-container-hide");
	}
	else if (newIndex == 0) {
		$(".nav-container").addClass("nav-container-hide");
	}
}

// function chooseStory() {
//     v = Math.floor(Math.random() * numOptions) + 1;
//     articleLink = "https://katiebumatay.github.io/and-justice-for-all/variables/" + sec + "/" + phraseNum + "/" + v + "/text.html";
//     $(".articleText").load(articleLink);
//     captionLink = "https://katiebumatay.github.io/and-justice-for-all/variables/" + sec + "/" + phraseNum + "/" + v + "/text.html p:first-child";
//     $(".caption").load(captionLink);
//     i = Math.floor(Math.random() * 2) + 1;
//     if (viewDesigner == true) {
//         i = 1;
//     }
//     projChoiceClass = "projects-" + proj;
//     $("#img-container").addClass(imgChoiceClass);
    
// }

// new fullpage('#fullpage', {
//   anchors: ['page-about', 'page-landing', 'page-1', 'page-2'],
// });

//adding the action to the button
// $(document).on('click', '#moveTo', function(){
//   fullpage_api.moveTo('page-2',1);
// });

// $(function() {
//     $("#draggable").draggable({ axis: 'x' });
// });

// $('#fullpage').fullpage();

new fullpage('#fullpage', {
	// anchors: ['page-about', 'page-landing', 'page-1', 'page-2'],
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
    		$(".top-bar").addClass("top-bar-hide");
		}

		// $(".zoom-wrapper").addClass("zoom-out");

	},
	afterLoad: function(origin, destination, direction){
		// $(".zoom-wrapper").removeClass("zoom-out");
		// moveDragger();
		// if (dragging) {
		// 	moveDragger();
		// }

	}
});


$(document).ready(function() {

	numSections = $('.fp-section').length - 1;
	moveAmt = 100 / (numSections+1);
	console.log("numSections is " + numSections);
	console.log("moveAmt is " + moveAmt);

    $(".scroll-hint").removeClass("scroll-hint-hide");
	scrollTimer = setInterval('scrollAnimate()', 800);


	// $( ".section-tracker" ).text( "home" );
	// $( "#bullet-0 a" ).text( "about" );
	$( "#bullet-0 a span" ).text( "home" );


	// $(".nav-container").draggable({ 
	// });

	$(".nav-dragger").draggable({ 
		axis: 'y',
		// revert: "invalid",
		zIndex: 100,
		containment : ".nav-container",
		drag: function() {},
		start: function() {},
		stop: function() {},
	});

	$(".nav-bullet").droppable({ 
		accept: ".nav-dragger",
		tolerance: "intersect",
		over: function( event, ui ) {}
	});

	// $( ".nav-dragger" ).animate({top: (oldPos  + 'px'),}, 0);

	// $(".test-box").draggable({ 
	// 	axis: 'x',
	// 	revert: "invalid",
	// 	zIndex: 100,
	// 	containment : ".drag-contain",
	// 	start: function() {},
	// 	stop: function( event, ui ) {}
	// });

	// $( ".test-container" ).droppable({
	// 	accept: ".test-box",
	// 	tolerance: "intersect",
	// 	over: function( event, ui ) {}
	// });

	// $( ".test-box" ).on( "dragstart", function() {
	// 	$(".zoom-wrapper").addClass("zoom-out");
	// } );

	// $( ".test-box" ).on( "dragstop", function() {
	// 	$(".zoom-wrapper").removeClass("zoom-out");
	// } );


	// $( "#container-1" ).on( "dropover", function() {
	// 	fullpage_api.moveTo(2);
	// } );
	// $( "#container-2" ).on( "dropover", function() {
	// 	fullpage_api.moveTo(3);
	// } );
	// $( "#container-3" ).on( "dropover", function() {
	// 	fullpage_api.moveTo(4);
	// } );


	$( ".nav-dragger" ).on( "dragstart", function() {
		$(".zoom-wrapper").addClass("zoom-out");
    	$(".top-bar").addClass("top-bar-hide");

		// $(".nav-dragger").addClass("nav-dragger-active");
		dragging = true;

	} );


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

	$( ".nav-dragger" ).on( "dragstop", function() {
		moveDragger();
		navHideShow();
		$(".zoom-wrapper").removeClass("zoom-out");
    	$(".top-bar").removeClass("top-bar-hide");

		// $(".nav-dragger").removeClass("nav-dragger-active");
		dragging = false;
		// moveDragger();
	} );

	// $( ".nav-dragger" ).on( "drag", function( event, ui ) {} );
	// $( ".nav-dragger" ).draggable({
 // 		drag: function( event, ui ) {
 
 //    	// Keep the left edge of the element
 //    	// at least 100 pixels from the container
 //    	ui.position.top = Math.min( 100, ui.position.top );
 //  	}
// });

	// var indexBullet = index(closest(this, SECTION_NAV_SEL + ' li'));
 //            scrollPage($(SECTION_SEL)[indexBullet]);

 // 	$( ".nav-bullet" ).on( "dropover", function() {
 // 		scrollPage($(".fp-section")[newIndex]);
	// } );


	// $( "#bullet-0" ).on( "dropover", function() {
	// 	fullpage_api.moveTo(1);
	// } );
	// $( "#bullet-1" ).on( "dropover", function() {
	// 	fullpage_api.moveTo(2);
	// } );
	// $( "#bullet-2" ).on( "dropover", function() {
	// 	fullpage_api.moveTo(3);
	// } );
	// $( "#bullet-3" ).on( "dropover", function() {
	// 	fullpage_api.moveTo(4);
	// } );

	// $( "#bullet-0" ).click(function() {
	// 	$(".nav-dragger").removeClass("pos-1 pos-2 pos-3").addClass("pos-0");
	// } );
	// $( "#bullet-1" ).click(function() {
	// 	$(".nav-dragger").removeClass("pos-0 pos-2 pos-3").addClass("pos-1");
	// } );
	// $( "#bullet-2" ).click(function() {
	// 	$(".nav-dragger").removeClass("pos-1 pos-0 pos-3").addClass("pos-2");
	// } );
	// $( "#bullet-3" ).click(function() {
	// 	$(".nav-dragger").removeClass("pos-1 pos-2 pos-0").addClass("pos-3");
	// } );

	// $( "#container-1" ).click(function() {
	// 	document.getElementById("myDIV").style.transform = "translateX(0px)";
	// } );
	// $( "#container-2" ).click(function() {
	// 	document.getElementById("myDIV").style.transform = "translateX(50px)";
	// } );
	// $( "#container-3" ).click(function() {
	// 	document.getElementById("myDIV").style.transform = "translateX(100px)";
	// } );


	// $(document).ready(function() {
	    // $('#fullpage').fullpage();
	// });


	setProj();

// 	$(function() {
//     $("#draggable").draggable({ axis: 'x' });
// });

	// $('.test-box').draggable().filter('.test-box').draggable("option", "axis", "x");

	// $(".button").click(function(){
 //        $(".popup").addClass("popup-show");
 //     });

 	// $("#work-button").click(function(){
  //       // $.fn.fullpage.moveTo(3);

  //       if (newIndex == 0) {
  //       	fullpage_api.moveTo(2);
  //       }
  //       else return;
       
  //    });

  	$(".scroll-hint").click(function(){
          fullpage_api.moveTo(2);
    });	

    $( "#home-button" ).click(function() {
			fullpage_api.moveTo(1);
		} );

 	$("#about-button").click(function(){
 		console.log("clicked about button");
    	$(".about-container").toggleClass("about-container-hide");
    	// $("#about-img, #info-col, #additional-info-col, #contact-info-col, .contact-info").toggleClass("about-elements-hide");
    	$("#about-img, #info-col, .contact-info").toggleClass("about-elements-hide");

    	if ($(".about-container").hasClass("about-container-hide")) {
    		$("#about-button").text("about");
    		fullpage_api.setAllowScrolling(true);
    	}
    	if ($(".about-container").hasClass("about-container-hide") == false) {
    		$("#about-button").text("close");
    		fullpage_api.setAllowScrolling(false);
    	}
    	// $(".zoom-wrapper").toggleClass("stop-scroll");
    });
    // $(".about-container").click(function(){
    // 	$(".about-container").toggleClass("about-container-hide");
    // });

    $(".about-container").mousemove(function(event){
		newX = event.pageX;
		newY = event.pageY;
		chooseAbtPic();
  		// console.log(event.pageX + ", " + event.pageY);
	});

	$(".popup").click(function(){
        $(".popup").removeClass("popup-show");
     });

	$("#img-container").mousemove(function(event){
		newX = event.pageX;
		newY = event.pageY;
		chooseProj();
  		// console.log(event.pageX + ", " + event.pageY);
	});

	$("#img-container").click(function(){
		window.open(projectLink);
		// if (proj == 1) {
		// 	window.open("projects.html");
		// }
		// if (proj == 2) {
		// 	window.open("projects.html");
		// }
		// if (proj == 3) {
		// 	window.open("projects.html");
		// }
		// if (proj == 4) {
		// 	window.open("projects.html");
		// }
		// if (proj == 5) {
		// 	window.open("projects.html");
		// }
		// if (proj == 6) {
		// 	window.open("projects.html");
		// }
	});

	$(".preview-img").hover(function(){
        $(".preview-title-container").toggleClass("preview-title-container-show");
        $(".preview-img-overlay").toggleClass("preview-img-overlay-show");
     });

	// $("#img1").hover(function(){
 //        $("#img1").toggleClass("img1-pause");
 //     });

	// $(".test-box").mousedown(function(){
 //        $(".zoom-wrapper").addClass("zoom-out");
 //     });

	// $(".test-box").mouseup(function(){
 //        $(".zoom-wrapper").removeClass("zoom-out");
 //     });

	// $(".test-box").mouseleave(function(){
 //        $(".zoom-wrapper").removeClass("zoom-out");
 //     });



});
