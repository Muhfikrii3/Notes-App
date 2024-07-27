const NoteService = require("../services/noteServices");
const { handleResponse } = require("../utils/response");
const asyncHandler = require("../utils/asyncHandler");

const createNote = asyncHandler(async (req, res) => {
	const userId = req.user._id;
	const note = await NoteService.createNote(req.validatedBody, userId);

	return handleResponse(res, 201, "Note added successfully", note);
});

const editNote = asyncHandler(async (req, res) => {
	const userId = req.user._id;
	const noteId = req.params.noteId;
	const note = await NoteService.editNote(noteId, userId, req.validatedBody);

	return handleResponse(res, 200, "Note updated successfully", note);
});

module.exports = {
	createNote,
	editNote,
};
