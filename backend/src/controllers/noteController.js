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

const deleteNote = asyncHandler(async (req, res) => {
	const userId = req.user._id;
	const noteId = req.params.noteId;
	await NoteService.deleteNote(noteId, userId);

	return handleResponse(res, 200, "Note deleted successfully");
});

const pinnedNote = asyncHandler(async (req, res) => {
	const userId = req.user._id;
	const noteId = req.params.noteId;
	const { isPinned } = req.body;
	const note = await NoteService.pinnedNote(noteId, userId, isPinned);

	return handleResponse(res, 200, "Note updated successfully", note);
});

module.exports = {
	createNote,
	editNote,
	getAllNotes,
	deleteNote,
	pinnedNote,
};
