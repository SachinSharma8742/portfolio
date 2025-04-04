const buttons = document.querySelectorAll('button');
const display = document.getElementById('display');
let calculationData = '';

buttons.forEach(button => button.addEventListener('click', addInput));
document.addEventListener('keypress', handleKeypress);

function addInput(e) {
    const userInput = e.target.innerHTML;
    const lastChar = calculationData.slice(-1);

    if (userInput === 'C') {
        calculationData = '';
    } else if (userInput === 'B') {
        calculationData = calculationData.slice(0, -1);
    } else if (userInput === '=') {
        evaluateExpression();
        return;
    } else {
        if (isOperator(userInput) && (calculationData === '' || isOperator(lastChar))) {
            return; // Prevent appending operator if it's the first character or if the last character is also an operator
        }
        calculationData += userInput;
    }

    updateDisplay();
}

function handleKeypress(e) {
    if (e.key === 'Enter' && display.value !== '') {
        evaluateExpression();
    }
}

function evaluateExpression() {
    try {
        calculationData = calculationData.replaceAll('x', '*');
        calculationData = eval(calculationData).toString();
    } catch {
        calculationData = 'Error';
    }
    updateDisplay();
}

function updateDisplay() {
    display.innerText = calculationData;
}

function isOperator(char) {
    return ['+', '-', '*', '/', 'x'].includes(char);
}


// app.js

document.getElementById('dark-mode-toggle').addEventListener('change', function(event) {
    if (event.target.checked) {
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
    }
});
