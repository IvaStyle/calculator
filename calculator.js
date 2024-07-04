const calculator = document.querySelector(".calculator");
const display = calculator.querySelector(".calculator__total");
const buttons = calculator.querySelectorAll(".calculator__col, .calculator__nulle");

let firstValue = "";
let operator = "";
let secondValue = "";
let shouldResetDisplay = false;

buttons.forEach(button => {
    button.addEventListener("click", () => handleButtonClick(button.textContent));
});

document.addEventListener("keydown", (event) => handleKeyPress(event));

function handleButtonClick(value) {
    if (value >= "0" && value <= "9") {
        handleNumberInput(value);
    } else if (value === "C") {
        handleClear();
    } else if (value === "⌫") {
        handleBackspace();
    } else if (value === "=" || value === "Enter") {
        handleEquals();
    } else if (value === "," || value === ".") {
        handleDecimal();
    } else {
        handleOperator(value);
    }
}

function handleKeyPress(event) {
    const key = event.key;
    if (key >= "0" && key <= "9") {
        handleNumberInput(key);
    } else if (key === "c" || key === "C") {
        handleClear();
    } else if (key === "Backspace") {
        handleBackspace();
    } else if (key === "=" || key === "Enter") {
        handleEquals();
    } else if (key === "," || key === ".") {
        handleDecimal();
    } else if (["+", "-", "*", "/", "%"].includes(key)) {
        handleOperator(key === "/" ? "÷" : key);
    }
}

function handleNumberInput(value) {
    if (shouldResetDisplay) {
        display.textContent = "";
        shouldResetDisplay = false;
    }
    if (operator) {
        secondValue += value;
        display.textContent = secondValue;
    } else {
        firstValue += value;
        display.textContent = firstValue;
    }
}

function handleClear() {
    firstValue = "";
    operator = "";
    secondValue = "";
    display.textContent = "0";
}

function handleBackspace() {
    if (operator && secondValue) {
        secondValue = secondValue.slice(0, -1);
        display.textContent = secondValue || "0";
    } else if (!operator && firstValue) {
        firstValue = firstValue.slice(0, -1);
        display.textContent = firstValue || "0";
    }
}

function handleEquals() {
    if (firstValue && operator && secondValue) {
        firstValue = String(calculate(firstValue, operator, secondValue));
        display.textContent = firstValue.replace(".", ",");
        operator = "";
        secondValue = "";
        shouldResetDisplay = true;
    }
}

function handleDecimal() {
    if (operator) {
        if (!secondValue.includes(",")) {
            secondValue += ",";
            display.textContent = secondValue;
        }
    } else {
        if (!firstValue.includes(",")) {
            firstValue += ",";
            display.textContent = firstValue;
        }
    }
}

function handleOperator(value) {
    if (!operator) {
        operator = value;
        shouldResetDisplay = true;
    } else if (value === "%") {
        if (firstValue && !secondValue) {
            firstValue = String(Number(firstValue.replace(",", ".")) / 100);
            display.textContent = firstValue.replace(".", ",");
        } else if (firstValue && secondValue) {
            secondValue = String(Number(firstValue.replace(",", ".")) * (Number(secondValue.replace(",", ".")) / 100));
            display.textContent = secondValue.replace(".", ",");
        }
    }
}

function calculate(first, operator, second) {
    first = Number(first.replace(",", "."));
    second = Number(second.replace(",", "."));

    switch (operator) {
        case "+":
            return first + second;
        case "-":
            return first - second;
        case "*":
            return first * second;
        case "÷":
            return first / second;
        case "%":
            return first * (second / 100);
        default:
            return 0;
    }
}
