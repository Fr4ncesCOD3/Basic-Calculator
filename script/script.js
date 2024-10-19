const inputDisplay = document.getElementById('input-display-text');
const numberButtons = document.getElementById('number-buttons');
const operatorButtons = document.querySelectorAll('.operator');
const buttonBackspace = document.getElementById('backspace');
const buttonEquals = document.getElementById('equals');
const buttonClear = document.getElementById('clear');

let currentInput = '';
let currentOperator = '';
let previousInput = '';

// Funzione per aggiornare il display
const updateDisplay = () => {
    inputDisplay.value = currentInput;
};

// Funzione per visualizzare i pulsanti numerici
const displayNumberButtons = () => {
    for (let i = 9; i >= 0; i--) {
        const button = document.createElement('button');
        button.textContent = i;
        button.addEventListener('click', () => addToDisplay(i.toString()));
        numberButtons.appendChild(button);
    }
};

// Funzione per gestire gli operatori
const handleOperator = (operator) => {
    if (currentInput !== '') {
        if (previousInput !== '') {
            calculateResult();
        }
        previousInput = currentInput;
        currentInput = '';
        currentOperator = operator;
    }
};

// Funzione per calcolare il risultato
const calculateResult = () => {
    if (previousInput !== '' && currentInput !== '' && currentOperator !== '') {
        try {
            const result = eval(`${previousInput} ${currentOperator} ${currentInput}`);
            currentInput = result.toString();
            previousInput = '';
            currentOperator = '';
            updateDisplay();
        } catch (error) {
            currentInput = 'Errore';
            updateDisplay();
        }
    }
};

// Funzione per aggiungere un valore al display
const addToDisplay = (value) => {
    currentInput += value;
    updateDisplay();
};

// Funzione per cancellare l'ultimo carattere
const deleteLastEntry = () => {
    currentInput = currentInput.slice(0, -1);
    updateDisplay();
};

// Funzione per gestire l'input da tastiera
const handleKeyboardInput = (key) => {
    const validKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+', '-', '*', '/', '.', 'Enter', 'Backspace'];
    
    if (validKeys.includes(key)) {
        if (key === 'Enter') {
            calculateResult();
        } else if (key === 'Backspace') {
            deleteLastEntry();
        } else if (['+', '-', '*', '/'].includes(key)) {
            handleOperator(key);
        } else {
            addToDisplay(key);
        }
    }
};

// Inizializzazione
displayNumberButtons();

// Event listeners
operatorButtons.forEach(button => {
    button.addEventListener('click', () => handleOperator(button.dataset.operator));
});

buttonEquals.addEventListener('click', calculateResult);

buttonClear.addEventListener('click', () => {
    currentInput = '';
    previousInput = '';
    currentOperator = '';
    updateDisplay();
});

buttonBackspace.addEventListener('click', deleteLastEntry);

document.addEventListener('keydown', (event) => handleKeyboardInput(event.key));
