const buttons = document.getElementsByTagName('button');
const currOperand = document.getElementById('current-operand');
const prevOperand = document.getElementById('previous-operand');
const operations = document.querySelectorAll('#operation');
let numOfCalculations = 0;
let firstNum;
let operation;

for(let btn of buttons) {
    btn.addEventListener('click', (e) => {
        if(numOfCalculations == 1) {
            prevOperand.textContent = currOperand.textContent;
            currOperand.textContent = '';
            numOfCalculations--;
        }
        const value = e.target.textContent;
        if(value === 'DEL') deleteNum();
        else if(value === 'AC') {currOperand.textContent = ''; prevOperand.textContent = ''; }
        else if(value === '=') { calculate(value); }
        else if(!(isOperation(value))) currOperand.textContent += (e.target.textContent).toString();
    })
}

function isOperation(value) {
    let isOperation = false;
    for(let i = 0; i < operations.length; i++) {
        if(value === operations[i].textContent) {
            operation = operations[i].textContent;
            firstNum = parseInt(currOperand.textContent);
            currOperand.textContent = '';
            isOperation = true;
        }
    } return isOperation;
}

function deleteNum() {
    if(!(currOperand.textContent === undefined)) {
        currOperand.textContent = currOperand.textContent.substring(0, currOperand.textContent.length - 1);
    }
}

function calculate(value) {
    if(!(operation === undefined)) {
        const result = {
            '+': (firstNum + parseInt(currOperand.textContent)),
            '-': (firstNum - parseInt(currOperand.textContent)),
            '×': (firstNum * parseInt(currOperand.textContent)),
            '÷': (firstNum / parseInt(currOperand.textContent))
        }
        for(let i = 0; i < Object.keys(result).length; i++) {
            if(operation === Object.keys(result)[i] && value != prevOperand.textContent) {
                currOperand.textContent = Object.values(result)[i];
            }
            else currOperand.textContent = Object.values(result)[i];
        } numOfCalculations++;
    }
}