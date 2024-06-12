//  Check if a number is divisible by 2, 3, or both
let number = 100;
let message = "";

// If the number is divisible both by 2 and 3, print "Divisible by both."
if (number % 2 === 0 && number % 3 === 0)
    message = "Divisible by both.";

// If the number is divisible by only 2, print "Divisible by 2."
else if (number % 2 === 0)
    message = "Divisible by 2.";

// If the number is divisible by only 3, print "Divisible by 3."
else if (number % 3 === 0)
    message = "Divisible by 3.";
else
    message = "Not divisible by 2 or 3.";

console.log(message);


// Using switch
switch (true) {
    case number % 2 === 0 && number % 3 === 0:
        message = "Divisible by both.";
        break;
    case number % 2 === 0:
        message = "Divisible by 2.";
        break;
    case number % 3 === 0:
        message = "Divisible by 3.";
        break;
    default:
        message = "Not divisible by 2 or 3.";
}

console.log(message);
