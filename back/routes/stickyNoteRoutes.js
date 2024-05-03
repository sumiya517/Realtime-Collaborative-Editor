const express = require('express');
const router = express.Router();
const { createStickyNote, editStickyNote, deleteStickyNote, getStickynotes } = require('../controllers/stickyNotesController');


router.get('/', getStickynotes);
router.post('/', createStickyNote);
router.put('/:id', editStickyNote);
router.delete('/:id', deleteStickyNote);

module.exports = router;
