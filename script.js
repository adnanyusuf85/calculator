let buttons = [...document.getElementsByClassName('button')];

let screen = document.getElementById('screen');

updateDisplay("0");

buttons.forEach(button => button.addEventListener('click',buttonClick));

const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const operations = ["%", "÷", "×", "-","+"];
const signChange = "+/-";
const equalSign = "=";
const clear = "C";
const clearEntry = "CE";
const decimalSymbol =".";

let operation = ""
let number1 = 0;
let number2 = 0;

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

    if (operations.includes(buttonValue))
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
    if (presentText == 0)
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
   
}

function clearDisplay()
{
    updateDisplay("0");
}

function backSpace()
{
    updateDisplay(getDisplayText().slice(0,-1));
}

