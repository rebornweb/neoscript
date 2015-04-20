<!--Side Bar Include Dropdown-->


	<ul class="fallback">
		
		<% loop $Children %>
		
			<li class="$LinkingMode">
				<a href="$Link" title="Visit this page $Title.XML ">
				<span class="text">$MenuTitle.XML</span>		
				
				</a>
			</li>
		<% end_loop  %>
	</ul>


