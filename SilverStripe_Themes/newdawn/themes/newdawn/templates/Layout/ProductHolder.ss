

<section id="content">

    <article>
        <h1>$Title</h1>
        <div class="content">

$Content
            <table>
        
                <tbody>
                <% loop $Children %>
                    <tr>
                        <td>
                            <a href="$Link">$Title</a>
                        </td>    
                        <td>
                            <% loop $ProductDetail %>                                
                                $Category<% if $Last !=1 %>,<% end_if %>
                            <% end_loop %>
                        </td>    
                    </tr>
                <% end_loop %>
                </tbody>
                </table>
        </div>
    </article>
	<a href="javascript:;" class="simpleCart_checkout">Checkout</a>
</section>

 </div><!--End of First Parallax div--> 


