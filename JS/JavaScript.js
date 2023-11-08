const buttons = document.getElementsByTagName('button');
const binaryOperand = document.getElementById('binary-operand');
const hexOperand = document.getElementById('hex-operand');
const decimalOperand = document.getElementById('decimal-operand');
const operations = document.querySelectorAll('.operation');
const hexButtons = document.querySelectorAll('.hex');
let num = new Array(3);
let operation, numSystem, i = 0;
let string = ['Binary', 'Hex', 'hex', 'Factorial', 'bit', 'Log', 'Sqrt', 'operation'];
[binary, Hex, hex, factorial, bit, log, sqrt, operationStr] = string;

for(let btn of buttons) {
    if(btn.className === hex) {
        btn.disabled = true;
    }
    btn.addEventListener('click', (e) => {
        const value = findValue(e.target.textContent, btn);
        switch (value) {
            case 'DEL': deleteNum(); break;
            case 'AC': clearAndReset(); break;
            case sqrt: operation = sqrt; break;
            case factorial:
                operation = value;
                decimalOperand.textContent = '!';
                break;
            case binary:
                if(numSystem != binary) {
                    for(let i = 0; i < buttons.length; i++) {
                        if(!(buttons[i].classList.contains(bit))) {
                            buttons[i].disabled = true;
                        }
                    }
                    numSystem = binary;
                }
                break;
            case Hex:
                if(numSystem != Hex) {
                    for(let i = 0; i < buttons.length; i++) {
                        buttons[i].disabled = false;
                    }
                    numSystem = Hex;
                }
                break;
            case '=':
                console.log(num[0])
                const f = num[0] != undefined && num[1] != undefined;
                if(operation === factorial || operation === log || operation === sqrt || f) {
                    decimalOperand.textContent = '';
                    displayResults(calculate());
                }
                break;
            default: appendToCalc(value, e.target);
            }
        })
}


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
        factorial: function() {
            let factorialSum = 1;
            for(let i = num[0]; i > 0; i--) factorialSum *= i;
            return factorialSum;
        }
    }
    num[2] = 200;
    if(operation === factorial) {
        return res[operation]();
    }
    else {
        console.log(num[0])
        console.log(operation)
        console.log(res[operation])
        num[0] = res[operation];
        return res[operation];
    }
}

// Deletes 
function deleteNum() {
    let numbers = decimalOperand.textContent;
    if(!(numbers === undefined)) {
        const newNumbers = numbers.substring(0, numbers.length - 1);
        decimalOperand.textContent = newNumbers;
        if(!(decimalOperand.textContent.length <= 0)) {
            binaryOperand.textContent = parseInt(decimalOperand.textContent).toString(2);
            hexOperand.textContent = parseInt(binaryOperand.textContent, 2).toString(16);
        }
        else {
            binaryOperand.textContent = '';
            hexOperand.textContent = '';
        }
    }
}

function clearAndReset() {
    decimalOperand.textContent = '';
    hexOperand.textContent = '';
    binaryOperand.textContent = '';
    i = 0;
    num[0] = 0;
    num[1] = 0;
    num[2] = '';
}

function findValue(value, btn) {
    if(!(btn.classList.contains('other')) && value.length == 1 && !(btn.classList.contains(hex)) && !(btn.classList.contains(operationStr))) {
            return parseFloat(value);
        }
        return value;
        }

function appendToCalc(value, btn) {
    if(operation === factorial) {
        const factorialNum = `${decimalOperand.textContent.replace('!','')}${value}`;
        num[0] = parseInt(factorialNum);
        decimalOperand.textContent = `${factorialNum}!`;
    }
    else if(operation != undefined && typeof value === 'number') {
        if(i == 0) decimalOperand.textContent = '';
        num[1] = parseFloat(`${decimalOperand.textContent}${value}`);
        displayResults(value);
        i++;
    }
    else if(btn.classList.contains(operationStr)) {
        operation = value;
    }
    else if(typeof value === 'number' && operation === undefined) {
        num[0] = parseFloat(`${decimalOperand.textContent}${value}`);
        displayResults(value);
    }
    else if(operation === sqrt) {
        num[0] = value;
    }
    else if(numSystem === Hex) {
        displayResults(value);
    }
    else if(numSystem === binary) {
        displayResults(value);
    }
}


function displayResults(value) {
    if(num[2] == 200) {
        clearAndReset();
    }
    if(numSystem === binary) {
        binaryOperand.textContent += value;
        decimalOperand.textContent = parseInt(binaryOperand.textContent, 2);
        hexOperand.textContent = parseInt(binaryOperand.textContent, 2).toString(16);
    }
    else if(numSystem === Hex) {
        hexOperand.textContent += value;
        decimalOperand.textContent = parseInt(hexOperand.textContent, 16);
        binaryOperand.textContent = parseInt(decimalOperand.textContent).toString(2);
    }
    else {
        decimalOperand.textContent += value;
        binaryOperand.textContent = parseInt(decimalOperand.textContent).toString(2);
        hexOperand.textContent = parseInt(binaryOperand.textContent, 2).toString(16);
    }
}