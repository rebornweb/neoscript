//For compatiblity 
//$(function(){

//For speed
(function(){	
 /**
  *Made by Andrei Nicolas
  *Rebornweb.co.nz still at Beta test
  *Fork if you wish
  * Usage: it needs to be Wrapped in a  div or
       any element with class='wavingwrap'
       and with an anchor inside then content that waves.
       Truly Thank God
       Matthew 5:16
       
       *Visit Fork,Visit if good star at http://github.com/rebornweb/neoscript
  *
  */
 
 

 
var wavingList = function (test) {
  //Global Variable Block
  this.test = test;
  var wavingElements = $(".wavingwrap div"),
  listLi = $('.wavingwrap li'),
  strsplit = $('.wavingwrap a').html(),
  wavingAnchors = $(".wavingwrap a");
  listLi.css('list-style','none');
  
  wavingAnchors.find('div').parent().contents().filter(function() {
      return this.nodeType === 3;
    });
    

var maxLen = -50; //Max Length Slice


    
var list = $(".wavingwrap li ");
 
 list.hover( 
     function (){ //On mouseover


//Variable Block
      var anchorage = $(this).find('a'),
      ant = anchorage.text(),
      anchorlength = ant.length,
      seldiv = $('.wavingwrap a div'),
      divl = seldiv.length;
    
    
             anchorage.each(function(i){
               
  for (var e = 0; e < anchorlength;  e ++) {

$(this).append('<div class="append" style="display:inline-block; padding:0.3px;"> '+ ant[e] + '</div>');
        
        }
     
      });
     
   obj.animation();

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

      $(".wavingwrap a").click(function(){obj.animation();});

};

//Makes .wavingwrap a have div animation 
//$('.wavingwrap').wavingPlugin();

 var wavingAni = function (test) {
  wavingList.call(this,test);

    
         console.log(this.test); 
 }
  
  
    wavingAni.prototype = Object.create(wavingList.prototype);
  
    wavingAni.prototype.animation= function(test) {
      
    //Variable Block
   var wavingElements = $(".wavingwrap div"),
    str = $('.wavingwrap a').text(),
    incrementUp = '-10px',
    incrementDown = '-2px',
    mechUps = {'transform':'translate3d(0px,'+ incrementUp +',0px)','Moztransform':'translate3d(0px,'+ incrementUp +',0px)','WebkitTransform':'translate3d(0px,'+ incrementUp +',0px)','msTransform':'translate3d(0px,'+ incrementUp +',0px)'},
    mechDowns = {'transform':'translate3d(0px,'+ incrementDown +',0px)','Moztransform':'translate3d(0px,'+ incrementDown +',0px)','WebkitTransform':'translate3d(0px,'+ incrementDown +',0px)','msTransform':'translate3d(0px,'+ incrementDown +',0px)'},
    time = 100,
    waveSpeed = 30;
   
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
      
      

    }
  
  var obj = new wavingAni('waving animation');

/*Performance Testing
 var iterations = 1000;
console.time("$('.wavingwrap').wavingPlugin();");
for(var i = 0; i < iterations; i++ ){
    $('.wavingwrap').wavingPlugin();
};
console.timeEnd("$('.wavingwrap').wavingPlugin();");
  */

//For speed/performance  
})(); 

//For compatiblity
//});