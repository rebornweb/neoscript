 $(function(){

 /**
  *Made by Andrei Nicolas
  *Rebornweb.co.nz still at Beta test
  *Fork if you wish
  * Usage: it needs to be Wrapped in a  div or
       any element with class='wavingwrap'
       and with an anchor inside then content that waves.
  *
  */
 
   var wavingElements = $(".wavingwrap div");
  var strsplit = $('.wavingwrap a').html(); 
 
  var wavingAnchors = $(".wavingwrap a");
 var TotalLen = wavingAnchors.text().length;
   var a1len = wavingAnchors.eq(0).text().length;
    var a2len = wavingAnchors.eq(1).text().length;
   var a3len = wavingAnchors.eq(2).text().length;
var a4len = wavingAnchors.eq(3).text().length;


var ahref = $('.wavingwrap a').attr('href');

  //This is to wrap all Single Varchars with Divs
appendingSplit();

function appendingSplit() {

       for (var i = 0; i < strsplit.length;  i ++) {

       //This works for spliting strings
var anchorSplit = $('.wavingwrap a').eq(i).text();  

var spllength =  anchorSplit.length;
  //console.log(spllength);
  var wavingB = wavingAnchors.text();


 }//End For loop string split

   for (var e = 0; e < wavingB.length;  e ++) {

     $('<div style="display:inline-block;"> '+ wavingB[e] + '<div>').appendTo('.wavingwrap a');
  
     }
//This works with one anchor yes
//contents gets both anchor and divs in a line then select it with eq then .remove 

 $(".wavingwrap a").contents().eq(0).remove();

 //alert(TotalLen);


}//End String Split function
 

  function mrLoopy() {
  
   var wavingElements = $(".wavingwrap div");
   var str = $('.wavingwrap a').text();
   var incrementUp = '-10px';
   var incrementDown = '-2px';
   var mechUps = {'transform':'translate3d(0px,'+ incrementUp +',0px)','Moztransform':'translate3d(0px,'+ incrementUp +',0px)','WebkitTransform':'translate3d(0px,'+ incrementUp +',0px)','msTransform':'translate3d(0px,'+ incrementUp +',0px)'};
   var mechDowns = {'transform':'translate3d(0px,'+ incrementDown +',0px)','Moztransform':'translate3d(0px,'+ incrementDown +',0px)','WebkitTransform':'translate3d(0px,'+ incrementDown +',0px)','msTransform':'translate3d(0px,'+ incrementDown +',0px)'};
   var time = 100;
   var waveSpeed = 30;
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
$(".wavingwrap div").hover( 
    function (){ //On mouseover

     
   mrLoopy();

 }, //End mouseover
    function() {//On mouseleave  
        }
      ) //End of Hover Bracket  

      $(".wavingwrap a").click(function(){mrLoopy();});

      
});//END script