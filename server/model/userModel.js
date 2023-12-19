const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  name: { type: String, required: [true, "Name is required"] },
  age: { type: Number, required: [true, "Age is required"] },
  selectedBatch: { type: String, required: [true, "Please select the batch"] },
  paymentStatus: { type: String, default: "Pending" },
  enrollmentDate: { type: Date, default: Date.now() },
});
const User = mongoose.model("User", userSchema);
module.exports = User;
