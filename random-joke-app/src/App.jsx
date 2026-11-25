
import React, { useState } from "react";
import "./App.css";

const ladders = {
  3: 22,
  5: 8,
  11: 26,
  20: 29,
  27: 56,
  36: 44,
  51: 67,
  71: 92,
  80: 99,
};

const snakes = {
  17: 4,
  19: 7,
  21: 9,
  43: 34,
  54: 34,
  62: 18,
  64: 60,
  87: 24,
  93: 73,
  95: 75,
  98: 79,
};

const createBoard = () => {
  const cells = [];

  for (let row = 9; row >= 0; row--) {
    const numbers = [];

    for (let col = 0; col < 10; col++) {
      numbers.push(
        row % 2 === 0
          ? row * 10 + col + 1
          : row * 10 + (10 - col)
      );
    }

    cells.push(...numbers);
  }

  return cells;
};

const boardNumbers = createBoard();

function App() {
  const [positions, setPositions] = useState([0, 0]);
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [dice, setDice] = useState(null);
  const [winner, setWinner] = useState(null);
  const [message, setMessage] = useState("Player 1's turn. Roll the dice!");

  const rollDice = () => {
    if (winner !== null) return;

    const diceValue = Math.floor(Math.random() * 6) + 1;
    setDice(diceValue);

    const oldPosition = positions[currentPlayer];
    const newPosition = oldPosition + diceValue;

    if (newPosition > 100) {
      setMessage(
        `Player ${currentPlayer + 1} needs an exact roll to reach 100.`
      );
      setCurrentPlayer((currentPlayer + 1) % 2);
      return;
    }

    let finalPosition = newPosition;
    let movementMessage = `Player ${currentPlayer + 1} moved to ${newPosition}.`;

    if (ladders[newPosition]) {
      finalPosition = ladders[newPosition];
      movementMessage = `Player ${currentPlayer + 1} climbed a ladder to ${finalPosition}!`;
    } else if (snakes[newPosition]) {
      finalPosition = snakes[newPosition];
      movementMessage = `Player ${currentPlayer + 1} slid down a snake to ${finalPosition}!`;
    }

    const updatedPositions = [...positions];
    updatedPositions[currentPlayer] = finalPosition;
    setPositions(updatedPositions);

    if (finalPosition === 100) {
      setWinner(currentPlayer);
      setMessage(`Player ${currentPlayer + 1} Wins!`);
      return;
    }

    setMessage(movementMessage);
    setCurrentPlayer((currentPlayer + 1) % 2);
  };

  const resetGame = () => {
    setPositions([0, 0]);
    setCurrentPlayer(0);
    setDice(null);
    setWinner(null);
    setMessage("Player 1's turn. Roll the dice!");
  };

  const getCellClass = (number) => {
    let className = "cell";

    if (ladders[number]) className += " ladder-cell";
    if (snakes[number]) className += " snake-cell";
    if (number === 100) className += " finish-cell";
    if (number === 1) className += " start-cell";

    return className;
  };

  return (
    <main className="game-container">
      <header className="game-header">
        <h1>Snakes &amp; Ladders</h1>
        <p>Roll the dice, climb ladders, and avoid snakes!</p>
      </header>

      <section className="game-layout">
        <div className="board" aria-label="Snakes and Ladders game board">
          {boardNumbers.map((number) => {
            const playerOneHere = positions[0] === number;
            const playerTwoHere = positions[1] === number;

            return (
              <div
                key={number}
                className={getCellClass(number)}
                data-cell={number}
                aria-label={`Cell ${number}`}
              >
                <span className="cell-number">{number}</span>

                {ladders[number] && (
                  <span className="cell-symbol" title={`Ladder to ${ladders[number]}`}>
                    🪜
                  </span>
                )}

                {snakes[number] && (
                  <span className="cell-symbol" title={`Snake to ${snakes[number]}`}>
                    🐍
                  </span>
                )}

                {number === 1 && (
                  <span className="cell-symbol" title="Start">🏁</span>
                )}

                {number === 100 && (
                  <span className="cell-symbol" title="Finish">🏆</span>
                )}

                <div className="player-tokens">
                  {playerOneHere && (
                    <span className="player-token player-one" title="Player 1">
                      1
                    </span>
                  )}
                  {playerTwoHere && (
                    <span className="player-token player-two" title="Player 2">
                      2
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <aside className="game-panel">
          <h2>Game Status</h2>

          <div className={`status-message ${winner !== null ? "winner-message" : ""}`}>
            {message}
          </div>

          <div className="players">
            <div className={`player-card player-one-card ${currentPlayer === 0 && winner === null ? "active-player" : ""}`}>
              <span className="player-indicator player-one-indicator">1</span>
              <div>
                <h3>Player 1</h3>
                <p>Position: {positions[0]}</p>
              </div>
              {currentPlayer === 0 && winner === null && (
                <span className="turn-label">Your turn</span>
              )}
            </div>

            <div className={`player-card player-two-card ${currentPlayer === 1 && winner === null ? "active-player" : ""}`}>
              <span className="player-indicator player-two-indicator">2</span>
              <div>
                <h3>Player 2</h3>
                <p>Position: {positions[1]}</p>
              </div>
              {currentPlayer === 1 && winner === null && (
                <span className="turn-label">Your turn</span>
              )}
            </div>
          </div>

          <div className="dice-section">
            <h3>Dice</h3>
            <div className="dice" aria-label="Dice result">
              {dice === null ? "🎲" : dice}
            </div>

            <button
              className="roll-button"
              onClick={rollDice}
              disabled={winner !== null}
            >
              Roll Dice
            </button>

            <button className="reset-button" onClick={resetGame}>
              New Game
            </button>
          </div>

          {winner !== null && (
            <div className="winner-banner">
              🏆 Player {winner + 1} Wins!
            </div>
          )}

          <div className="game-rules">
            <h3>How to Play</h3>
            <p>🎲 Roll the dice to move forward.</p>
            <p>🪜 Land on a ladder to climb up.</p>
            <p>🐍 Land on a snake to slide down.</p>
            <p>🏆 Reach exactly 100 to win!</p>
          </div>
        </aside>
      </section>
    </main>
  );
}

export default App;
