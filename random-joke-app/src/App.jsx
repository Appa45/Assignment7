
import React, { useState } from "react";
import "./App.css";

function App() {
  const [number, setNumber] = useState("");
  const [result, setResult] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const value = number.trim();

    if (value === "" || !Number.isFinite(Number(value))) {
      setResult("Not a valid number!");
      return;
    }

    const parsedNumber = Number(value);

    if (parsedNumber % 2 === 0) {
      setResult(`The number ${value} is even!`);
    } else {
      setResult(`Oops, ${value} is odd!`);
    }
  };

  return (
    <main className="app-container">
      <section className="parity-card">
        <h1>Even/Odd Checker</h1>

        <p className="subtitle">
          Enter a number to check whether it is even or odd.
        </p>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="number"
            value={number}
            onChange={(event) => setNumber(event.target.value)}
            placeholder="Enter a number"
            autoComplete="off"
          />

          <button type="submit">Check</button>
        </form>

        {result && (
          <div className="result" role="status">
            {result}
          </div>
        )}
      </section>
    </main>
  );
}

export default App;
