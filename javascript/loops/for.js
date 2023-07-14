const students = [ 
    { name: "John", city: "New York" },
    { name: "Peter", city: "Paris"},
    { name: "Kate", city: "Sidney" }
]


for ( const student of students ) {
let {name, city} = student; //Destruct
    console.log(`${name} lives in ${city}`);
}