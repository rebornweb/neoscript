
/*
    **** Challenge ****
    
    For this challenge destruture the following object.
*/



const {firstname, lastname, city, companygroup: {min} } = info;
console.log(`My name is nek ${firstname} and my family name is ${lastname}`);

//All Keys from data
const {name, age, projects: {diceGame} } = student;
console.log(`I'm a student named ${name} and I'm ${age} years old and one of my projects is creating a ${diceGame}`)