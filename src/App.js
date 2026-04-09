import React, { useState } from "react";
import "./App.css";

function App() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");

  const validate = () => {
    let newErrors = {};

    if (!form.name) newErrors.name = "Name is required";

    if (!form.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!form.phone) newErrors.phone = "Phone is required";

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setSuccess("");
    } else {
      setErrors({});
      setSuccess("Form submitted successfully!");
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="container">
      <h2>React Form Validation</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Enter Name"
          value={form.name}
          onChange={handleChange}
          className={errors.name ? "error" : ""}
        />
        <p className="error-text">{errors.name}</p>

        <input
          type="text"
          name="email"
          placeholder="Enter Email"
          value={form.email}
          onChange={handleChange}
          className={errors.email ? "error" : ""}
        />
        <p className="error-text">{errors.email}</p>

        <input
          type="text"
          name="phone"
          placeholder="Enter Phone"
          value={form.phone}
          onChange={handleChange}
          className={errors.phone ? "error" : ""}
        />
        <p className="error-text">{errors.phone}</p>

        <button type="submit">Submit</button>
      </form>

      {success && <p className="success">{success}</p>}
    </div>
  );
}

export default App;