const buttons = document.getElementsByTagName('button');
const binaryOperand = document.getElementById('binary-operand');
const hexOperand = document.getElementById('hex-operand');
const decimalOperand = document.getElementById('decimal-operand');
const operations = document.querySelectorAll('.operation');
const hexButtons = document.querySelectorAll('.hex');
let num = new Array(3);
let operation, isAnumber, numSystem, i = 0, prevElement;
let string = ['Binary', 'Hex', 'hex', 'Factorial', 'bit', 'Log', 'Sqrt', 'operation'];
[binary, Hex, hex, factorial, bit, log, sqrt, operationStr] = string;

// Converts Number System back to Decimal
decimalOperand.addEventListener('click', () => {
    for(let btn of buttons) {
        if(btn.className === hex) btn.disabled = true;
        else btn.disabled = false;
    }
    numSystem = undefined;
})

for(let btn of buttons) {

    // By default disable hex letters
    if(btn.className === hex) btn.disabled = true;
    btn.addEventListener('click', (e) => {
        const value = findValue(e.target.textContent, btn);
        if(btn.classList[1] === operationStr || btn.classList[1] === 'numSystem') {
            if(prevElement != undefined) {
                console.log(prevElement)
                btn.style.background = 'red'
                prevElement.style.background = '#7aec2eb9';
                prevElement = btn;
            }
            else {
                btn.style.background = 'red';
                prevElement = btn;
            }
        }
        switch (value) {
            case 'DEL': deleteNum(); break;
            case 'AC':
                prevElement.style.background = '#7aec2eb9';
                clearAndReset(); break;
            case sqrt: operation = sqrt; i = 0; break;
            case binary: changeNumberSystem(binary, true, 8); break;
            case Hex: changeNumberSystem(Hex, false, 4); break;
            case factorial:
                operation = value;
                decimalOperand.textContent = '!';
                break;
            case '=':
                const calc = isOperation();
                const hasNums = num[0] != undefined && num[1] != undefined;
                const isValid = calc[0] || operation === log || calc[1] || hasNums || i > 1;
                if(isValid) {
                    decimalOperand.textContent = '';
                    displayResults(calculate());
                    operation = undefined;
                }
                break;
            default: appendToCalc(value, e.target);
            }
        })
}

// Calculates value(s)
function calculate() {
    const res = {
        '+': (num[0] + num[1]),
        '-': (num[0] - num[1]),
        '×': (num[0] * num[1]),
        '÷': (num[0] / num[1]),
        '%': (num[1] * (num[0] / 100)),
        'Sqrt': Math.sqrt(num[0]),
        'Mod': (num[0] % num[1]),
        'Pow': (Math.pow(num[0], num[1])),
        'Factorial': function() {
            let factorialSum = 1;
            for(let i = num[0]; i > 0; i--) factorialSum *= i;
            return factorialSum;
        }
    }

    if(isOperation()[0]) {
        if(i < 0) return;
        i++;
        return res[operation]();
    }
    else {
        num[0] = res[operation];
        i++;
        return num[0];
    }
}

// Changes the number System
function changeNumberSystem(system, isDisabled, num) {
    if(numSystem != system) {
        for(let i = 0; i < buttons.length; i++) {
            const btnClass = buttons[i].classList;
            if((btnClass[0] != bit && num == 8) || btnClass[1] === operationStr) {
                buttons[i].disabled = isDisabled;

            }
            if(num != 8) {
                if(buttons[i].textContent === '.' || btnClass[1] === operationStr) {
                    buttons[i].disabled = true;
                }
                else buttons[i].disabled = isDisabled;
            }
        }
        numSystem = system;
    }
}

// Deletes Number from far right
function deleteNum() {
    let numbers = decimalOperand.textContent;
    if(numbers != undefined) {
        const newNumbers = numbers.substring(0, numbers.length - 1);
        decimalOperand.textContent = newNumbers;
        if(!(newNumbers.length <= 0)) {
            binaryOperand.textContent = parseInt(newNumbers).toString(2);
            hexOperand.textContent = parseInt(binaryOperand.textContent, 2).toString(16);
        }
        else {
            binaryOperand.textContent = '';
            hexOperand.textContent = '';
        }
    }
}

// Resets Calculator
function clearAndReset() {
    decimalOperand.textContent = '';
    hexOperand.textContent = '';
    binaryOperand.textContent = '';
    i = 0;
    num[0] = 0;
    num[1] = 0;
    num[2] = '';
}

// Checks if the user clicked on a numerical value and returns it. else returns non-numerical value.
function findValue(value, btn) {
    const isNotSpecialChar = value != '.' && value != '=';
    const notACharBesidesNum = value.length == 1 && btn.classList[0] != hex && btn.classList[1] != operationStr;
    if(isNotSpecialChar && notACharBesidesNum) {
        isAnumber = true;
        return parseFloat(value);
    }
    isAnumber = false;
    return value;
}

// Appends different calculations to operand
function appendToCalc(value, btn) {

    // If the calculation is Factorial. Execute this code.
    if(isOperation()[0]) {
        const factorialNum = `${decimalOperand.textContent.replace('!','')}${value}`;
        num[0] = parseInt(factorialNum);
        decimalOperand.textContent = `${factorialNum}!`;
    }

    /*
    if the calculation is already defined and its not a sqrt, and the button (value) the user clicked on was is a number. Execute this code
    */
    else if(operation != undefined && isAnumber && operation != sqrt) {
        if(i == 0) decimalOperand.textContent = '';
        else if (i > 1) clearAndReset();
        num[1] = parseFloat(`${decimalOperand.textContent}${value}`);
        displayResults(value);
        i++;
    }
    
    // if the button the User clicked on was an operator execute this code
    else if(btn.classList[1] === operationStr) {
        operation = value;
    }
    
    // if the button (value) the user clicked on was a number, and the calculation is not defined Execute this code
    else if(isAnumber && operation === undefined) {
        if(i == 1) decimalOperand.textContent = '';
        else if(i > 1) clearAndReset();
        num[0] = parseFloat(`${decimalOperand.textContent}${value}`);
        displayResults(value);
    }

    // If the calculation is Sqrt. Execute this code.
    else if(isOperation()[1]) {
        if(i > 1) clearAndReset();
        num[0] = `${decimalOperand.textContent}${value}`;
        displayResults(value);
    }

    // If the Numerical System is Hexadecimal. Execute this code.
    else if(numSystem === Hex) {
        if(i > 1) clearAndReset();
        displayResults(value);
    }

    // If the Numerical System is Binary. Execute this code.
    else if(numSystem === binary) {
        if(i > 1) clearAndReset();
        displayResults(value);
    }
    else {
        decimalOperand.textContent += value;
    }
}

// Converts all numbers to decimal, hexadecimal, and binary
function displayResults(value) {

    // Binary
    if(numSystem === binary) {
        binaryOperand.textContent += value;
        decimalOperand.textContent = parseInt(binaryOperand.textContent, 2);
        hexOperand.textContent = parseInt(binaryOperand.textContent, 2).toString(16);
    }
    // Hexadecimal
    else if(numSystem === Hex) {
        hexOperand.textContent += value;
        decimalOperand.textContent = parseInt(hexOperand.textContent, 16);
        binaryOperand.textContent = parseInt(decimalOperand.textContent).toString(2);
    }
    // Decimal
    else {
        decimalOperand.textContent += value;
        binaryOperand.textContent = parseInt(decimalOperand.textContent).toString(2);
        hexOperand.textContent = parseInt(binaryOperand.textContent, 2).toString(16);
    }
}

function isOperation() { return [operation === factorial, operation === sqrt]; }