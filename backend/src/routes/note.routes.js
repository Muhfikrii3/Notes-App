const express = require("express");
const router = express.Router();
const noteController = require("../controllers/noteController");
const validate = require("../middleware/validation");
const { authenticateToken } = require("../utils/utilities");
const asyncHandler = require("../utils/asyncHandler");

router.post(
	"/add-note",
	authenticateToken,
	validate("note"),
	asyncHandler(noteController.createNote)
);

module.exports = router;
