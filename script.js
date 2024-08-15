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
let number1;
let calcOperation = "";
let lastInput = "";

function buttonClick(e)
{
    let buttonValue = e.srcElement.innerText;

    if (numbers.includes(buttonValue))
    {
        addNumberToDisplay(buttonValue);
        lastInput = 'number';
    }

    if (buttonValue == ".")
    {
        addDecimalToDisplay();
    }

    if (operators.includes(buttonValue))
    {
        applyOperation(buttonValue);
        lastInput = 'operator';
    }

    if (buttonValue == signChange)
    {
        invertNumberSign();
    }

    if (buttonValue == equalSign)
    {
        updateDisplay(getResult());
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
        modifiedText = "0";
    else
    {
        if (text > 1e8)
        {
            document.getElementById('exponent-indicator').classList.add('exponent-on');
            modifiedText = (Number(text)/1e8).toString().slice(0,8);    
        }
        else
        {
            document.getElementById('exponent-indicator').classList.remove('exponent-on');
            modifiedText = text; 
        }
        screen.innerText = modifiedText;    
    }
}

function getDisplayText()
{
    return screen.innerText;
}

function addNumberToDisplay(number)
{
    let presentText = getDisplayText();
    let newText = "";
    if ((presentText === "0" | calcOperation != '') & lastInput!='number')
    {
        newText = number;
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
    if (lastInput == 'operator')
    {
        calcOperation = operation;
        return;
    }

    if (calcOperation == '')
    {
        calcOperation = operation;
        calcNumbers[0] = getDisplayText();
    }
    else
    {
        calcNumbers = [getResult()];
        updateDisplay(calcNumbers[0]);
        calcOperation = operation;
    }
    
}

function clearDisplay()
{
    setBlank();
    calcOperation = '';
    lastInput = '';
}

function backSpace()
{
    let presentText = getDisplayText();

    if (presentText.length != 0)
    {
        let newText = getDisplayText().slice(0,-1);
        updateDisplay(newText);
    }
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

    if (operation == "÷")
    {
        return Number(number1)/Number(number2);
    }

    if (operation == "×")
    {
            return Number(number1)*Number(number2);
    }

    if (operation == "%")
    {
        return Number(number1)%Number(number2);
    }
}

function getResult()
{
    calcNumbers[1] = getDisplayText();
    let result = calculate(calcNumbers[0], calcNumbers[1], calcOperation);
    calcNumbers = [result];
    presentCalcState = 'resultOutput';
    calcOperation = '';
    return result;
}

function setBlank()
{
    updateDisplay("0");

    calcNumbers = [];
}


