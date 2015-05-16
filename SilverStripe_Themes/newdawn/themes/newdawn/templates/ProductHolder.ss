<!DOCTYPE HTML>
<html>

<head>
<% base_tag  %> <!-- Base tag makes the framework relative -->






<% include Metas %>
<!--Require starts from home page root-->

<% include GlobalHead %>
<% include simpleCart %>
<% include parallaxScroll %>

</head>


<body>
<div id="picother" class="bg-holder" data-width="1024" data-height="768"><!--The rest of the Picture code is in the Layouts-->

<% include Header %>
<!--Next time figure out how to use  include Header and Navigation just relax now idiota-->


<!--This is the Page.ss-->
$Layout


<% include Footer %>


<!--script>
$(function(){

$('.bg-holder#pic1').css('background-image', "url('$ThemeDir/img/red.jpg')");


});


</script-->

</body>




</html>
