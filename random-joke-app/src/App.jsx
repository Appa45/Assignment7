
import React, { useState } from "react";
import "./App.css";

function App() {
  const [output, setOutput] = useState("");

  const alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  const handleAlphabetClick = (letter) => {
    setOutput((previousOutput) => previousOutput + letter);
  };

  const handleBackspace = () => {
    setOutput((previousOutput) => previousOutput.slice(0, -1));
  };

  return (
    <div className="app">
      <h1>Alphabet Buttons</h1>

      <p>Click on any alphabet button to add it to the output.</p>

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
