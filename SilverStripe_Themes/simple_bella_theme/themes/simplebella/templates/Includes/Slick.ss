


<% require themedCSS("slick") %>
<% require themedCSS("slick-theme") %>




<script src="$ThemeDir/js/slick.js" charset="utf-8" ></script>

<script type="text/javascript">
$(function(){


$('.fade').slick({
  dots: true,
  infinite: true,
  speed: 500,
  fade: true,
  autoplay:true,
  autoplaySpeed:3000,
  cssEase: 'linear'
});

});
</script>