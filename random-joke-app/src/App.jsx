
import React, { useState } from "react";
import "./App.css";

function App() {
  const [digits, setDigits] = useState([
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
  ]);
  const [draggedIndex, setDraggedIndex] = useState(null);

  const handleDragStart = (event, index) => {
    setDraggedIndex(index);
    event.dataTransfer.setData("text/plain", String(index));
    event.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event, targetIndex) => {
    event.preventDefault();

    const sourceIndex =
      draggedIndex !== null
        ? draggedIndex
        : Number(event.dataTransfer.getData("text/plain"));

    if (
      sourceIndex === targetIndex ||
      sourceIndex < 0 ||
      sourceIndex >= digits.length
    ) {
      setDraggedIndex(null);
      return;
    }

    const updatedDigits = [...digits];
    const [movedDigit] = updatedDigits.splice(sourceIndex, 1);

    const insertIndex =
      sourceIndex < targetIndex ? targetIndex - 1 : targetIndex;

    updatedDigits.splice(insertIndex, 0, movedDigit);

    setDigits(updatedDigits);
    setDraggedIndex(null);
  };

  return (
    <div className="app-container">
      <h1>Drag &amp; Drop Digits</h1>

<p>Drag the boxes to reorder the digits 0–9.</p>
<p>Tip: Try reordering to make 0123456789 or reverse it!</p>

      <div className="number-container">
        {digits.map((digit, index) => (
          <div
            key={digit}
            className="number-item"
            draggable
            onDragStart={(event) => handleDragStart(event, index)}
            onDragOver={handleDragOver}
            onDrop={(event) => handleDrop(event, index)}
          >
            {digit}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
