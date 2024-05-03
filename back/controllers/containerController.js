const Container = require("../models/container");
const Workspace = require("../models/workSpace");

const getContainers = async (req, res, next) => {
  try {
    const newContainer = await Container.find();
    res.status(200).json(newContainer);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

const createContainer = async (req, res, next) => {
  try {
    const { owner, workspaceId } = req.body;

    const workspace = await Workspace.findById(workspaceId);
    if (!workspace) {
      return res.status(404).json({ message: 'Workspace not found' });
    }

    const container = new Container({ owner, workspace: workspaceId });

    workspace.containers.push(container._id);

    await container.save();
    await workspace.save();

    res.status(201).json(container);
  } catch (error) {
    console.error('Error creating container:', error);
    res.status(500).json({ error: 'An error occurred while creating container' });
  }
};

const editContainer = async (req, res, next) => {
  const { owner } = req.body;
  const { id } = req.params;

  try {
    let container = await Container.findById(id);

    if (!container) {
      return res.status(404).json({ msg: "Container not found" });
    }

    container.owner = owner;

    await container.save();

    res.json(container);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

const deleteContainer = async (req, res, next) => {
  const { id } = req.params;
  try {
    const container = await Container.findById(id);
    if (!container) {
      return res.status(404).json({ message: 'Container not found' });
    }

    const workspace = await Workspace.findById(container.workspace);
    if (!workspace) {
      return res.status(404).json({ message: 'Associated workspace not found' });
    }

    workspace.containers.pull(id);

    await workspace.save();
    await Container.findByIdAndDelete(id);

    res.status(200).json({ message: 'Container deleted successfully' });
  } catch (error) {
    console.error('Error deleting container:', error);
    res.status(500).json({ error: 'An error occurred while deleting container' });
  }
};

exports.getContainers = getContainers;
exports.createContainer = createContainer;
exports.editContainer = editContainer;
exports.deleteContainer = deleteContainer;
