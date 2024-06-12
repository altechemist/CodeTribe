/*  Write a code using if else statements to check the 
temp and print a message based on the following 
conditions */

let temp = 21

if (temp < 0) {
    console.log("It's freezing!")
} else if (temp > 0 && temp < 15) {
    console.log("It's cold.")
} else if (temp > 16 && temp < 25){
    console.log("It's mild.")
} else if (temp > 25){
    console.log("It's warm.")
} else {
    console.log("It's scotching!")
}

// Using switch() statement
let message = ""
switch (true) {
    case temp < 0:
        message = "It's freezing!";
        break;
    case temp >= 0 && temp <= 15:
        message = "It's cold.";
        break;
    case temp >= 16 && temp <= 25:
        message = "It's mild.";
        break;
    default:
        message = "It's warm.";
}
console.log(message)
