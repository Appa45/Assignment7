
import React, { useState } from "react";
import "./App.css";

function App() {
  const [item, setItem] = useState("");
  const [items, setItems] = useState([]);
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const trimmedItem = item.trim();

    if (!trimmedItem) {
      setError("Please enter an item.");
      return;
    }

    setItems((previousItems) => [...previousItems, trimmedItem]);
    setItem("");
    setError("");
  };

  return (
    <main className="app-container">
      <section className="list-card">
        <div className="header">
          <h1>My To-Do List</h1>
          <p>Add your items to the list below.</p>
        </div>

        <form className="item-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="item"
            placeholder="Enter an item"
            value={item}
            onChange={(event) => {
              setItem(event.target.value);
              setError("");
            }}
            autoComplete="off"
          />

          <button type="submit">Add Item</button>
        </form>

        {error && <p className="error-message">{error}</p>}

        <div className="list-section">
          <h2>My Items</h2>

          <ul className="item-list">
            {items.map((currentItem, index) => (
              <li key={`${index}-${currentItem}`}>
                {currentItem}
              </li>
            ))}
          </ul>

          {items.length === 0 && (
            <p className="empty-message">No items added yet.</p>
          )}
        </div>
      </section>
    </main>
  );
}

export default App;
