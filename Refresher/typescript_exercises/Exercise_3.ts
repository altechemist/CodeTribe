// Exercise 3: Functions

// 1. Write a function that takes two numbers as parameters and returns their sum
const sum = (x: number, y: number): number => {
    return x + y;
};

// 2. Write a function that returns a fixed number
const magicNumber = (): number => {
    return 42;
};

// 3. Write a function that takes a string and an optional boolean parameter.
// If the boolean is true, return the string in uppercase; otherwise, return it in lowercase.
const toUpper = (text: string, upper?: boolean): string => {
    if (upper)
        return text.toUpperCase();

    return text;
}