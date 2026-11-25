
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
    for (let col = 0; col < 10; col++) {
      const number =
        row % 2 === 0
          ? row * 10 + col + 1
          : row * 10 + (10 - col);

      cells.push(number);
    }
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

    const currentPosition = positions[currentPlayer];
    const nextPosition = currentPosition + diceValue;

    if (nextPosition > 100) {
      setMessage(
        `Player ${currentPlayer + 1} needs an exact roll to reach 100.`
      );
      setCurrentPlayer((prev) => (prev + 1) % 2);
      return;
    }

    let finalPosition = nextPosition;
    let resultMessage = `Player ${currentPlayer + 1} moved to ${nextPosition}.`;

    if (ladders[nextPosition]) {
      finalPosition = ladders[nextPosition];
      resultMessage = `Player ${currentPlayer + 1} climbed a ladder to ${finalPosition}!`;
    } else if (snakes[nextPosition]) {
      finalPosition = snakes[nextPosition];
      resultMessage = `Player ${currentPlayer + 1} slid down a snake to ${finalPosition}!`;
    }

    const updatedPositions = [...positions];
    updatedPositions[currentPlayer] = finalPosition;
    setPositions(updatedPositions);

    if (finalPosition === 100) {
      setWinner(currentPlayer);
      setMessage(`Player ${currentPlayer + 1} Wins!`);
      return;
    }

    setMessage(resultMessage);
    setCurrentPlayer((prev) => (prev + 1) % 2);
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
    if (number === 1) className += " start-cell";
    if (number === 100) className += " finish-cell";

    return className;
  };

  return (
    <main className="game-container">
      <header className="game-header">
        <h1>Snake &amp; Ladders</h1>

        <p>
          Exact 100 is required to win. Land on a ladder to climb up, a snake
          to slide down.
        </p>
      </header>

      <section className="game-layout">
        <div className="board" aria-label="Snakes and Ladders game board">
          {boardNumbers.map((number) => (
            <div
              key={number}
              className={getCellClass(number)}
              data-cell={number}
            >
              <span className="cell-number">{number}</span>

              {ladders[number] && (
                <span className="cell-symbol">🪜</span>
              )}

              {snakes[number] && (
                <span className="cell-symbol">🐍</span>
              )}

              {number === 1 && (
                <span className="cell-symbol">🏁</span>
              )}

              {number === 100 && (
                <span className="cell-symbol">🏆</span>
              )}

              <div className="player-tokens">
                {positions[0] === number && (
                  <span className="player-token player-one" title="Player 1">
                    1
                  </span>
                )}

                {positions[1] === number && (
                  <span className="player-token player-two" title="Player 2">
                    2
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        <aside className="game-panel">
          <h2>Game Status</h2>

          <div className="status-message">
            {message}
          </div>

          <div className="turn-indicator">
            <strong>Turn: </strong>
            {winner !== null
              ? `Player ${winner + 1} Wins!`
              : `Player ${currentPlayer + 1}`}
          </div>

     <div className="players">
  <div className="player-card player-one-card">
    <span className="player-indicator player-one-indicator">P1</span>
    <div>
      <h3>Player 1</h3>
      <p>Position: {positions[0]}</p>
    </div>
  </div>

  <div className="player-card player-two-card">
    <span className="player-indicator player-two-indicator">P2</span>
    <div>
      <h3>Player 2</h3>
      <p>Position: {positions[1]}</p>
    </div>
  </div>
</div>

          <div className="dice-section">
            <h3>Dice</h3>

            <div className="dice">
              {dice === null ? "🎲" : dice}
            </div>

            <button
              className="roll-button"
              onClick={rollDice}
              disabled={winner !== null}
            >
              Roll Dice
            </button>

            <button
              className="reset-button"
              onClick={resetGame}
            >
              Reset
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
