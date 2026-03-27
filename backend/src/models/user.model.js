const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
  educationLevel: String,
  interestField: String,
  skills: String,
  passion: String,
  timeline: String,

  // ✅ NEW FIELDS
  roadmap: [
    {
      title: String,
      duration: String,
      substeps: [String],
    },
  ],
  motivation: String,
});

module.exports = mongoose.model("User", userSchema);