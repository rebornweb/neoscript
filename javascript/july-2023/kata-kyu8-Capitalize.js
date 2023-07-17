const capitalizeWord = (word) => {
  
let firstLetter = word[0].toUpperCase();
let x =  firstLetter + word.slice(1,10);

return x;
}

capitalizeWord('hello');