/*Forked By
 *
 *Vinnie Watson(Vinstah)
 *
 *Andrei Nicolas Waving Animation
 *
 *
 *
 *Makes ul li anchors wave
 *
 * just <ul class='wavingwrap'>
 *
 * Enjoy
 *
 */

jQuery.fn.waveElement = function(){
	var el = $(this);
	// console.log(el);

	countUl = el.children('li').length;
	// console.log(countUl);
	el.children('li').each(function(i, obj){
		// console.log($(this));
		splitString = appendSplit($(this).children('a').text());
		// console.log(splitString);
		$(this).children('a').html(splitString);
	});

	
	
	function appendSplit(string){
		// console.log(string);
		strLength = string.length;
		newString = '';
		// console.log(strLength);
		for (var i = 0; i < string.length; i++) {
			// console.log(string[i]);
			if(string[i] != ' '){
				newString += '<div style="display:inline-block;"> '+ string[i] + '</div>';
			}else{
				newString += ' ';
			}
			
		};
		return newString;
	}




	el.children('li').hover(function(){ 
		var wavingElements = $(this).find('div');
		str = $(this).text();
		// console.log(str);
		incrementUp = '-10px';
		incrementDown = '-2px';
		mechUps = {'transform':'translate3d(0px,'+ incrementUp +',0px)','Moztransform':'translate3d(0px,'+ incrementUp +',0px)','WebkitTransform':'translate3d(0px,'+ incrementUp +',0px)','msTransform':'translate3d(0px,'+ incrementUp +',0px)'};
		mechDowns = {'transform':'translate3d(0px,'+ incrementDown +',0px)','Moztransform':'translate3d(0px,'+ incrementDown +',0px)','WebkitTransform':'translate3d(0px,'+ incrementDown +',0px)','msTransform':'translate3d(0px,'+ incrementDown +',0px)'};
		time = 100;
		waveSpeed = 30;

		for (var i=0; i < wavingElements.length; i++) {
			(function(i){
			setTimeout(function(){
				wavingElements.eq(i).css(mechUps);

				setTimeout(function(){
			  		wavingElements.eq(i).css(mechDowns);
			    },time);

			}, i * waveSpeed);	
		}(i));

		}//End of Infamous for loop
	});//On mouseover
};

$(".wavingwrap").waveElement();