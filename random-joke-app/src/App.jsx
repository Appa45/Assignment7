
import React, { useState } from "react";
import "./App.css";

const initialItems = [1, 2, 3, 4, 5, 6, 7, 8, 9];

function App() {
  const [items, setItems] = useState(initialItems);
  const [draggedItem, setDraggedItem] = useState(null);
  const [dragOverItem, setDragOverItem] = useState(null);

  const handleDragStart = (event, index) => {
    setDraggedItem(index);
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("text/plain", String(index));
  };

  const handleDragOver = (event, index) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
    setDragOverItem(index);
  };

  const handleDrop = (event, targetIndex) => {
    event.preventDefault();

    const sourceIndex = draggedItem;

    if (
      sourceIndex === null ||
      sourceIndex === targetIndex
    ) {
      setDraggedItem(null);
      setDragOverItem(null);
      return;
    }

    const updatedItems = [...items];
    const [selectedItem] = updatedItems.splice(sourceIndex, 1);
    updatedItems.splice(targetIndex, 0, selectedItem);

    setItems(updatedItems);
    setDraggedItem(null);
    setDragOverItem(null);
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
    setDragOverItem(null);
  };

  const resetItems = () => {
    setItems(initialItems);
    setDraggedItem(null);
    setDragOverItem(null);
  };

  return (
    <main className="app-container">
      <section className="drag-card">
        <h1>Drag &amp; Drop</h1>

        <p className="description">
          Drag and drop the numbers to rearrange their positions.
        </p>

        <div className="number-container">
          {items.map((item, index) => (
            <div
              key={item}
              className={`number-item ${
                draggedItem === index ? "dragging" : ""
              } ${
                dragOverItem === index ? "drag-over" : ""
              }`}
              draggable="true"
              onDragStart={(event) => handleDragStart(event, index)}
              onDragOver={(event) => handleDragOver(event, index)}
              onDrop={(event) => handleDrop(event, index)}
              onDragEnd={handleDragEnd}
              role="button"
              tabIndex={0}
              aria-label={`Number ${item}`}
            >
              {item}
            </div>
          ))}
        </div>

        <button className="reset-button" onClick={resetItems}>
          Reset
        </button>
      </section>
    </main>
  );
}

export default App;
