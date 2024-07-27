const Note = require("../models/noteModel");
const createError = require("http-errors");

const createNote = async (userId, noteData) => {
	const note = new Note({
		userId,
		...noteData,
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

const getAllNotes = async (userId) => {
	const note = await Note.find({ userId }).sort({ isPinned: -1 });

	return note;
};

module.exports = {
	createNote,
	editNote,
	getAllNotes,
};
