const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  title: { type: String },
  duration: { type: String },
});

const CourseModal = mongoose.model("courses", courseSchema);

module.exports = CourseModal;
