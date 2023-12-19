// server.js

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const { config } = require("dotenv");
const connectDB = require("./config/dbConfig");
const User = require("./model/userModel");

const app = express();
const PORT = process.env.PORT || 3000;

config({
  path: "./config/config.env",
});

app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB (replace 'your-mongodb-uri' with your actual MongoDB URI)
connectDB();

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

// Define a schema for the user data

app.post("/enroll", async (req, res) => {
  const { name, age, selectedBatch } = req.body;

  // Basic validation
  if (!name || !age || !selectedBatch) {
    return res.status(400).json({ error: "All fields are required" });
  }

  // Age validation
  const ageNumber = parseInt(age, 10);
  if (ageNumber < 18 || ageNumber > 65) {
    return res.status(400).json({ error: "Age must be between 18 and 65" });
  }

  try {
    // Save user data to MongoDB
    const newUser = await User.create({ name, age, selectedBatch });

    // Simulate payment processing
    const paymentResponse = simulatePayment(name, age, selectedBatch);

    if (paymentResponse === "success") {
      // Payment successful
      return res.status(200).json({
        success: true,
        message: "Enrollment and payment successful",
        newUser,
      });
    } else {
      // Payment failed
      return res
        .status(400)
        .json({ error: "Payment failed. Enrollment successful." });
    }
  } catch (error) {
    console.error("Error saving user data:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

// Simulated payment function (replace with actual payment logic in a real scenario)
function simulatePayment(name, age, selectedBatch) {
  // For demonstration purposes, let's assume payment is successful for users aged 18-50
  if (age >= 18 && age <= 50) {
    console.log(`Payment successful for ${name}`);
    return "success";
  } else {
    console.log(`Payment failed for ${name}`);
    return "failure";
  }
}

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
