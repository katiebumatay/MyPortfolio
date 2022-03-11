// variables to track mouse movement
var oldX = 0; var oldY = 0; var newX = 0; var newY = 0;

// variables to choose which project to display
var proj; var projChoice;

// variables to choose which about picture to display
var abtPic; var abtPicChoice;

// variables for tracking sections
var numSections; var currentSection; var prevSection;

// variables for links to project pages
const proj1 = "and-justice-for-all";
const proj2 = "glitchin-gifs";
const proj3 = "a-type-of-mosaic";
const proj4 = "metamorph-typeface";
const proj5 = "pleasures-of-the-door";
var projectLink;

// variable for controlling animation of scroll indicator
var scrollTimer;

// check if device is mobile
var isMobile = false;
if (window.innerWidth <= 480) {
	isMobile = true;
}

// randomly select project to display when page loads
function setProj() {
		proj = Math.floor(Math.random() * 5) + 1;
		projChoice = "projects/" + proj + "/cover-bw.jpg";
		setProjLink();
    	$("#proj-img-switch").attr("src", projChoice);
    	$("#tooltip-switch").text(projectLink);
    	console.log("setProj() ran and project choice is " + projChoice);
};

// randomly select project to display when mouse moves more than 40 pixels
function chooseProj() {
	if ((newY > (oldY + 100)) || (newY < (oldY - 100)) || (newX > (oldX + 100)) || (newX < (oldX - 100))) {
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
	projectLink = projectLink;
}

// randomly select an about picture to display
function setAbtPic() {
	abtPic = Math.floor(Math.random() * 10) + 1;
    abtPicChoice = "about-images/image" + abtPic + ".jpg";
   	$("#about-img").attr("src", abtPicChoice);
   	// console.log("setAbtPic() ran and about pic choice is " + abtPicChoice);
}

// display about picture when mouse moves more than 100 pixels
function chooseAbtPic() {
	if ((newY > (oldY + 100)) || (newY < (oldY - 100)) || (newX > (oldX + 100)) || (newX < (oldX - 100))) {
		setAbtPic();
    	oldX = newX;
    	oldY = newY;
	}
};

function animatePageLoad() {
	$(".hero-header, .hero-header-2nd, .top-bar").removeClass("shift");
	// $(".hero-header-2nd").removeClass("shift");
}

//scroll to top
function topFunction() {
	document.body.scrollTop = 0; // For Safari
	document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }

// after page loads
$(document).ready(function() {

	var prevScrollpos = window.pageYOffset;
	window.onscroll = function() {
		var currentScrollPos = window.pageYOffset;
		  if (window.pageYOffset != 0) {
			document.getElementById("navbar").style.backgroundColor = "var(--main-bg-color)";
			document.getElementById("proj-img-switch").style.opacity = "0";
			document.getElementById("body").style.backgroundColor = "var(--main-bg-color)";
		  } 
		  else {
			document.getElementById("navbar").style.backgroundColor = "transparent";
			document.getElementById("proj-img-switch").style.opacity = "1";
		  }
		  prevScrollpos = currentScrollPos;
		}

	window.setTimeout(animatePageLoad, 300);


 	// track mouse movement and change about picture
    $(".about-container").mousemove(function(event){
		newX = event.pageX;
		newY = event.pageY;
		chooseAbtPic();
		// setAbtPic();
	});

    // track mouse movement inside home image and change project picture
	$(".proj-img-switch-container").mousemove(function(event){
		newX = event.pageX;
		newY = event.pageY;
		chooseProj();
	});
	 

});
