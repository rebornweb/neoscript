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

});

