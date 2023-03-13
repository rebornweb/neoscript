//Issue Firefox Auto-fill takes Email input as username instead of Username as Username in Form Submission

// Solution is to Take the Username input with value and slot it right before the email


//This is to prevent autofill from taking Email as Username
var cloneandInsertUsername = function (){
  
  const usernameElem = document.querySelector('#newSignInName');
  const emailElem = document.querySelector('#email');
 
   let cloneElem = usernameElem.cloneNode(true);
   
   cloneElem.id = 'newSignInNameHidden';
   cloneElem.setAttribute("hidden", true); 
   emailElem.before(cloneElem);
 
 }
 
 cloneandInsertUsername();