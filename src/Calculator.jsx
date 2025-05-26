import { useState } from "react";

export default function Calculator() {
  const [display, setDisplay] = useState("0");
  const [operation, setOperation] = useState(null);
  const [prevValue, setPrevValue] = useState(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const [memory, setMemory] = useState(0);

  const clearAll = () => {
    setDisplay("0");
    setOperation(null);
    setPrevValue(null);
    setWaitingForOperand(false);
    setMrcClicked(false);
    if (mrcTimeout) clearTimeout(mrcTimeout);
  };

  const inputDigit = (digit) => {
    if (waitingForOperand) {
      setDisplay(String(digit));
      setWaitingForOperand(false);
    } else {
      setDisplay(display === "0" ? String(digit) : display + digit);
    }
  };

  const inputDot = () => {
    if (waitingForOperand) {
      setDisplay("0.");
      setWaitingForOperand(false);
    } else if (display.indexOf(".") === -1) {
      setDisplay(display + ".");
    }
  };

  const performOperation = (nextOperation) => {
    const inputValue = parseFloat(display);

    if (prevValue == null) {
      setPrevValue(inputValue);
    } else if (operation) {
      const currentValue = prevValue || 0;
      let newValue;

      switch (operation) {
        case "add":
          newValue = currentValue + inputValue;
          break;
        case "subtract":
          newValue = currentValue - inputValue;
          break;
        case "multiply":
          newValue = currentValue * inputValue;
          break;
        case "divide":
          newValue = currentValue / inputValue;
          break;
        default:
          newValue = inputValue;
      }

      setPrevValue(newValue);
      setDisplay(String(newValue));
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  };
  
  const handleEquals = () => {
    if (!operation || prevValue === null) return;
    
    performOperation(null);
  };
  
  const handlePercent = () => {
    const currentValue = parseFloat(display);
    const percentValue = currentValue / 100;
    setDisplay(String(percentValue));
  };
  
  const handleSquareRoot = () => {
    const currentValue = parseFloat(display);
    if (currentValue >= 0) {
      const sqrtValue = Math.sqrt(currentValue);
      setDisplay(String(sqrtValue));
    }
  };
  
  const handleToggleSign = () => {
    const currentValue = parseFloat(display);
    setDisplay(String(-1 * currentValue));
  };
  
  const [mrcClicked, setMrcClicked] = useState(false);
  const [mrcTimeout, setMrcTimeout] = useState(null);
  
  const handleMemoryRecall = () => {
    if (mrcClicked) {
      // Second click - clear memory
      setMemory(0);
      setMrcClicked(false);
      if (mrcTimeout) clearTimeout(mrcTimeout);
    } else {
      // First click - recall memory
      setDisplay(String(memory));
      setMrcClicked(true);
      
      // Set a timeout to reset the mrcClicked state after a delay
      const timeout = setTimeout(() => {
        setMrcClicked(false);
      }, 1500); // 1.5 seconds window to double-click
      
      setMrcTimeout(timeout);
    }
  };
  
  const handleMemoryAdd = () => {
    setMemory(memory + parseFloat(display));
    setMrcClicked(false);
    if (mrcTimeout) clearTimeout(mrcTimeout);
  };
  
  const handleMemorySubtract = () => {
    setMemory(memory - parseFloat(display));
    setMrcClicked(false);
    if (mrcTimeout) clearTimeout(mrcTimeout);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-900">
      <div className="bg-gray-800 p-4 rounded-lg shadow-xl w-72">
        {/* Display */}
        <div className="bg-gray-300 mb-4 p-2 rounded h-16 flex items-center justify-end text-right text-3xl font-bold overflow-hidden border-4 border-gray-500">
          {display}
        </div>

        {/* Keypad */}
        <div className="grid grid-cols-4 gap-2">
          {/* Row 1 */}
          <button
            onClick={handlePercent}
            className="bg-gray-400 hover:bg-gray-300 text-white text-xl font-bold py-4 rounded"
          >
            %
          </button>
          <button
            onClick={handleSquareRoot}
            className="bg-gray-400 hover:bg-gray-300 text-white text-xl font-bold py-4 rounded"
          >
            √
          </button>
          <button
            onClick={handleToggleSign}
            className="bg-gray-400 hover:bg-gray-300 text-white text-xl font-bold py-4 rounded"
          >
            +/-
          </button>
          <button
            onClick={clearAll}
            className="bg-blue-600 hover:bg-blue-500 text-white text-xl font-bold py-4 rounded"
          >
            C
          </button>

          {/* Row 2 */}
          <button
            onClick={handleMemoryRecall}
            className="bg-gray-500 hover:bg-gray-400 text-white text-xl font-bold py-4 rounded"
          >
            MRC
          </button>
          <button
            onClick={handleMemorySubtract}
            className="bg-gray-500 hover:bg-gray-400 text-white text-xl font-bold py-4 rounded"
          >
            M-
          </button>
          <button
            onClick={handleMemoryAdd}
            className="bg-gray-500 hover:bg-gray-400 text-white text-xl font-bold py-4 rounded"
          >
            M+
          </button>
          <button
            onClick={() => performOperation("divide")}
            className="bg-gray-600 hover:bg-gray-500 text-white text-xl font-bold py-4 rounded"
          >
            ÷
          </button>

          {/* Row 3 */}
          <button
            onClick={() => inputDigit(7)}
            className="bg-gray-200 hover:bg-gray-100 text-gray-800 text-xl font-bold py-4 rounded"
          >
            7
          </button>
          <button
            onClick={() => inputDigit(8)}
            className="bg-gray-200 hover:bg-gray-100 text-gray-800 text-xl font-bold py-4 rounded"
          >
            8
          </button>
          <button
            onClick={() => inputDigit(9)}
            className="bg-gray-200 hover:bg-gray-100 text-gray-800 text-xl font-bold py-4 rounded"
          >
            9
          </button>
          <button
            onClick={() => performOperation("multiply")}
            className="bg-gray-600 hover:bg-gray-500 text-white text-xl font-bold py-4 rounded"
          >
            ×
          </button>

          {/* Row 4 */}
          <button
            onClick={() => inputDigit(4)}
            className="bg-gray-200 hover:bg-gray-100 text-gray-800 text-xl font-bold py-4 rounded"
          >
            4
          </button>
          <button
            onClick={() => inputDigit(5)}
            className="bg-gray-200 hover:bg-gray-100 text-gray-800 text-xl font-bold py-4 rounded"
          >
            5
          </button>
          <button
            onClick={() => inputDigit(6)}
            className="bg-gray-200 hover:bg-gray-100 text-gray-800 text-xl font-bold py-4 rounded"
          >
            6
          </button>
          <button
            onClick={() => performOperation("subtract")}
            className="bg-gray-600 hover:bg-gray-500 text-white text-xl font-bold py-4 rounded"
          >
            -
          </button>

          {/* Row 5 */}
          <button
            onClick={() => inputDigit(1)}
            className="bg-gray-200 hover:bg-gray-100 text-gray-800 text-xl font-bold py-4 rounded"
          >
            1
          </button>
          <button
            onClick={() => inputDigit(2)}
            className="bg-gray-200 hover:bg-gray-100 text-gray-800 text-xl font-bold py-4 rounded"
          >
            2
          </button>
          <button
            onClick={() => inputDigit(3)}
            className="bg-gray-200 hover:bg-gray-100 text-gray-800 text-xl font-bold py-4 rounded"
          >
            3
          </button>
          <button
            onClick={() => performOperation("add")}
            className="bg-gray-600 hover:bg-gray-500 text-white text-xl font-bold py-4 rounded row-span-2"
          >
            +
          </button>

          {/* Row 6 */}
          <button
            onClick={() => inputDigit(0)}
            className="bg-gray-200 hover:bg-gray-100 text-gray-800 text-xl font-bold py-4 rounded col-span-1"
          >
            0
          </button>
          <button
            onClick={inputDot}
            className="bg-gray-200 hover:bg-gray-100 text-gray-800 text-xl font-bold py-4 rounded"
          >
            .
          </button>
          <button
            onClick={handleEquals}
            className="bg-gray-200 hover:bg-gray-100 text-gray-800 text-xl font-bold py-4 rounded"
          >
            =
          </button>
        </div>
      </div>
    </div>
  );
}