const buttons = document.getElementsByTagName('button');
const currOperand = document.getElementById('current-operand');
const prevOperand = document.getElementById('previous-operand');
let numOfCalculations = 0;

for(let btn of buttons) {
    btn.addEventListener('click', (e) => {
        if(numOfCalculations === 1) { currOperand.textContent = ''; numOfCalculations--; }
        const value = e.target.textContent;
        if(value === 'DEL' && currOperand.textContent != '') deleteNum();
        else if(value === 'AC') {currOperand.textContent = ''; prevOperand.textContent = ''; }
        else if(value === '=') validate();
        else { currOperand.textContent += (e.target.textContent).toString(); }
    })
}

function deleteNum() {
    currOperand.textContent = currOperand.textContent.substring(0, currOperand.textContent.length - 1);
}

function validate() {
    if(currOperand.textContent.includes('×')) {
        const num = calculate('×');
        currOperand.textContent = num[0] * num[1];
    }
    else if(currOperand.textContent.includes('÷')) {
        const num = calculate('÷');
        currOperand.textContent = num[0] / num[1];
    }
    else if(currOperand.textContent.includes('+')) {
        const num = calculate('+');
        currOperand.textContent = num[0] + num[1];
    }
    else if(currOperand.textContent.includes('-')) {
        const num = calculate('-');
        currOperand.textContent = num[0] - num[1];
    }
    numOfCalculations++;
}

function calculate(operator) {
    const num1 = parseFloat(currOperand.textContent.substring(0, (currOperand.textContent.indexOf(operator))));
    const num2 = parseFloat(currOperand.textContent.substring((currOperand.textContent.indexOf(operator)) + 1));
    prevOperand.textContent = currOperand.textContent;
    return [num1, num2];
}