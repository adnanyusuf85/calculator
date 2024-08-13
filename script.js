let buttons = [...document.getElementsByClassName('button')];

let screen = document.getElementById('screen');

updateDisplay("0");

buttons.forEach(button => button.addEventListener('click',buttonClick));

const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const operators = ["%", "÷", "×", "-","+"];
const signChange = "+/-";
const equalSign = "=";
const clear = "C";
const clearEntry = "CE";
const decimalSymbol =".";

const calcState = ['blank', 'operatorStored']
let presentCalcState = 'blank';
let calcNumbers = [];
let calcOperation = "";

function buttonClick(e)
{
    let buttonValue = e.srcElement.innerText;

    if (numbers.includes(buttonValue))
    {
        addNumberToDisplay(buttonValue);
    }

    if (buttonValue == ".")
    {
        addDecimalToDisplay();
    }

    if (operators.includes(buttonValue))
    {
        applyOperation(buttonValue);
    }

    if (buttonValue == signChange)
    {
        invertNumberSign();
    }

    if (buttonValue == equalSign)
    {
        getResult();
    }

    if (buttonValue == clear)
    {
        clearDisplay();
    }

    if (buttonValue == clearEntry)
    {
        backSpace();
    }
}

function updateDisplay(text)
{
    if (text=="")
        screen.innerText = "0";
    else
        screen.innerText = text;    
}

function getDisplayText()
{
    return screen.innerText;
}

function addNumberToDisplay(number)
{
    let presentText = getDisplayText();
    let newText = "";
    if (presentCalcState == 'blank' | presentCalcState == 'operatorStored' )
    {
        newText = number;
        presentCalcState = 'numbersAdded';
    }
    else
    {
        newText = presentText+number;
    }
    updateDisplay(newText);
}

function addDecimalToDisplay()
{
    if ([...getDisplayText()].includes("."))
    {
        return;
    }
    updateDisplay(getDisplayText()+".");
} 

function applyOperation(operation)
{
    if (presentCalcState == 'operatorStored')
    {
        calcOperation = operation;
        return;
    }
    calcNumbers.push(getDisplayText());
    presentCalcState = 'operatorStored';
    if (calcNumbers.length == 2)
    {
        let result = calculate(calcNumbers[0], calcNumbers[1], calcOperation);
        updateDisplay(result);
        calcNumbers = [result];
    }
    calcOperation = operation;

    
}

function clearDisplay()
{
    calcNumbers = [0];
    updateDisplay("0");
}

function backSpace()
{
    let newText = getDisplayText().slice(0,-1);
    updateDisplay(newText);
    calcNumbers[0] = Number(newText);
}

function calculate(number1, number2, operation)
{
    if (operation == "+")
    {
        return Number(number1)+Number(number2);
    }

    if (operation == "-")
        {
            return Number(number1)-Number(number2);
        }

    if (operation == "/")
    {
        return Number(number1)/Number(number2);
    }

    if (operation == "*")
    {
            return Number(number1)*Number(number2);
    }

    if (operation == "%")
    {
        return Number(number1)%Number(number2);
    }
}


