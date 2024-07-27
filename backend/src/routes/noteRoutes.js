const express = require("express");
const router = express.Router();
const noteController = require("../controllers/noteController");
const validate = require("../middleware/validation");
const { authenticateToken } = require("../utils/utilities");
const asyncHandler = require("../utils/asyncHandler");

router.post(
	"/add-note",
	authenticateToken,
	validate("noteValidation"),
	asyncHandler(noteController.createNote)
);

router.put(
	"/edit-note/:noteId",
	authenticateToken,
	validate("noteValidation"),
	asyncHandler(noteController.editNote)
);

router.get(
	"/get-all-notes",
	authenticateToken,
	asyncHandler(noteController.getAllNotes)
);

module.exports = router;
