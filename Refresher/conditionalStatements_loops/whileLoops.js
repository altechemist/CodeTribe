//  Print numbers from 1 to 10.
let i = 1
while (i <= 10) {
    console.log(i++)
}

// Print all even numbers between 1 and 20
let j = 1
while (j <= 20){
    if (j % 2 === 0)
        console.log(j)
    j++
}


// Calculate the sum of all numbers from 1 to 100 and print the result.
let k = 1
let sum = 0
while (k <= 100){
    sum += k
    k++
}
console.log(sum)

// Print all multiples of 5 less than 50.
let m = 50
while (m >= 1){
    if (m % 5 === 0)
        console.log(m)
    m--
}
