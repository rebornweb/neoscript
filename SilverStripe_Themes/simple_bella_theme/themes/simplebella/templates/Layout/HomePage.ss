<!--HomePage Layout Starts Here -->
<!-- Form variable is for the admin form -->

<!-- 
Level.Title variable is different page names and  used for breadcrumbs/ if statements 

--> 

<!--
<section>


<% if Slideshows %>

<ul class="pgwSlider">
 
 
 <% loop Slideshows %>
<li>
<img src="$Photo.Link" alt="$Name"
data-description="$Description" data-large-src="$Photo.Link"/>
</li>
  

<% end_loop %>

</ul>

<% end_if %>





</section>
</div> End of Parallax Div-->


<section id="content">

<%  if $Level(1) %>

<h1>$Level(1).Title</h1>




	<% if $Level(2) %>


	<h1>$Level(2).Title</h1>


	<% end_if %>




<%  end_if %>

<article>
$Content
$Form  

$ContactForm
$PageComments

</article>

</section>
