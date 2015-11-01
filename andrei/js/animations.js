$(document).ready(function(){




//jQuerys style for a FOR loop
$("nav ul li a").click(function(){

var pgurl = window.location.href.substr(window.location.href.lastIndexOf("/")+1);
var href = $(this).attr("href").substr($(this).attr("href").lastIndexOf("/")+1);
var listclasses = $("a.link").attr('class');

$("#loading").css("visibility","visible");
setTimeout(function(){$("#loading").css("visibility","hidden"); },2000);


//Remove all active classes from all elements
$("nav ul li a").removeClass("active");

//Add active to the one you click on
$(this).addClass("active");



$("body").click(function(){
$("div.facade").animate({bottom:'100%'},2000);
$("div.facade").fadeOut();
});

setInterval(function(){

$("div.facade").animate({bottom:'100%'},2000);
$("div.facade").fadeOut();


},6000);






 });


});


