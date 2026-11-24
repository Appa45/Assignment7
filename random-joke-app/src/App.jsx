
import React, { useState } from "react";
import "./App.css";

function App() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [place, setPlace] = useState("");
  const [users, setUsers] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim() || !age || !place.trim()) {
      return;
    }

    const newUser = {
      id: Date.now(),
      name: name.trim(),
      age: age,
      place: place.trim(),
    };

    setUsers((prevUsers) => [...prevUsers, newUser]);

    setName("");
    setAge("");
    setPlace("");
  };

  return (
    <div className="app-container">
      <h1>Table Data</h1>

      <form className="input-form" onSubmit={handleSubmit}>
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
      </form>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Place</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.age}</td>
              <td>{user.place}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
