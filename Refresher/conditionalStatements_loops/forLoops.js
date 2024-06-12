// Print numbers from 1 to 10.
for (let i = 1; i <= 10; i++){
    console.log(i)
}


// Print all even numbers between 1 and 20.
for (let i = 1; i <= 20; i++){
    if (i % 2 === 0)
        console.log(i)
}

//  Calculate the sum of all numbers from 1 to 100 and print the result.
let sum = 0
for (let i = 1; i <= 100; i++){
    sum += i
}
console.log(sum)

//  Given the array of numbers, print each element to the console
const numbers = [1, 2, 3, 4, 5]
for (n in numbers)
    console.log(numbers[n])

// Given the array of numbers, find and print the largest number.
const moreNumbers = [3, 7, 2, 5, 10, 6]
let largestValue
for (n in moreNumbers){ 
    for (j in moreNumbers){
        if (moreNumbers[n] < moreNumbers[j]) {
            largestValue = moreNumbers[j]
        }
    }
}
console.log("largestValue =", largestValue)