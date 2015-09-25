<!--HomePage Layout Starts Here -->
<!-- Form variable is for the admin form -->

<!-- 
Level.Title variable is different page names and  used for breadcrumbs/ if statements 

--> 




<section id="content">

<%  if $Level(1) %>

<h1>$Level(1).Title</h1>




	<% if $Level(2) %>


	<h1>$Level(2).Title</h1>


	<% end_if %>



<%  end_if %>



<article id='slideshows'>
<% if Slideshows %>

<div class="autoplay">
 


 
 <% loop Slideshows %>
 
<div>
 <a class="example-image-link"
 href="$Photo.Link"
 data-lightbox="sameSet" data-title="$Description">
 
$Photo.setHeight(170)
<br>
 </a>
$Description

</div>
  

<% end_loop %>

</div>

<% end_if %>

</article>


<article>
$Content
$Form  

$ContactForm
$PageComments

</article>
</section>
