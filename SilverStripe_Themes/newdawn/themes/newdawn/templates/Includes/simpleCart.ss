<script src="$ThemeDir/js/simpleCart.min.js" charset="utf-8" ></script>
<script type="text/javascript" charset="utf-8">
$(function(){
   simpleCart({ 
//For PayPal  
 currency: "NZD", 
    checkout: {
    type: "PayPal" ,
    email: "you@hotmail.com",

    
    marchantID: "XXXXXXXXX" ,
    // http method for form, "POST" or "GET", default is "POST"
    method: "POST"
    }

    
/*
 checkout: {
type: "AmazonPayments" ,
merchant_signature: "c2lnbmF0dXJlIGZvciBDaGVja291dCBieSBBbWF6b24" ,
merchant_id: "AEIOU1234AEIOU",
aws_access_key_id: "XXX" ,
// optional parameters
// http method for form, "POST" or "GET", default is "POST"
method: "GET" ,
// use sandbox server, default is false
sandbox: true ,
// optional weight unit for calculating shipping, default is "lb"
weight_unit: "lb"
} 
*/

 


});


});
</script>
