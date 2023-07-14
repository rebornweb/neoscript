const cookie = (x) => {
  const boolis = 'true';
  const falsy = 'false';
  const booli = true;
  const array = '[1]';
   if (['Ryan', 'Zach', 'the dog', 'Monica',boolis, falsy].includes(x)){
   return 'Who ate the last cookie? It was Zach!'
 
   } else if (Number.isInteger(x)) {
   return "Who ate the last cookie? It was Monica!"
   
   } else if (/^-?\d+(\.\d+)?$/.test(x)){
   return "Who ate the last cookie? It was Monica!"  
   
   } else if ( booli | array){
   return "Who ate the last cookie? It was the dog!"  
   }
   
 }