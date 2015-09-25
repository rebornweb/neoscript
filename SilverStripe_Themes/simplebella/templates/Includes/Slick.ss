


<% require themedCSS("slick") %>
<% require themedCSS("slick-theme") %>

<% require themedCSS("lightbox") %>



<script src="$ThemeDir/js/slick.js" charset="utf-8" ></script>

<script type="text/javascript">
$(function(){

var Slidestochange = 3;
$('.autoplay').slick({
 dots:true,
 slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2000,

 responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
    // You can unslick at a given breakpoint now by adding:
    // settings: "unslick"
    // instead of a settings object
  ]

    



});


});
</script>

