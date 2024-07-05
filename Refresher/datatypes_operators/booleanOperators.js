// Exercise 2: Boolean and Operators
let x = 8
let y = 12

// Print the two numbers
console.log("X =", x)
console.log("Y =", y)

//  If x is greater than y
if (x > y)
    console.log("X is greater than Y")


//  If x is less than or equal to y
if (x <= y)
    console.log("X is less than or equal Y")

// If x is equal to y
if (x === y)
    console.log("X is equal Y")

// If x is not equal to y
if (x !== y)
    console.log("X is not equal to Y")

// Compare boolean variables
let a = true
let b = false

console.log("a =", a)
console.log("b =", b)

console.log("a AND b", a && b)
console.log("a OR b", a || b)
console.log("NOT a", !a)

// Arithmetic operators
var p = 10
var q = 3

console.log("p =", p)
console.log("q =", q)

/* Perform addition, subtraction, multiplication, division and 
modulus */
let sum = p += q
let diff = p -= q
let product = p *= q
let quotient = p /= q
let modulo = p %= q

console.log(p + " += " + q + " =", sum)
console.log(p + " -= " + q + " =", diff)
console.log(p + " *= " + q + " =", product)
console.log(p + " /= " + q + " =", quotient)
console.log(p + " %= " + q + " =", modulo)