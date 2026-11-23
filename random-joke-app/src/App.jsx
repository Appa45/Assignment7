
import React, { useState } from "react";
import "./App.css";

function App() {
  const [item, setItem] = useState("");
  const [items, setItems] = useState([]);

  const handleAddItem = (event) => {
    event.preventDefault();

    const trimmedItem = item.trim();

    if (trimmedItem === "") {
      return;
    }

    setItems((previousItems) => [
      ...previousItems,
      {
        id: Date.now() + Math.random(),
        name: trimmedItem,
      },
    ]);

    setItem("");
  };

  const handleRemoveItem = (id) => {
    setItems((previousItems) =>
      previousItems.filter((currentItem) => currentItem.id !== id)
    );
  };

  return (
    <main className="app-container">
      <section className="list-card">
        <h1>Add Items to List</h1>

        <p className="subtitle">
          Enter an item below and add it to your list.
        </p>

        <form className="item-form" onSubmit={handleAddItem}>
          <input
            type="text"
            name="item"
            placeholder="Enter an item"
            value={item}
            onChange={(event) => setItem(event.target.value)}
            autoComplete="off"
          />

          <button type="submit">Add</button>
        </form>

        <ul className="item-list">
          {items.map((currentItem) => (
            <li key={currentItem.id}>
              <span>{currentItem.name}</span>

              <button
                type="button"
                className="remove-button"
                onClick={() => handleRemoveItem(currentItem.id)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}

export default App;
