//function declaration
function breakfastMenu() {
    return "I'm going to scrambled eggs for breakfast";
}

//anonymous function
const lunchMenu = function() {
    return "I'm going to eat pizza for lunch";
}

// Default Params Default Food Fallback
const dinnerMenu = (food = "Default Food")  => `I'm going to eat a ${food} for dinner`;

//console.log( dinnerMenu("Chicken Soup") );


//Challenge Default Params
const groceries = function (product = "Default Food") { 
return `I'm going to buy ${product} from the grocery shop`; 
};

console.log( groceries("Chicken Soup") );