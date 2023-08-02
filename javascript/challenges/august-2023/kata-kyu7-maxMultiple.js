const maxMultiple = (divisor, bound) => {
let multiplier = divisor;
const array= [];
 for (let i = 1; i <= bound; i++){

   let result =  i * multiplier;
   if(result <= bound){
     array.push(result);
 
   }
 }

 const maxMulti = Math.max(...array)

 return maxMulti

};

maxMultiple(2,7); 

// const chai = require("chai");
// const assert = chai.assert;
// chai.config.truncateThreshold=0;

// describe("Basic tests", () => {
//   it("Testing for fixed tests", () => {
//     assert.strictEqual(maxMultiple(2,7),6);
//     assert.strictEqual(maxMultiple(3,10),9);
//     assert.strictEqual(maxMultiple(7,17),14);
//     assert.strictEqual(maxMultiple(10,50),50);
//     assert.strictEqual(maxMultiple(37,200),185);
//     assert.strictEqual(maxMultiple(7,100),98);
//   });
// })