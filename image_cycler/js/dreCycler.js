(function(){
/*
*jQuery Cycle Plugin for images
*
*Andrei Nicolas
*
*Visit Fork,Visit if good star at http://github.com/rebornweb/neoscript
*
*Visit us at Rebornweb.co.nz
*
*Usage: add class='dreCycler' to div wrap
*<div class='dreCycler'>
*<img src='img/tiger.jpg'/>
    <img src='img/girls.jpg'/>
*</div>

*/

var dSliders = function (test){
this.test = test;
var dSlider = $('div.dreCycler img');
dSlider.css({
  'display':'none',
  'position':'absolute'
            });





}//End dSliders

var setterInit = function (test) {
  dSliders.call(this,test);
          //console.log(dlen);
}


setterInit.prototype = Object.create(dSliders.prototype);

  setterInit.prototype.start = function() {
 var dSlider = $('div.dreCycler img'),   
  shiftingspeed = 1500,
  dlen = dSlider.length,
restartTime = (dlen * shiftingspeed);


         
 for(var i=0 ; i < dlen; i++){
   
   //console.log($(this).eq(i).attr('src'));

  (function(i){ 
     setTimeout(function(){
     dSlider.eq(i).fadeIn(shiftingspeed);
 
    setTimeout(function(){
      dSlider.eq(i).fadeOut(shiftingspeed);
           },shiftingspeed);
      
    }, i * shiftingspeed);

    }(i));//Funny Loop

  
}//End for loop

//to call this use object.function.object obj.start().restartTime
return {restartTime}
  }
  

 
 var obj = new setterInit('Dre Image Cycler');

 
//First Init
obj.start();
 
 
setInterval(function(){
obj.start();
},obj.start().restartTime);

})();