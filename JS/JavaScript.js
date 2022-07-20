// The constructor takes all the inputs and functions for the calculator. In this case it's taking the previousOperandTextElement and the currentOperandTextElement so we know where to place our display text for our calculator.
class calculator {
    constructor{previousOperandTextElement, currentOperandTextElement} {this.previousOperandTextElement = previousOperandTextElement
    currentOperandTextElement = currentOperandTextElement
    this.clear()
    }
// This function clears out all different variables.
    clear(); {
        this.currentOperand = ''
        this.previousOperand = ''
        // If the user hits the clear button there will be no operation in the calculator because the user didn't select anything yet.
        this.operation = undefined
    }
// The delete function removes a single number.
    delete(); {

    }
// Everytime a user clicks on a number it will append, and add it to the screen aka currentOperandTextElement.
    appendNumber(number); {

    }
// This function needs to take the particular operation that the user selected. (opperation).
    chooseOperation(opperation); {

    }
// This takes the values inside of your calculator and compute the single value for what we need to display on the calculator.
    compute(); {

    }
// This updates the values inside of our output.
    updateDisplay(); {

    }

// querySelectorAll is going to give us all elements that match a certain string.
// data attributes always go inside brackets.
const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]')
// Since this is a single button you don't need "All" at the end.
const equalButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const clearButton = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')
// You define classes in JS by using the word "new" followed by the class name.
const calculator = new calculator(previousOperandTextElement, currentOperandTextElement)