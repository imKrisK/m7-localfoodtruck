import React, { useState } from 'react';

const Calculator = () => {
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [operator, setOperator] = useState('+');
  const [result, setResult] = useState(null);

  const handleCalculate = () => {
    const number1 = parseFloat(num1);
    const number2 = parseFloat(num2);

    if (isNaN(number1) || isNaN(number2)) {
      alert('Please enter valid numbers.');
      return;
    }

    let calculation;
    switch (operator) {
      case '+':
        calculation = number1 + number2;
        break;
      case '-':
        calculation = number1 - number2;
        break;
      case '*':
        calculation = number1 * number2;
        break;
      case '/':
        calculation = number2 !== 0 ? number1 / number2 : 'Error (division by zero)';
        break;
      default:
        calculation = 'Invalid operator';
    }

    setResult(calculation);
  };

  return (
    <div className="componentBox">
      <h2>Calculator</h2>
      <div>
        <label>
          Number 1:
          <input
            type="number"
            value={num1}
            onChange={(e) => setNum1(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Operator:
          <select
            value={operator}
            onChange={(e) => setOperator(e.target.value)}
          >
            <option value="+">+</option>
            <option value="-">-</option>
            <option value="*">*</option>
            <option value="/">/</option>
          </select>
        </label>
      </div>
      <div>
        <label>
          Number 2:
          <input
            type="number"
            value={num2}
            onChange={(e) => setNum2(e.target.value)}
          />
        </label>
      </div>
      <button onClick={handleCalculate}>Calculate</button>
      {result !== null && (
        <div>
          <h3>Result: {result}</h3>
        </div>
      )}
    </div>
  );
};

export default Calculator;