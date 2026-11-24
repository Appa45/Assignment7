
import React, { useState } from "react";
import "./App.css";

function App() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [place, setPlace] = useState("");
  const [people, setPeople] = useState([]);

  const handleAdd = (e) => {
    e.preventDefault();

    if (!name.trim() || !age || !place.trim()) {
      return;
    }

    const newPerson = {
      id: Date.now(),
      name: name.trim(),
      age: age,
      place: place.trim(),
    };

    setPeople((prev) => [...prev, newPerson]);

    setName("");
    setAge("");
    setPlace("");
  };

  const handleClear = () => {
    setName("");
    setAge("");
    setPlace("");
  };

  const handleRemove = (id) => {
    setPeople((prev) => prev.filter((person) => person.id !== id));
  };

  return (
    <main className="app-container">
      <h1>Add People to Table</h1>

      <form className="input-form" onSubmit={handleAdd}>
        <input
          type="text"
          name="name"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="number"
          name="age"
          placeholder="Enter Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />

        <input
          type="text"
          name="place"
          placeholder="Enter Place"
          value={place}
          onChange={(e) => setPlace(e.target.value)}
        />

        <button type="submit">Add</button>

        <button type="button" onClick={handleClear}>
          Clear
        </button>
      </form>

      {people.length === 0 ? (
        <p className="empty-message">No entries yet</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Place</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {people.map((person) => (
              <tr key={person.id}>
                <td>{person.name}</td>
                <td>{person.age}</td>
                <td>{person.place}</td>
                <td>
                  <button
                    type="button"
                    className="remove-button"
                    onClick={() => handleRemove(person.id)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </main>
  );
}

export default App;
