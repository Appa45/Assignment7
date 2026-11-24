
import React, { useState } from "react";
import "./App.css";

function App() {
  const [board, setBoard] = useState(Array(9).fill(""));
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [winner, setWinner] = useState(null);
  const [isDraw, setIsDraw] = useState(false);

  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const handleClick = (index) => {
    if (board[index] || winner || isDraw) {
      return;
    }

    const updatedBoard = [...board];
    updatedBoard[index] = currentPlayer;

    setBoard(updatedBoard);

    const hasWinner = winningCombinations.some((combination) =>
      combination.every((position) => updatedBoard[position] === currentPlayer)
    );

    if (hasWinner) {
      setWinner(currentPlayer);
    } else if (updatedBoard.every((cell) => cell !== "")) {
      setIsDraw(true);
    } else {
      setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
    }
  };

  const handleRestart = () => {
    setBoard(Array(9).fill(""));
    setCurrentPlayer("X");
    setWinner(null);
    setIsDraw(false);
  };

  return (
    <main className="game-container">
      <div className="game-card">
        <h1>Tic Tac Toe</h1>

        <p className="game-subtitle">
          Play with your friend!
        </p>

        <div className="game-status">
          {winner ? (
            <h2>Player {winner} Wins!</h2>
          ) : isDraw ? (
            <h2>It's a Draw!</h2>
          ) : (
            <h2>Player {currentPlayer}'s Turn</h2>
          )}
        </div>

        <div className="game-board">
          {board.map((cell, index) => (
            <button
              key={index}
              type="button"
              className={`game-cell ${cell ? `player-${cell.toLowerCase()}` : ""}`}
              onClick={() => handleClick(index)}
              disabled={Boolean(cell) || Boolean(winner) || isDraw}
              aria-label={`Cell ${index + 1}${cell ? `: ${cell}` : ""}`}
            >
              {cell}
            </button>
          ))}
        </div>

        {(winner || isDraw) && (
          <p className="result-message">
            {winner
              ? `Congratulations! Player ${winner} is the winner!`
              : "The game ended in a draw!"}
          </p>
        )}

        <button
          type="button"
          className="restart-button"
          onClick={handleRestart}
        >
          Restart Game
        </button>
      </div>
    </main>
  );
}

export default App;
