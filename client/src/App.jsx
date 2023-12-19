import React, { useState } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    selectedBatch: "",
  });
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/enroll", formData);

      // Assuming the backend response indicates successful payment
      if (response.data.message === "Enrollment and payment successful") {
        setPaymentSuccess(true);
      } else {
        console.log(response.data); // Log the API response for other cases
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  if (paymentSuccess) {
    // Render a success page with user information
    return (
      <div>
        <h1>Payment Successful</h1>
        <p>Name: {formData.name}</p>
        <p>Age: {formData.age}</p>
        <p>Selected Batch: {formData.selectedBatch}</p>
        <p>Date: {new Date().toLocaleDateString()}</p>
        {/* Add any additional information you want to display */}
      </div>
    );
  }

  return (
    <div>
      <h1>Yoga Class Admission Form</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Age:
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Select Batch:
          <select
            name="selectedBatch"
            value={formData.selectedBatch}
            onChange={handleChange}
          >
            <option value="">Select Batch</option>
            <option value="6-7AM">6-7AM</option>
            <option value="7-8AM">7-8AM</option>
            <option value="8-9AM">8-9AM</option>
            <option value="5-6PM">5-6PM</option>
          </select>
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default App;
