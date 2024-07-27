const NoteService = require("../services/note.services");
const { handleResponse } = require("../utils/response");
const asyncHandler = require("../utils/asyncHandler");

const createNote = asyncHandler(async (req, res) => {
	const { user } = req.user;
	const note = await NoteService.createNote(req.validateBody, user._id);

	return handleResponse(res, 201, "Note added successfully", note);
});

module.exports = {
	createNote,
};
