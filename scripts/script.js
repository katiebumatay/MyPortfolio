// variables to track mouse movement
var oldX = 0; var oldY = 0; var newX = 0; var newY = 0;

// variables to choose which about picture to display
var abtPic; var abtPicChoice;

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

	//Nav animation when scrolling
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

});
