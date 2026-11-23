
import React, { useState } from "react";
import "./App.css";

function App() {
  const [number, setNumber] = useState("");
  const [result, setResult] = useState(null);

  const handleChange = (event) => {
    setNumber(event.target.value);
    setResult(null);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const trimmedValue = number.trim();

    if (trimmedValue === "") {
      setResult({
        type: "error",
        message: "Please enter a number.",
      });
      return;
    }

    const parsedNumber = Number(trimmedValue);

    if (!Number.isFinite(parsedNumber)) {
      setResult({
        type: "error",
        message: "Please enter a valid number.",
      });
      return;
    }

    if (parsedNumber % 2 === 0) {
      setResult({
        type: "even",
        message: `${trimmedValue} is an Even Number`,
      });
    } else {
      setResult({
        type: "odd",
        message: `${trimmedValue} is an Odd Number`,
      });
    }
  };

  return (
    <main className="app-container">
      <section className="parity-card">
        <h1>Check Parity</h1>

        <p className="subtitle">
          Enter a number to check whether it is even or odd.
        </p>

        <form onSubmit={handleSubmit}>
          <label htmlFor="number">Enter a number</label>

          <input
            id="number"
            name="number"
            type="text"
            value={number}
            onChange={handleChange}
            placeholder="Enter a number"
            autoComplete="off"
          />

          <button type="submit">Check</button>
        </form>

        {result && (
          <div
            className={`result ${result.type}`}
            role="status"
            aria-live="polite"
          >
            {result.message}
          </div>
        )}
      </section>
    </main>
  );
}

export default App;
