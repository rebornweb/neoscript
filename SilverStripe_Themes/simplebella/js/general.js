$(function(){


$('nav li ul').hide().removeClass('fallback');
$('nav.navmain li').hover(
  function () {
    $('ul', this).stop().slideDown(100);
  },
  function () {
    $('ul', this).stop().slideUp(100);
  }
);

//This is to top lock the nav

$(window).scroll(function () {
      //if you hard code, then use console
      //.log to determine when you want the 
      //nav bar to stick.  
      console.log($(window).scrollTop())
    if ($(window).scrollTop() > 0) {
      $('nav').addClass('navbar-fixed');
    }else if ($(window).scrollTop() < 1) {
      $('nav').removeClass('navbar-fixed');
    }
  });


});

