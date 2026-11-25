
import React, { useState } from "react";
import "./App.css";

function App() {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    college: "",
    email: "",
    password: "",
    address: "",
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    }

    if (!formData.college.trim()) {
      newErrors.college = "College is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    }

    setErrors(newErrors);
    setSubmitted(Object.keys(newErrors).length === 0);
  };

  const fields = [
    { name: "name", label: "Name", type: "text" },
    { name: "username", label: "Username", type: "text" },
    { name: "college", label: "College", type: "text" },
    { name: "email", label: "Email", type: "text" },
    { name: "password", label: "Password", type: "password" },
    { name: "address", label: "Address", type: "text" },
  ];

  return (
    <div className="app-container">
      <div className="form-card">
        <h1>Student Registration Form</h1>

        <form onSubmit={handleSubmit} noValidate>
          {fields.map((field) => (
            <div className="form-group" key={field.name}>
              <label htmlFor={field.name}>{field.label}</label>

              <input
                id={field.name}
                type={field.type}
                name={field.name}
                placeholder={`Enter your ${field.label.toLowerCase()}`}
                value={formData[field.name]}
                onChange={handleChange}
              />

              {errors[field.name] && (
                <p className="error-message">
                  {errors[field.name]}
                </p>
              )}
            </div>
          ))}

          <button type="submit">Register</button>

          {submitted && (
            <p className="success-message">
              Registration successful!
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

export default App;
