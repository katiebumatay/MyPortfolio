// variables to control slideshows
var showProcess = false;
var slideIndex;
var slideId;
var numSlideshows = document.getElementsByClassName("slideshow-container");
var n = numSlideshows.length;
console.log(n);
checkNumSlideshows();

// check how many slideshows are on the page and initialize accordingly
function checkNumSlideshows(){
  if (n == 0) {
    return;
  }
  else if (n ==1) {
    slideIndex = [1];
    slideId = ["mySlides1"];
    showSlides(1, 0);
  }
  else if (n == 2) {
    slideIndex = [1, 1];
    slideId = ["mySlides1", "mySlides2"];
    showSlides(1, 0);
    showSlides(1, 1);
  }
  else if (n == 3) {
    slideIndex = [1,1,1];
    slideId = ["mySlides1", "mySlides2", "mySlides3"];
    showSlides(1, 0);
    showSlides(1, 1);
    showSlides(1, 2);
  }
  else if (n == 4) {
    slideIndex = [1,1,1,1];
    slideId = ["mySlides1", "mySlides2", "mySlides3", "mySlides4"];
    showSlides(1, 0);
    showSlides(1, 1);
    showSlides(1, 2);
    showSlides(1, 3);
  }
}

// change slide when user clicks next/prev buttons
function plusSlides(n, no) {
  showSlides(slideIndex[no] += n, no);
}

// show current slide
function showSlides(n, no) {
  var i;
  var x = document.getElementsByClassName(slideId[no]);
  if (n > x.length) {slideIndex[no] = 1}
  if (n < 1) {slideIndex[no] = x.length}
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";  
  }
  x[slideIndex[no]-1].style.display = "block"; 
}

$(document).ready(function() {

  // show and hide The Process section when user clicks button
	$(".button-process").click(function(){
        $("#process").toggleClass("process-hide");
        if (showProcess == false) {
          $(".button-process a").text("Hide Process");
          showProcess = true;
        }
        else if (showProcess == true) {
          $(".button-process a").text("View Process");
          showProcess = false;
        }
     });

});
