//Issue Firefox Auto-fill takes Email input as username instead of Username as Username in Form Submission

// Solution is to Take the Username input with value and slot it right before the password


//This is to prevent autofill from taking Email as Username
const cloneandInsertUsername = function (){
  
    const usernameElem = document.querySelector('#newSignInName');
    const passwordElem = document.querySelector('#newResetPassword');
   
     const cloneElem = usernameElem.cloneNode(true)
     
     cloneElem.id = 'newSignInNameHidden';
     
     passwordElem.before(cloneElem);
     console.log(cloneElem);
   }
   
   cloneandInsertUsername();