
import React, { useState } from "react";
import "./App.css";

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

function App() {
  const [board, setBoard] = useState(Array(9).fill(""));
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [winner, setWinner] = useState("");
  const [isDraw, setIsDraw] = useState(false);

  const [scores, setScores] = useState({
    X: 0,
    O: 0,
    draws: 0,
  });

  const handleCellClick = (index) => {
    if (board[index] !== "" || winner || isDraw) {
      return;
    }

    const updatedBoard = [...board];
    updatedBoard[index] = currentPlayer;

    setBoard(updatedBoard);

    const hasWinner = winningCombinations.some((combination) =>
      combination.every(
        (position) => updatedBoard[position] === currentPlayer
      )
    );

    if (hasWinner) {
      setWinner(currentPlayer);

      setScores((previousScores) => ({
        ...previousScores,
        [currentPlayer]: previousScores[currentPlayer] + 1,
      }));

      return;
    }

    if (updatedBoard.every((cell) => cell !== "")) {
      setIsDraw(true);

      setScores((previousScores) => ({
        ...previousScores,
        draws: previousScores.draws + 1,
      }));

      return;
    }

    setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
  };

  const restartRound = () => {
    setBoard(Array(9).fill(""));
    setCurrentPlayer("X");
    setWinner("");
    setIsDraw(false);
  };

  const resetAll = () => {
    setBoard(Array(9).fill(""));
    setCurrentPlayer("X");
    setWinner("");
    setIsDraw(false);

    setScores({
      X: 0,
      O: 0,
      draws: 0,
    });
  };

  return (
    <main className="game-container">
      <div className="game-card">
        <h1>Tic-Tac-Toe</h1>

        <p className="subtitle">Play with your friend!</p>

        <div className="scoreboard">
          <div className="score-box player-x-score">
            <h3>X: {scores.X}</h3>
          </div>

          <div className="score-box draw-score">
            <h3>Draws: {scores.draws}</h3>
          </div>

          <div className="score-box player-o-score">
            <h3>O: {scores.O}</h3>
          </div>
        </div>

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
              className={`game-cell ${
                cell ? `player-${cell.toLowerCase()}` : ""
              }`}
              onClick={() => handleCellClick(index)}
              disabled={cell !== "" || Boolean(winner) || isDraw}
              aria-label={`Cell ${index + 1}`}
            >
              {cell}
            </button>
          ))}
        </div>

        {winner && (
          <p className="result-message">
            Congratulations! Player {winner} wins!
          </p>
        )}

        {isDraw && (
          <p className="result-message">
            The game is a draw!
          </p>
        )}

        <div className="game-actions">
          <button
            type="button"
            className="restart-button"
            onClick={restartRound}
          >
            Restart Round
          </button>

          <button
            type="button"
            className="reset-button"
            onClick={resetAll}
          >
            Reset All
          </button>
        </div>
      </div>
    </main>
  );
}

export default App;
