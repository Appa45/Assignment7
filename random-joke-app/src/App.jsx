
import { useState } from "react";
import "./App.css";

const createEmptyBoard = () =>
  Array.from({ length: 9 }, () => Array(9).fill(""));

function App() {
  const [board, setBoard] = useState(createEmptyBoard);
  const [message, setMessage] = useState("");
  const [isValid, setIsValid] = useState(null);

  const handleChange = (row, col, value) => {
    if (!/^[1-9]?$/.test(value)) return;

    const updatedBoard = board.map((r) => [...r]);
    updatedBoard[row][col] = value;

    setBoard(updatedBoard);
    setMessage("");
    setIsValid(null);
  };

  const validateSudoku = () => {
    const values = board.flat();

    if (values.some((value) => value === "")) {
      setMessage("Please fill all cells before validating.");
      setIsValid(false);
      return;
    }

    const isValidGroup = (group) =>
      new Set(group).size === 9 &&
      group.every((value) => /^[1-9]$/.test(value));

    // Validate rows
    for (let row = 0; row < 9; row++) {
      if (!isValidGroup(board[row])) {
        setMessage("Invalid Sudoku! Duplicate numbers found in a row/column/3x3 box.");
        setIsValid(false);
        return;
      }
    }

    // Validate columns
    for (let col = 0; col < 9; col++) {
      const column = board.map((row) => row[col]);

      if (!isValidGroup(column)) {
        setMessage("Invalid Sudoku! Duplicate numbers found in a row/column/3x3 box.");
        setIsValid(false);
        return;
      }
    }

    // Validate 3x3 boxes
    for (let boxRow = 0; boxRow < 9; boxRow += 3) {
      for (let boxCol = 0; boxCol < 9; boxCol += 3) {
        const box = [];

        for (let row = boxRow; row < boxRow + 3; row++) {
          for (let col = boxCol; col < boxCol + 3; col++) {
            box.push(board[row][col]);
          }
        }

        if (!isValidGroup(box)) {
          setMessage("Invalid Sudoku! Duplicate numbers found in a row/column/3x3 box.");
          setIsValid(false);
          return;
        }
      }
    }

    setMessage("Congratulations! The Sudoku grid is valid.");
    setIsValid(true);
  };

  const clearBoard = () => {
    setBoard(createEmptyBoard());
    setMessage("");
    setIsValid(null);
  };

  return (
    <div className="app">
      <div className="container">
        <h1>Sudoku Validator</h1>

        <p>Enter numbers 1-9 and validate the board.</p>

        <div className="board">
          {board.map((row, rowIndex) =>
            row.map((value, colIndex) => (
              <input
                key={`${rowIndex}-${colIndex}`}
                type="text"
                inputMode="numeric"
                maxLength="1"
                className="cell"
                value={value}
                onChange={(event) =>
                  handleChange(rowIndex, colIndex, event.target.value)
                }
                aria-label={`Row ${rowIndex + 1} Column ${colIndex + 1}`}
              />
            ))
          )}
        </div>

        <div className="buttons">
          <button onClick={validateSudoku}>Validate</button>
          <button onClick={clearBoard}>Clear</button>
        </div>

        {message && (
          <p className={isValid ? "success-message" : "error-message"}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
}

export default App;
