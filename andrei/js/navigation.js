//Form by Andrei Nicolas


setInterval(activePage,200);

function activePage(){


// url from browser with the href var page 
var url = window.location.href;
url = url.split('#').pop().split('?').pop();



var page = url.substring(url.lastIndexOf('/') + 1);



var getClass = document.getElementsByClassName("nav");
  
 //alert(getClass);
 
 for(i=0;i<getClass.length;i++)
 {
    var liElements = getClass[i];
    //li elements
    //alert(liElements);
       
        var getAnchor = document.getElementsByTagName("a");
        
        for(y=0;y<getAnchor.length;y++)

            {
                var anchorElements = getAnchor[y];
                
                 console.log(anchorElements);
                
                
                     var pgurl = window.location.href.substr(window.location.href
                        .lastIndexOf("/")+1);

                         var ahref = anchorElements.getAttribute("href");
                        
                       //alert(ahref);
                      
                        if (ahref == pgurl) {
                            
                            anchorElements.setAttribute ("class","active");
                            
                        }else{
                        
                        anchorElements.setAttribute ("class","");
                       }
                        
                        
                        
                        
                        
                 }

 
 
    }


}

//custom to kill advertisment
setInterval(killit,100);

function killit (){
document.getElementById("visas_style_div").style.display="none";

var yummit = document.getElementsByClassName("bModal __bPopup1");

for (i=0; i<yummit;i++){

var wang = yummit[i];

 wang.style.display="none";
}

}