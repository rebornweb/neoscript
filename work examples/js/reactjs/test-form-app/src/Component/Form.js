import React, { useState } from "react";
import axios from "axios"; // Import Axios

const Form = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Make Axios POST request to a REST API
    axios
      .post("https://api.example.com/submit-form", formData) // Replace with your API endpoint
      .then(response => {
        // Handle successful response
        console.log("Form submission success:", response.data);
      })
      .catch(error => {
        // Handle error
        console.error("Form submission error:", error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
      />
      <input
        type="text"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
      />
      <textarea
        name="message"
        placeholder="Message"
        value={formData.message}
        onChange={handleChange}
      ></textarea>
      <button type="submit">Submit</button>
    </form>
  );
};

export default Form;
