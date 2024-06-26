/* Excise 5 : Basic calculator
Objective: Create a basic calculator class in TypeScript
that can perform addition, subtraction,multiplication, and division.

The class should include validation to ensure that the inputs are
valid numbers and that division by zero is handled correctly. */


class Calculator {
    add = (x: number, y: number): number => {
        return x + y;
    } 
    
    minus = (x: number, y: number): number => {
        return x - y;
    }

    divide = (x: number, y: number): number | string => {
        if (y === 0){
            return 'Zero Division Error.'
        }
        else {
            return x / y;
        }
    }

    multiply = (x: number, y: number): number => {
        return x * y;
    }
}
