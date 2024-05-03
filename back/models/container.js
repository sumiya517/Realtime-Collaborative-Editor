const mongoose = require("mongoose");

const containerSchema = new mongoose.Schema({
  owner: { type: String},
  stickyNotes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'StickyNote' }],
  workspace: { type: mongoose.Schema.Types.ObjectId, ref: 'Workspace' }
});

module.exports = mongoose.model("Container", containerSchema);
