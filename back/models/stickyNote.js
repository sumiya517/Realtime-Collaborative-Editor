const mongoose = require("mongoose");

const stickyNoteSchema = new mongoose.Schema({
  color: { type: String, required: true },
  text: { type: String },
  coordinates: {
    x: { type: String },
    y: { type: String },
    height: { type: String },
    width: { type: String },
  },
  container: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Container'
  },
});

module.exports = mongoose.model("StickyNote", stickyNoteSchema);
