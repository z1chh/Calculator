// Answer Text Zone
var txt = document.getElementById("answer-panel");


// Buttons
var b0 = document.getElementById("grid-item-0");
var b1 = document.getElementById("grid-item-1");
var b2 = document.getElementById("grid-item-2");
var b3 = document.getElementById("grid-item-3");
var b4 = document.getElementById("grid-item-4");
var b5 = document.getElementById("grid-item-5");
var b6 = document.getElementById("grid-item-6");
var b7 = document.getElementById("grid-item-7");
var b8 = document.getElementById("grid-item-8");
var b9 = document.getElementById("grid-item-9");
var bAC = document.getElementById("grid-item-15");
var bPe = document.getElementById("grid-item-17");
var bPM = document.getElementById("grid-item-18");
var bPl = document.getElementById("grid-item-11");
var bMi = document.getElementById("grid-item-12");
var bMu = document.getElementById("grid-item-13");
var bDi = document.getElementById("grid-item-14");
var bD = document.getElementById("grid-item-10");
var bEq = document.getElementById("grid-item-16");


// Equation Log
var equation = [];
var index = 0;
var operatorEnteredLast = false;
var firstInputEntered = false;


// Reset
bAC.onclick = () => {
    operatorEnteredLast = false;
    firstInputEntered = false;
    txt.innerHTML = "";
    equation = [];
    index = 0;
    console.log(`eq length is ${equation.length}`);
}


// Numbers
const addNumber = (n) => {
    // Reset the txt.innerHTML
    if (!firstInputEntered) {
        txt.innerHTML = "";
    }
    // Clear the txt.innerHTML and move onto the next element
    if (operatorEnteredLast) {
        txt.innerHTML = "";
        index++;
    }
    // Special Cases with "0" and "-0"
    if (txt.innerHTML === "0") {
        if (n === "0") {
            operatorEnteredLast = false;
        } else {
            txt.innerHTML = n;
            operatorEnteredLast = false;
            firstInputEntered = true;
        }
    } else if (txt.innerHTML === "-0") {
        if (n === "0") {
            operatorEnteredLast = false;
        } else {
            txt.innerHTML = "-" + n;
            operatorEnteredLast = false;
            firstInputEntered = true;
        }
    } else {
        txt.innerHTML += n;
        operatorEnteredLast = false;
        firstInputEntered = true;
    }
}

b0.onclick = () => addNumber("0");
b1.onclick = () => addNumber("1");
b2.onclick = () => addNumber("2");
b3.onclick = () => addNumber("3");
b4.onclick = () => addNumber("4");
b5.onclick = () => addNumber("5");
b6.onclick = () => addNumber("6");
b7.onclick = () => addNumber("7");
b8.onclick = () => addNumber("8");
b9.onclick = () => addNumber("9");


// Dot
const addDec = () => {
    // First value entered
    if (!firstInputEntered) {
        firstInputEntered = true;
        operatorEnteredLast = false;
        txt.innerHTML = "0.";
    } else if (operatorEnteredLast) {
        // Clear the txt.innerHTML and move onto the next element
        firstInputEntered = true;
        operatorEnteredLast = false;
        txt.innerHTML = "0.";
        index++;
    } else {
        txt.innerHTML += ".";
        firstInputEntered = true;
        operatorEnteredLast = false;
    }
}

bD.onclick = () => addDec();
// parseFloat(1.1) + parseFloat(0.);


// Operators
const addOperator = (o) => {
    if (firstInputEntered) {
        if (!operatorEnteredLast) {
            operatorEnteredLast = true;
            equation[index++] = txt.innerHTML;
        }
        equation[index] = o;
    }
}
bPl.onclick = () => addOperator("+");
bMi.onclick = () => addOperator("-");
bMu.onclick = () => addOperator("*");
bDi.onclick = () => addOperator("/");


// Percentage
const perc = () => {
    // Check that an input was already entered, and that last input was not an operator
    if (firstInputEntered && !operatorEnteredLast) {
        txt.innerHTML = parseFloat(txt.innerHTML) / 100;
    }
}

bPe.onclick = () => perc();


// Negation
const negation = () => {
    // Check that last input was not an operator
    if (firstInputEntered && !operatorEnteredLast) {
        if (txt.innerHTML === "0") {
            txt.innerHTML = "-0";
        } else if (txt.innerHTML === "0.") {
            txt.innerHTML = "-0.";
        } else if (txt.innerHTML === "-0") {
            txt.innerHTML = "0";
        } else if (txt.innerHTML === "-0.") {
            txt.innerHTML = "0.";
        } else {
            txt.innerHTML = -parseFloat(txt.innerHTML);
        }
    } else if (!operatorEnteredLast) {
        firstInputEntered = true;
        txt.innerHTML = "-0";
    }
}

bPM.onclick = () => negation();


// Compute
bEq.onclick = () => {
    equation[index] = txt.innerHTML;
    if (equation.length === 0) {
        console.log("length is 0");
        txt.innerHTML = "0";
    } else if (equation.length % 2 === 0) {
        txt.innerHTML = "NaN";
    } else {
        var answer = equation[0];
        var operation;
        for (let i = 1; i < equation.length; i++) {
            if (i % 2 === 0) {
                switch (operation) {
                    case ("+"):
                        answer = parseFloat(answer) + parseFloat(equation[i]);
                        break;
                    case ("-"):
                        answer -= equation[i];
                        break;
                    case ("*"):
                        answer *= equation[i];
                        break;
                    case ("/"):
                        answer /= equation[i];
                        break;
                }
            } else {
                switch (equation[i]) {
                    case ("+"):
                        operation = "+";
                        break;
                    case ("-"):
                        operation = "-";
                        break;
                    case ("*"):
                        operation = "*";
                        break;
                    case ("/"):
                        operation = "/";
                        break;
                }
            }
        }
        txt.innerHTML = answer;
    }
    operatorEnteredLast = false;
    firstInputEntered = false;
    equation = [];
    index = 0;
}