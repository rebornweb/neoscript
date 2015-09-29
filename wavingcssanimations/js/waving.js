 $(function(){

 /**
  *Made by Andrei Nicolas
  *Rebornweb.co.nz still at Beta test
  *Fork if you wish
  * Usage: it needs to be Wrapped in a  div or
       any element with class='wavingwrap'
       and with an anchor inside then content that waves.
       Truly Thank God
       Matthew 5:16
  *
  */
 
 
 //Bug if first anchor isnt the longest will spas out 
   var wavingElements = $(".wavingwrap div");
  var strsplit = $('.wavingwrap a').html(); 
 
  var wavingAnchors = $(".wavingwrap a");
  
  wavingAnchors.find('div').parent().contents().filter(function() {
      return this.nodeType === 3;
    }).remove();
    
  
 var TotalLen = wavingAnchors.text().length;
   var a1len = wavingAnchors.eq(0).text().length;
    var a2len = wavingAnchors.eq(1).text().length;
   var a3len = wavingAnchors.eq(2).text().length;
var a4len = wavingAnchors.eq(3).text().length;
var maxLen = -50; //Max Length Slice

var ahref = $('.wavingwrap a').attr('href');

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
  

    //Removes the Anchor Text
    $(this).find('div').parent().contents().filter(function() {
      return this.nodeType === 3;
    }).remove();
   
    
    
 $(".wavingwrap li ").hover( 
    function (){ //On mouseover

//Removes the Anchor Text
   $(this).find('div').parent().contents().filter(function() {
      return this.nodeType === 3;
    }).remove();
 

      var anchorage = $(this).find('a');
      var  ant = anchorage.text();
      var anchorlength = ant.length;
      var seldiv = $('.wavingwrap a div');
      var divl = seldiv.length;
    
    
             anchorage.each(function(i){
     /*
 For testing purposes          
   console.log('anchorlength: ' +anchorlength + ' div length: ' + divl);        
           */
        
  for (var e = 0; e < ant.length;  e ++) {

$(this).append('<div class="append" style="display:inline-block;"> '+ ant[e] + '</div>');
        
        }
     
      });
     
   mrLoopy();

  //Wraps and hides the Anchor Text
$(this).find('div').parent().contents().filter(function(){
      return this.nodeType === 3;
    }).wrap( "<span style='display:none;'></span>" );
$(this).find('span').css('display','none');


 }, //End mouseover
 
    function() {//On mouseleave
      
 //Wraps and hides the Anchor Text
$(this).find('span').css('display','block');
     $(this).find('div').slice(maxLen).remove();
         
        }
      
      ) //End of Hover Bracket  

      $(".wavingwrap a").click(function(){mrLoopy();});

      
   
});//END script