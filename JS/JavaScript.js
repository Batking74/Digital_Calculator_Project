// Targeting Elements
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

decimalOperand.addEventListener('click', convertToDecimal);
activateCalculator();

// Converts Number System to Decimal
function activateCalculator() {
    for(let btn of buttons) {
        // By default disable hex letter buttons
        if(btn.className === hex) btn.disabled = true;
        // Adding Eventlisteners to all buttons
        btn.addEventListener('click', () => {
            const value = findValue(btn.textContent, btn);
            if(value === undefined) return;
            setCalaculationBackgroundOnClick(btn);
            validate(value, btn);
        })
    }
}




// Validates the button that the user clicked on
function validate(value, btn) {
    switch (value) {
        case 'DEL': deleteNum(); break;
        case 'AC':
            prevElement != undefined ? asign('#7aec2eb9', 2) : null;
            clearAndReset(); break;
        case sqrt: asign(sqrt, 0); i = 0; break;
        case binary: changeNumberSystem(binary, true, 8); break;
        case Hex: changeNumberSystem(Hex, false, 4); break;
        case log: asign(value, 0); asign('Log', 1); break;
        case factorial: asign(value, 0); asign('!', 1); break;
        case '=':
            const calc = isOperation();
            const hasNums = num[0] != undefined && num[1] != undefined;
            const isValid = calc[0] || operation === log || calc[1] || hasNums || i > 1;
            if(isValid) {
                asign('', 1);
                displayResults(calculate());
                asign(undefined, 0);
            }
            break;
        default: appendToCalc(value, btn);
    }
}




// If clicked on an operation button it will be highlighted
function setCalaculationBackgroundOnClick(btn) {
    const btnClass = btn.classList[1];
    if(btnClass === operationStr || btnClass === 'numSystem') {
        if(prevElement != undefined) {
            btn.style.background = 'red';
            asign('#7aec2eb9', 2);
            prevElement = btn;
        }
        else {
            btn.style.background = 'red';
            prevElement = btn;
        }
    }
}




// Converts Number System to Decimal
function convertToDecimal() {
    for(let btn of buttons) {
        if(btn.className === hex) btn.disabled = true;
        else btn.disabled = false;
    }
    numSystem = undefined;
}




// Calculates value(s)
function calculate() {
    const arithmetic = {
        '+': num[0] + num[1],
        '-': num[0] - num[1],
        '×': num[0] * num[1],
        '÷': num[0] / num[1],
        '%': num[1] * (num[0] / 100),
        'Sqrt': Math.sqrt(num[0]),
        'Mod': num[0] % num[1],
        'Log': logarithm(num[0]),
        'Pow': Math.pow(num[0], num[1]),
        'Factorial': function() {
            let factorialSum = 1;
            for(let i = num[0]; i > 0; i--) factorialSum *= i;
            return factorialSum;
        }
    }
    return calculation(arithmetic);
}




// If its a Factorial calculation call the function. Else calculate user inputs
function calculation(res) {
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




// Changes the number System to Binary or Hexadecimal
function changeNumberSystem(system, isDisabled, num) {
    if(numSystem != system) {
        for(let i = 0; i < buttons.length; i++) {
            const btnClass = buttons[i].classList;
            const btnClass2 = btnClass[1] === operationStr;
            if((btnClass[0] != bit && num == 8) || btnClass2) {
                buttons[i].disabled = isDisabled;
            }
            if(num != 8) {
                if(buttons[i].textContent === '.' || btnClass2) {
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
        asign(newNumbers, 1);
        if(!(newNumbers.length <= 0)) {
            asign(parseFloat(newNumbers).toString(2), 3);
            asign(parseFloat(binaryOperand.textContent, 2).toString(16), 4);
        }
        else asign('', 3); asign('', 4);
    }
}




// Resets Calculator
function clearAndReset() {
    asign('', 1);
    asign('', 3);
    asign('', 4);
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
        asign(parseFloat(factorialNum), 5);
        asign(`${factorialNum}!`, 1);
    }
    // If the calculation is Logarithm. Execute this code.
    else if(operation === log) {
        const logNum = `${decimalOperand.textContent.replace('Log','')}${value}`;
        asign(parseFloat(logNum), 5);
        asign(`Log${logNum}`, 1);
    }

    /*
    if the calculation is already defined and its not a sqrt, and the button (value) the user clicked on was is a number. Execute this code
    */
    else if(operation != undefined && isAnumber && operation != sqrt) {
        if(i == 0) asign('', 1);
        else if (i > 1) clearAndReset();
        num[1] = parseFloat(`${decimalOperand.textContent}${value}`);
        displayResults(value);
        i++;
    }
    
    // if the button the User clicked on was an operator execute this code
    else if(btn.classList[1] === operationStr) {
        asign(value, 0);
    }
    
    // if the button (value) the user clicked on was a number, and the calculation is not defined Execute this code
    else if(isAnumber && operation === undefined) {
        if(i == 1) asign('', 1);
        else if(i > 1) clearAndReset();
        asign(parseFloat(`${decimalOperand.textContent}${value}`), 5);
        displayResults(value);
    }

    // If the calculation is Sqrt. Execute this code.
    else if(isOperation()[1]) {
        if(i > 1) clearAndReset();
        asign(`${decimalOperand.textContent}${value}`, 5);
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
    if(numSystem === binary ) {
        binaryOperand.textContent += value;
        asign(parseFloat(binaryOperand.textContent, 2), 1);
        asign(parseFloat(binaryOperand.textContent, 2).toString(16), 4);
    }
    // Hexadecimal
    else if(numSystem === Hex) {
        hexOperand.textContent += value;
        asign(parseFloat(hexOperand.textContent, 16), 1);
        asign(parseFloat(decimalOperand.textContent).toString(2), 3);
    }
    // Decimal
    else {
        decimalOperand.textContent += value;
        asign(parseFloat(decimalOperand.textContent).toString(2), 3);
        asign(parseFloat(binaryOperand.textContent, 2).toString(16), 4);
    }
}

// Assigns values to variables and Dom Elements
function asign(value, index) {
    if(index == 0) operation = value;
    else if(index == 1) decimalOperand.textContent = value;
    else if(index == 2) prevElement.style.background = value;
    else if(index == 3) binaryOperand.textContent = value;
    else if(index == 4) hexOperand.textContent = value;
    else if(index == 5) num[0] = value;
}


// Logarithm Algorithm
function logarithm(number) {
    let log = 0;
    while(number > 1) {
        number /= 2;
        log++;
    }
    return log;
}

function isOperation() { return [operation === factorial, operation === sqrt]; }