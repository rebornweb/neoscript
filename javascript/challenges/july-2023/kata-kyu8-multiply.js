const simpleMultiplication = (number) => {
  
    if ([2,4,6,8].includes(number)){
    x = number * 8;
    return x
    } else {
    y = number * 9;
    return y;    
    }
  }

  simpleMultiplication(7);


  
//   const chai = require("chai");
//   const assert = chai.assert;
//   chai.config.truncateThreshold=0;
  
//   describe("Basic Tests", () => {
//     it("Testing for fixed tests", () => {
//       assert.strictEqual(simpleMultiplication(2),16,'Should return given argument times eight...')
//       assert.strictEqual(simpleMultiplication(1),9, 'Should return given argument times nine...')
//       assert.strictEqual(simpleMultiplication(8),64,'Should return given argument times eight...')
//       assert.strictEqual(simpleMultiplication(4),32,'Should return given argument times eight...')
//       assert.strictEqual(simpleMultiplication(5),45,'Should return given argument times nine...')
//     });
//   });