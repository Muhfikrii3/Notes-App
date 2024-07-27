const Note = require("../models/noteModel");
const createError = require("http-errors");

const createNote = async (noteData, userId) => {
	const note = new Note({
		...noteData,
		userId,
	});

	return await note.save();
};

const editNote = async (noteId, userId, updateData) => {
	const note = await Note.findOne({ _id: noteId, userId });
	if (!note) {
		throw createError(404, "Note not found");
	}

	Object.keys(updateData).forEach((key) => {
		note[key] = updateData[key];
	});

	return await note.save();
};

module.exports = {
	createNote,
	editNote,
};
