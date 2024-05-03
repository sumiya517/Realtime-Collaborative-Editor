const mongoose = require("mongoose");

const workspaceSchema = new mongoose.Schema({
  title: { type: String },
  theme: {
    type: String,
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  containers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Container",
    },
  ],
  validTill: { type: Date },
});

module.exports = mongoose.model("Workspace", workspaceSchema);
