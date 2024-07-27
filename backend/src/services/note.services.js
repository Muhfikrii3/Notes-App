const Note = require("../models/note.model");
const createError = require("http-errors");

const createNote = async (noteData, userId) => {
	const note = new Note({
		...noteData,
		userId,
	});

	return await note.save();
};

module.exports = {
	createNote,
};
