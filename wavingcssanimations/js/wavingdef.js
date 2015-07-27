 $(function(){

   var wavingElements = $(".wavingwrap div");


   var strsplit = $('.wavingwrap a').html(); 
  

var contentEl = wavingElements.length;


var ahref = $('.wavingwrap a').attr('href');

  //This is to wrap all Single Varchars with Divs


appendingSplit();
//appending();
 
function appendingSplit() {

       for (var i = 0; i < strsplit.length;  i ++) {

     
       //This works lol for spliting strings

     
     
    
   var wavingAnchors = $(".wavingwrap a");
 
  

  var wavingB = wavingAnchors.text();

    
   

 }//End For loop string split

   for (var e = 0; e < wavingB.length;  e ++) {

     $('<div> '+ wavingB[e] + '<div>').appendTo('.wavingwrap a');

     }
//This works with one anchor yess
//contents gets both anchor and divs in a line then select it with eq then .remove 
 $(".wavingwrap a.1").contents().eq(0).remove();
//  $(".wavingwrap a.2").eq(0).remove();
  //$(".wavingwrap a.2").eq(2).remove();

}//End String Split function
 

//This Works Idiota

  function mrLoopy() {
  
   var wavingElements = $(".wavingwrap div");
   var str = $('.wavingwrap a').text();
   var incrementUp = '-13px';
   var incrementDown = '-2px';
   var mechUps = {'transform':'translate3d(0px,'+ incrementUp +',0px)','Moztransform':'translate3d(0px,'+ incrementUp +',0px)','WebkitTransform':'translate3d(0px,'+ incrementUp +',0px)','msTransform':'translate3d(0px,'+ incrementUp +',0px)'};
   var mechDowns = {'transform':'translate3d(0px,'+ incrementDown +',0px)','Moztransform':'translate3d(0px,'+ incrementDown +',0px)','WebkitTransform':'translate3d(0px,'+ incrementDown +',0px)','msTransform':'translate3d(0px,'+ incrementDown +',0px)'};
   var time = 100;
   var waveSpeed = 50;
for (var i=0; i<str.length; i++) {

  (function(i){
    setTimeout(function(){
     wavingElements.eq(i).css(mechUps);
 
    setTimeout(function(){
      wavingElements.eq(i).css(mechDowns);
           },time);
      

    }, i * waveSpeed);

  }(i));

}//End of Infamous for loop
  
  }// End of Mr Loopy
$(".wavingwrap div").hover( //This is Special Cause it doesn't have callbacks
    function (){ //On mouseover

     //Initiate First
     
   mrLoopy();

 }, //End mouseover
    function() {//On mouseleave  
        }
      ) //End of Hover Bracket  

      $(".wavingwrap a").click(function(){mrLoopy();});
      
});//END script