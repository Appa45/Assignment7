
import React, { useState } from "react";
import "./App.css";

function App() {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    grade: "",
  });

  const [students, setStudents] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { name, age, grade } = formData;

    if (!name.trim() || !age || !grade.trim()) {
      return;
    }

    const newStudent = {
      id: Date.now(),
      name: name.trim(),
      age: Number(age),
      grade: grade.trim(),
    };

    setStudents((prev) => [...prev, newStudent]);

    setFormData({
      name: "",
      age: "",
      grade: "",
    });
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Student Entry Form</h1>
        <p>Add and manage student details</p>
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
                placeholder="Enter student name"
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
                placeholder="Enter student age"
                value={formData.age}
                onChange={handleChange}
                min="1"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="grade">Grade</label>
              <input
                type="text"
                id="grade"
                name="grade"
                placeholder="Enter student grade"
                value={formData.grade}
                onChange={handleChange}
                required
              />
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
