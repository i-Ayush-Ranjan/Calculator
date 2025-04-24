const resultElement = document.getElementById('result');
const clearBtn = document.getElementById('clear-button');
const deleteBtn = document.getElementById('delete-button');
const divideBtn = document.getElementById('divide-button');
const multiplyBtn = document.getElementById('multiply-button');
const subtractBtn = document.getElementById('subtract-button');
const addBtn = document.getElementById('add-button');
const decimalBtn = document.getElementById('decimal-button');
const equalBtn = document.getElementById('equal-button');

const numberBtns= document.querySelectorAll('.number');

// initialise the variables

let result='';
let operation='';
let previousOperand=0;

// function to appned number

const appendNumber=(number)=>
{
    if(number === '.' && result.includes('.'))
    {
        return;
    }
    result+=number;
    updateDisplay();
}

//function to update display
const updateDisplay= () => {

    if(operation)
    {
        resultElement.innerText= `${previousOperand} ${operation} ${result}`;
    }
    else
    {

        resultElement.innerText= result;
    }

}

// function to select operator
const selectOperator = (operatorValue) =>
{
    if(result === '')
    {
        return;
    }
    if(operation !== '' && previousOperand !== '')
    {
        calculateResult();
    }

    operation= operatorValue;
    previousOperand=result;
    result='';
    updateDisplay();
}


// function to calculate result

const calculateResult = () =>
{
    let evalutedraesult;
    const prev = parseFloat(previousOperand);
    const current= parseFloat(result);

    if(isNaN(prev) || isNaN(current))
    {
        return;
    }

    switch (operation) {
        case '+':
            evalutedraesult=prev + current
            break;
        case '-':
            evalutedraesult=prev - current
            break;
        case '*':
            evalutedraesult=prev * current
            break;
        case '/':
            evalutedraesult=prev / current
            break;  
    
        default:
            return;
    }

    result = evalutedraesult.toString();
    operation='';
    previousOperand='';
}

// add event listener to number buttons
numberBtns.forEach(button => {
    button.addEventListener('click', ()=> {
        appendNumber(button.innerText);
    });
});

// Function to clear display
const clearDisplay = () =>
{
    result='';
    previousOperand='';
    operation='';
    updateDisplay();
}

// Function delete last character
const deleteLastDigit = () =>
{
    if (result === '' && operation !== '') {
        // Remove the operator and bring back the previous operand
        result = previousOperand;
        previousOperand = '';
        operation = '';
    } else if (result !== '') {
        // Delete last digit from result
        result = result.slice(0, -1);
    }
    updateDisplay();
}


decimalBtn.addEventListener('click', ()=>  appendNumber('.'));
addBtn.addEventListener('click', ()=> selectOperator('+'));
subtractBtn.addEventListener('click', ()=> selectOperator('-'));
multiplyBtn.addEventListener('click', ()=> selectOperator('*'));
divideBtn.addEventListener('click', ()=> selectOperator('/'));
equalBtn.addEventListener('click',() => 
{
    if(result === '')
    {
        resturn;
    }
    calculateResult();
    updateDisplay();
});

clearBtn.addEventListener('click', clearDisplay);
deleteBtn.addEventListener('click', deleteLastDigit);
