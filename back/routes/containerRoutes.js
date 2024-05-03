const express = require('express');
const router = express.Router();
const { getContainers, editContainer, createContainer, deleteContainer } = require('../controllers/containerController');

router.get('/', getContainers);
router.post('/', createContainer);
router.put('/:id', editContainer);
router.delete('/:id', deleteContainer);

module.exports = router;
