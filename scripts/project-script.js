// var slideIndex = 1;
// showSlides(slideIndex);

// // Next/previous controls
// function plusSlides(n) {
//   showSlides(slideIndex += n);
// }

// // Thumbnail image controls
// function currentSlide(n) {
//   showSlides(slideIndex = n);
// }

// function showSlides(n) {
//   var i;
//   var slides = document.getElementsByClassName("mySlides");
//   var dots = document.getElementsByClassName("dot");
//   if (n > slides.length) {slideIndex = 1}
//   if (n < 1) {slideIndex = slides.length}
//   for (i = 0; i < slides.length; i++) {
//       slides[i].style.display = "none";
//   }
//   for (i = 0; i < dots.length; i++) {
//       dots[i].className = dots[i].className.replace(" active", "");
//   }
//   slides[slideIndex-1].style.display = "block";
//   // dots[slideIndex-1].className += " active";
// }

// var slideIndex = [1,1];
// /* Class the members of each slideshow group with different CSS classes */
// var slideId = ["mySlides1", "mySlides2"]
// showSlides(1, 0);
// showSlides(1, 1);

// function plusSlides(n, no) {
//   showSlides(slideIndex[no] += n, no);
// }

// function showSlides(n, no) {
//   var i;
//   var x = document.getElementsByClassName(slideId[no]);
//   if (n > x.length) {slideIndex[no] = 1}
//   if (n < 1) {slideIndex[no] = x.length}
//   for (i = 0; i < x.length; i++) {
//     x[i].style.display = "none";
//   }
//   x[slideIndex[no]-1].style.display = "block";
// }

var slideIndex = [1,1,1,1];
var slideId = ["mySlides1", "mySlides2", "mySlides3", "mySlides4"];
showSlides(1, 0);
showSlides(1, 1);
showSlides(1, 2);
showSlides(1, 3);

function plusSlides(n, no) {
  showSlides(slideIndex[no] += n, no);
}

// function currentSlide(n, no) {
//   showSlides(slideIndex[no] = n, no);
// }

function showSlides(n, no) {
  var i;
  var x = document.getElementsByClassName(slideId[no]);
  // console.log("slideId is " + slideId);
  // console.log("no is " + no);
  if (n > x.length) {slideIndex[no] = 1}
  if (n < 1) {slideIndex[no] = x.length}
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";  
  }
  // console.log(x[slideIndex[no]-1]);
  x[slideIndex[no]-1].style.display = "block"; 
  // dots[slideIndex[no]-1].className += " active";  
}

$(document).ready(function() {

  console.log("loaded");

	// currentSlide(1);

	// var element = document.getElementById("process");

	$("#process").click(function(){
        // $(".process-container").toggleClass("process-hide").scrollTop( 0 );
        $("#process").toggleClass("process-hide");

        // $( ".process-container" ).scrollTop();
        // element.scrollIntoView(true);
     });

  // $(".img").click(function(){
  //     $(".img").toggleClass("img-full-screen");
  // });

});
