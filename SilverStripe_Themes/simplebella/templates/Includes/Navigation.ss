<nav class="navmain">




<ul>
<li class="logo"><a title="$SiteConfig.Title" href="/"><img src="$ThemeDir/img/logo.png"/></a></li>

 <% loop $Menu(1) %>

	<li class="$LinkingMode">
 <a href="$Link" title="$Title.XML">
		$MenuTitle.XML
		
</a>

<% include Sidebar %><!--For Drop Down-->
	</li>


 <% end_loop %>








</ul>
</nav>



<% include Mobilemenu %>






