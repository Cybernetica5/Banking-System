import React, { useState } from "react";

const AddEmployeeForm = () => {
  const [formData, setFormData] = useState({
    user_name: "",
    password: "",
    email: "",
    full_name: "",
    date_of_birth: "",
    NIC: "",
    branch_id: "",
  });

  const [message, setMessage] = useState("");

  // Handle form input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/add-employee", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        setMessage("Employee added successfully!");
      } else {
        setMessage("Failed to add employee.");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("An error occurred while adding the employee.");
    }
  };

  return (
    <div>
      <h2>Add New Employee</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            name="user_name"
            value={formData.user_name}
            onChange={handleChange}
            required
          />
        </label>
        <br />

        <label>
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </label>
        <br />

        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>
        <br />

        <label>
          Full Name:
          <input
            type="text"
            name="full_name"
            value={formData.full_name}
            onChange={handleChange}
            required
          />
        </label>
        <br />

        <label>
          Date of Birth:
          <input
            type="date"
            name="date_of_birth"
            value={formData.date_of_birth}
            onChange={handleChange}
            required
          />
        </label>
        <br />

        <label>
          NIC:
          <input
            type="text"
            name="NIC"
            value={formData.NIC}
            onChange={handleChange}
            required
          />
        </label>
        <br />

        <label>
          Branch ID:
          <input
            type="number"
            name="branch_id"
            value={formData.branch_id}
            onChange={handleChange}
            required
          />
        </label>
        <br />

        <button type="submit">Add Employee</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
};

export default AddEmployeeForm;
