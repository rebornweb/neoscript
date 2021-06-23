const listIngredients =  [ "flour", "sugar", "Chocolate", "butter" ];

const answer = listIngredients.includes("Chocolate");

//console.log(answer);


if (answer){
    return  console.log("We are going to make a chocolate cake");

} else {

    return console.log("We are NOT going to make a chocolate cake, because we are missing the ingredient chocolate");
}