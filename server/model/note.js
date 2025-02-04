const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  content: { type: String, required: false }, // Text content
  audioUrl: { type: String, required: false }, // URL of the audio file (if any)
  imageUrl: { type: String, required: false }, 
  type: { type: String, required: true },
  time: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Note", noteSchema);

