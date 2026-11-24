
import React, { useState } from "react";
import "./App.css";

const initialBoard = Array(9)
  .fill(null)
  .map(() => Array(9).fill(""));

function App() {
  const [board, setBoard] = useState(
    initialBoard.map((row) => [...row])
  );

  const [message, setMessage] = useState("");
  const [isValid, setIsValid] = useState(null);

  const handleChange = (row, col, value) => {
    if (value !== "" && !/^[1-9]$/.test(value)) {
      return;
    }

    const updatedBoard = board.map((r) => [...r]);
    updatedBoard[row][col] = value;

    setBoard(updatedBoard);
    setMessage("");
    setIsValid(null);
  };

  const validateSudoku = () => {
    const isComplete = board.every((row) =>
      row.every((cell) => cell !== "")
    );

    if (!isComplete) {
      setIsValid(false);
      setMessage("Please fill all cells before validating.");
      return;
    }

    // Validate rows
    for (let row = 0; row < 9; row++) {
      const values = board[row];

      if (new Set(values).size !== 9) {
        setIsValid(false);
        setMessage("Invalid Sudoku! Duplicate numbers found in a row.");
        return;
      }
    }

    // Validate columns
    for (let col = 0; col < 9; col++) {
      const values = [];

      for (let row = 0; row < 9; row++) {
        values.push(board[row][col]);
      }

      if (new Set(values).size !== 9) {
        setIsValid(false);
        setMessage("Invalid Sudoku! Duplicate numbers found in a column.");
        return;
      }
    }

    // Validate 3x3 boxes
    for (let boxRow = 0; boxRow < 9; boxRow += 3) {
      for (let boxCol = 0; boxCol < 9; boxCol += 3) {
        const values = [];

        for (let row = boxRow; row < boxRow + 3; row++) {
          for (let col = boxCol; col < boxCol + 3; col++) {
            values.push(board[row][col]);
          }
        }

        if (new Set(values).size !== 9) {
          setIsValid(false);
          setMessage(
            "Invalid Sudoku! Duplicate numbers found in a 3x3 box."
          );
          return;
        }
      }
    }

    setIsValid(true);
    setMessage("Congratulations! The Sudoku grid is valid.");
  };

  const resetBoard = () => {
    setBoard(initialBoard.map((row) => [...row]));
    setMessage("");
    setIsValid(null);
  };

  return (
    <main className="app-container">
      <div className="sudoku-card">
        <h1>Sudoku Validator</h1>

        <p className="subtitle">
          Enter numbers from 1 to 9 and validate your Sudoku grid.
        </p>

        <div className="board">
          {board.map((row, rowIndex) =>
            row.map((cell, colIndex) => (
              <input
                key={`${rowIndex}-${colIndex}`}
                type="text"
                inputMode="numeric"
                maxLength="1"
                className="cell"
                value={cell}
                aria-label={`Row ${rowIndex + 1} Column ${colIndex + 1}`}
                onChange={(e) =>
                  handleChange(rowIndex, colIndex, e.target.value)
                }
              />
            ))
          )}
        </div>

        {message && (
          <p
            className={`result-message ${
              isValid ? "success" : "error"
            }`}
            role="status"
          >
            {message}
          </p>
        )}

        <div className="button-container">
          <button
            type="button"
            className="validate-button"
            onClick={validateSudoku}
          >
            Validate Sudoku
          </button>

          <button
            type="button"
            className="reset-button"
            onClick={resetBoard}
          >
            Reset
          </button>
        </div>
      </div>
    </main>
  );
}

export default App;
