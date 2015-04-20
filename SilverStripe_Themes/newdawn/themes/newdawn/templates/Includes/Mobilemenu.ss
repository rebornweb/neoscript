
<!--Mobilemenu Include -->
	<!--nav id="bt-menu" class="bt-menu">
				<div href="#" class="bt-menu-trigger"><span>Menu</span></div>
				<ul>
					<li><a href="#">About us</a></li>
					<li><a href="#">Work</a></li>
					<li><a href="#">Clients</a></li>
					<li><a href="#">Blog</a></li>
					<li><a href="#">Contact</a></li>
				</ul>
				<ul>
					<li><a href="http://www.twitter.com/codrops" class="bt-icon icon-twitter">Twitter</a></li>
					<li><a href="https://plus.google.com/101095823814290637419" class="bt-icon icon-gplus">Google+</a></li>
					<li><a href="http://www.facebook.com/pages/Codrops/159107397912" class="bt-icon icon-facebook">Facebook</a></li>
					<li><a href="https://github.com/codrops" class="bt-icon icon-github">icon-github</a></li>
				</ul>
			</nav-->
                        
<nav id="bt-menu" class="bt-menu">


<% if $Menu(1) %>
	<div href="#" class="bt-menu-trigger"><span>Menu</span></div>
<ul>
<li class="logo"><a title="$SiteConfig.Title" href="/">Logo Pic</a></li>

 <% loop $Menu(1) %>
 <li class="$LinkingMode">
 <a href="$Link" title="$Title.XML">
	

		$MenuTitle.XML
		
</a>
	</li>


 <% end_loop %>






</ul>

<% end_if %>


<% include Sidebar %>


</nav>
<br>
