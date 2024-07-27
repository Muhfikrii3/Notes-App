const NoteService = require("../services/noteServices");
const { handleResponse } = require("../utils/response");
const asyncHandler = require("../utils/asyncHandler");

const createNote = asyncHandler(async (req, res) => {
	const userId = req.user._id;
	const note = await NoteService.createNote(userId, req.validatedBody);

	return handleResponse(res, 201, "Note added successfully", note);
});

const editNote = asyncHandler(async (req, res) => {
	const userId = req.user._id;
	const noteId = req.params.noteId;
	const note = await NoteService.editNote(noteId, userId, req.validatedBody);

	return handleResponse(res, 200, "Note updated successfully", note);
});

const getAllNotes = asyncHandler(async (req, res) => {
	const userId = req.user._id;
	const note = await NoteService.getAllNotes(userId);

	return handleResponse(res, 200, "All notes retrieved successfuly", note);
});

module.exports = {
	createNote,
	editNote,
	getAllNotes,
};
