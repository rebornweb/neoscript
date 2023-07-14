// Factorial 
function factorial(n) {
    if (n === 0 || n === 1) {
      return 1;
    } else {
      return n * factorial(n - 1);
    }
  }
  
  
  var person = {
    firstName: "John",
    lastName: "Doe",
    age: 30,
    greet: function() {
      console.log("Hello, my name is " + this.firstName + " " + this.lastName + ".");
    }
  };
  
  
  person.greet();
  
  
  for (var i = 1; i <= 5; i++) {
    var result = factorial(i);
    console.log("The factorial of " + i + " is " + result + ".");
  }
  