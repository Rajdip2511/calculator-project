// Select elements
const display = document.querySelector('#display');
const buttons = document.querySelectorAll('.button');

let firstOperand = null;
let secondOperand = null;
let currentOperator = null;
let shouldResetDisplay = false;

// Update display
function updateDisplay(value) {
    display.textContent = value;
}

// Clear calculator
function clearCalculator() {
    firstOperand = null;
    secondOperand = null;
    currentOperator = null;
    shouldResetDisplay = false;
    updateDisplay('0');
}

// Perform the operation
function operate(operator, a, b) {
    switch (operator) {
        case '+': return a + b;
        case '-': return a - b;
        case '*': return a * b;
        case '/': return b !== 0 ? a / b : 'Error';
        default: return null;
    }
}

// Handle button click
function handleButtonClick(value) {
    if (!isNaN(value) || value === '.') {
        if (shouldResetDisplay) {
            updateDisplay(value);
            shouldResetDisplay = false;
        } else {
            updateDisplay(display.textContent === '0' ? value : display.textContent + value);
        }
    } else if (value === 'C') {
        clearCalculator();
    } else if (value === '=') {
        if (currentOperator && firstOperand !== null) {
            secondOperand = parseFloat(display.textContent);
            const result = operate(currentOperator, firstOperand, secondOperand);
            updateDisplay(result);
            firstOperand = result;
            secondOperand = null;
            currentOperator = null;
        }
    } else {
        if (currentOperator && !shouldResetDisplay) {
            secondOperand = parseFloat(display.textContent);
            const result = operate(currentOperator, firstOperand, secondOperand);
            updateDisplay(result);
            firstOperand = result;
        } else {
            firstOperand = parseFloat(display.textContent);
        }
        currentOperator = value;
        shouldResetDisplay = true;
    }
}

// Add event listeners to buttons
buttons.forEach(button => {
    button.addEventListener('click', () => {
        handleButtonClick(button.textContent);
    });
});

// Handle keyboard input
document.addEventListener('keydown', (event) => {
    const key = event.key;
    if (!isNaN(key) || key === '.') {
        handleButtonClick(key);
    } else if (['+', '-', '*', '/'].includes(key)) {
        handleButtonClick(key);
    } else if (key === 'Enter' || key === '=') {
        handleButtonClick('=');
    } else if (key === 'Escape') {
        handleButtonClick('C');
    } else if (key === 'Backspace') {
        const currentDisplay = display.textContent;
        updateDisplay(currentDisplay.length > 1 ? currentDisplay.slice(0, -1) : '0');
    }
});
