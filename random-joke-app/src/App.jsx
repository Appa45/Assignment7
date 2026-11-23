
import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [output, setOutput] = useState("");

  const alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  const handleAlphabetClick = (letter) => {
    setOutput((prev) => prev + letter);
  };

  const handleBackspace = () => {
    setOutput((prev) => prev.slice(0, -1));
  };

  return (
    <div className="container">
      <h1>Alphabets</h1>

      <div className="output">
        {output}
      </div>

      <div className="keyboard">
        {alphabets.map((letter) => (
          <button
            key={letter}
            className="key"
            onClick={() => handleAlphabetClick(letter)}
          >
            {letter}
          </button>
        ))}

        <button
          className="key backspace"
          onClick={handleBackspace}
        >
          Backspace
        </button>
      </div>
    </div>
  );
};

export default App;
