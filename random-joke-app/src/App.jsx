
import React, { useState } from "react";
import "./App.css";

function App() {
  const [output, setOutput] = useState("");

  const alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  const handleAlphabetClick = (letter) => {
    setOutput((prev) => prev + letter);
  };

  const handleBackspace = () => {
    setOutput((prev) => prev.slice(0, -1));
  };

  return (
    <div className="app">
      <h1>Alphabet Buttons</h1>

      <p>Click letters</p>

      <div className="output">
        {output}
      </div>

      <div className="keyboard">
        {alphabets.map((letter) => (
          <button
            key={letter}
            type="button"
            className="key"
            onClick={() => handleAlphabetClick(letter)}
          >
            {letter}
          </button>
        ))}
      </div>

      <button
        type="button"
        className="backspace"
        onClick={handleBackspace}
      >
        Backspace
      </button>
    </div>
  );
}

export default App;
