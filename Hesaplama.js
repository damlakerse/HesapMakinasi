const display = document.querySelector('.calculator-input');
const keys = document.querySelector('.calculator-keys');

let displayValue ='0';
let firstValue = null;
let operator = null;
let waitingForSecondValue = false;

function updateDisplay() {
  display.value = displayValue;
}

keys.addEventListener('click', function(e) {
  const element = e.target;
  const value = element.value;

  if (!element.matches('button')) return;

  switch (value) {
    case '+':
    case '-':
    case '*':
    case '/':
    case '=':
      handleOperator(value);
      break;
    case '.':
      inputDecimal();
      break;
    case 'clear':
      clear();
      break;
    default:
      inputNumber(value);
  }

  updateDisplay();
});

function handleOperator(nextOperator) {
  const value = parseFloat(displayValue);

  if (operator && waitingForSecondValue) {
    operator = nextOperator;
  } else {
    if (firstValue === null) {
      firstValue = value;
    } else {
      const result = calculate(firstValue, value, operator);

      displayValue = `${parseFloat(result.toFixed(7))}`;
      firstValue = result;
    }
  }

  waitingForSecondValue = true;
  operator = nextOperator;
}

function calculate(first, second, operator) {
  switch (operator) {
    case '+':
      return first + second;
    case '-':
      return first - second;
    case '*':
      return first * second;
    case '/':
      return first / second;
  }

  return second;
}

function inputNumber(num) {
  if (waitingForSecondValue) {
    displayValue = num;
    waitingForSecondValue = false;
  } else {
    displayValue = displayValue === '0' ? num : displayValue + num;
  }
}

function inputDecimal() {
  if (!displayValue.includes('.')) {
    displayValue += '.';
  }
}

function clear() {
  displayValue = '0';
  firstValue = null;
  operator = null;
  waitingForSecondValue = false;

  updateDisplay();
}