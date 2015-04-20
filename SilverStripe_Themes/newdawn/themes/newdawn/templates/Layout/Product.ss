
<section id="content">

   <article>

        <h1>$Title</h1>
        

            $Content
            

    <span class="simpleCart_quantity"></span> items - <span class="simpleCart_total"></span>
    <a href="javascript:;" class="simpleCart_checkout">Checkout</a>
	  <div class="simpleCart_items"></div>
         <% if $ProductDetails %>
                
                <% loop $ProductDetails %>
		<article class="simpleCart_shelfItem">
		<div class="photo">$Photo.SetWidth(150)</div>
                    <div class="item_name">$Name</div>  
			<div class="item_price">$$CostPrice</div>
<a href="javascript:;" class="item_add">Add to Cart</a>
        </article>
	        <% end_loop %>



            <% end_if %>
        



</article>
</section>
 </div><!--End of First Parallax div--> 


