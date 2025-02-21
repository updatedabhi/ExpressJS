const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A student must have name"],
    unique: true,
  },
  age: {
    type: Number,
    required: [true, "A student must have age"],
  },
  studentImage: {
    type: String,
    required: [true, "A student must have image"],
  },
  cgpa: {
    type: Number,
    default: 0,
  },
  summary: {
    type: String,
    trim: true,
  },
});

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
