const StickyNote = require("../models/stickyNote");
const Container = require("../models/container");

const getStickynotes = async (req, res, next) => {
  try {
    const newStickyNote = await StickyNote.find();
    res.status(200).json(newStickyNote);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

const createStickyNote = async (req, res, next) => {
  try {
    const { color, coordinates, containerId } = req.body;
    const container = await Container.findById(containerId);
    if (!container) {
      return res.status(404).json({ message: "Container not found" });
    }

    const newStickyNote = new StickyNote({
      text: "",
      color,
      coordinates,
      container: containerId
    });

    container.stickyNotes.push(newStickyNote._id);

    await newStickyNote.save();
    await container.save();

    res.status(201).json(newStickyNote);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

const editStickyNote = async (req, res, next) => {
  const { color, text, coordinates } = req.body;
  const { id } = req.params;

  try {
    let stickynote = await StickyNote.findById(id);

    if (!stickynote) {
      return res.status(404).json({ msg: "Stickynote not found" });
    }

    if (color) {
      stickynote.color = color;
    }
    if (text) {
      console.log(text);
      stickynote.text = text;
    }
    if (coordinates) {
      stickynote.coordinates = coordinates;
    }

    await stickynote.save();

    res.json(stickynote);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

const deleteStickyNote = async (req, res, next) => {
  const { id } = req.params;
  try {
    const stickyNote = await StickyNote.findById(id);
    console.log(stickyNote);

    if (!stickyNote) {
      return res.status(404).json({ message: 'Sticky note not found' });
    }

    const container = await Container.findById(stickyNote.container);
    console.log(container);
    if (!container) {
      return res.status(404).json({ message: 'Associated container not found' });
    }

    container.stickyNotes.pull(id);

    await container.save();
    await StickyNote.findByIdAndDelete(id);

    res.status(200).json({ message: 'Sticky note deleted successfully' });
  } catch (error) {
    console.error('Error deleting sticky note:', error);
    res.status(500).json({ error: 'An error occurred while deleting sticky note' });
  }res.status(500).json({ message: err.message });
};

exports.createStickyNote = createStickyNote;
exports.editStickyNote = editStickyNote;
exports.deleteStickyNote = deleteStickyNote;
exports.getStickynotes = getStickynotes;
