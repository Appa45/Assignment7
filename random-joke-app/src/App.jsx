
import React, { useState } from "react";
import "./App.css";

function App() {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    grade: "",
  });

  const [students, setStudents] = useState([]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const { name, age, grade } = formData;

    if (!name.trim() || !age || !grade) {
      return;
    }

    const newStudent = {
      id: Date.now(),
      name: name.trim(),
      age: age,
      grade: grade,
    };

    setStudents((previousStudents) => [
      ...previousStudents,
      newStudent,
    ]);

    setFormData({
      name: "",
      age: "",
      grade: "",
    });
  };

  const handleRemove = (id) => {
    setStudents((previousStudents) =>
      previousStudents.filter((student) => student.id !== id)
    );
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Student Entry Form</h1>
        <p>Add students and review the list below.</p>
      </header>

      <main className="main-content">
        <section className="form-card">
          <h2>Add Student</h2>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="e.g. MS Dhoni"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="age">Age</label>
              <input
                type="number"
                id="age"
                name="age"
                placeholder="e.g. 14"
                min="1"
                value={formData.age}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="grade">Grade</label>
              <select
                id="grade"
                name="grade"
                value={formData.grade}
                onChange={handleChange}
                required
              >
                <option value="">Select grade</option>

                {Array.from({ length: 12 }, (_, index) => {
                  const className = `Class ${index + 1}`;

                  return (
                    <option key={className} value={className}>
                      {className}
                    </option>
                  );
                })}
              </select>
            </div>

            <button type="submit" className="add-button">
              Add Student
            </button>
          </form>
        </section>

        <section className="students-section">
          <h2>Student List</h2>

          {students.length === 0 ? (
            <p className="empty-message">
              No students added yet.
            </p>
          ) : (
            <div className="student-list">
              {students.map((student) => (
                <div className="student-card" key={student.id}>
                  <div className="student-info">
                    <h3>{student.name}</h3>
                    <p>Age: {student.age}</p>
                    <p>Grade: {student.grade}</p>
                  </div>

                  <button
                    type="button"
                    className="remove-button"
                    onClick={() => handleRemove(student.id)}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
