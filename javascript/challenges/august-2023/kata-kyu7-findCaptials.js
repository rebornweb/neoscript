const capitals = (word) => {
   const array = [];
    word.split('').forEach((element,index) => {
        
        if(element === element.toUpperCase()){
       
            array.push(index);
        }
       
        
    });
    return array
}

capitals('HellO');

// const chai = require("chai");
// const assert = chai.assert;
// chai.config.truncateThreshold=0;

// describe("Basic tests", () => {
//   it("Testing for fixed tests", () => {
//     assert.deepEqual(capitals('CodEWaRs'), [0,3,4,6] );
//   });
// });