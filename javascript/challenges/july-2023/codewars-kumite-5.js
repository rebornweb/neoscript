describeAge=a=>(x=>"You're a(n) "+(["kid","teenager","adult"].find((i,id)=>a<=x[id])||"elderly"))([12,17,64])

console.log(describeAge(25));