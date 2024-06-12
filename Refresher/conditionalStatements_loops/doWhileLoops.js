// Print numbers from 1 to 10.
let i = 1;
do {
    console.log(i++);
} while (i <= 10);

// Calculate the sum of all numbers from 1 to 100
let j = 1;
let sum = 0;

do {
    sum += j
    j++
} while (j <= 100);
console.log(sum)


// Prompt the user to enter a number greater than 10.
let number;
do {
    number = prompt("Enter a number");
} while (number < 10);

// Guessing game
let guess = Math.floor(Math.random() * 10) + 1;
let input;
do {
    input = prompt("Guess a number between 1 and 10: ");
} while (input != guess);
console.log("The number is ", guess);
