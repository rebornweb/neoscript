// You own a great car website that helps people make decisions about buying the best new car for them. You decide that if you had a calculator on the website which lets people know their car's value after depreciation in a couple of years, would be a great idea!

// Write a function that takes the car's value when new (p) and return its value to 2 decimal places in the nth year (n).

// Yearly depreciation:

// Year 1 = 20%

// Year 2 = 20%

// Year 3+ = 10% per year (ie. after 3 years the cars value depreciates 10% every year)

// Return your answer as a string with 2 decimal places.

function car(p,y){
    //should probably buy a 2nd hand car
//let newP = p - (0.2 * p);

for (i = 0; i < y ; i++) {
    
if (y > 0){
let minusP = (0.2 * p ); 
p -= minusP
console.log('Price: ' + p + 'Year:' + y );
} else if (y >= 4){
    let minusP = (0.1 * p );
    p -= minusP 
    // const newPdec = newP.toFixed(2);
    console.log('Year is: ' + y + 'New price: ' + p);
    return newPdec
}

}



}

car(10000,4);



// const Test = require('@codewars/test-compat');

// describe("Tests", () => {
//   it("test", () => {
// Test.assertEquals(car(10000,1), '8000.00')
// Test.assertEquals(car(5681,2), '3635.84')
// Test.assertEquals(car(8000,3), '4608.00')
//   });
// });
