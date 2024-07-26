const Note = require("../models/note.model");

exports.createNote = async (req, res, next) => {
	try {
		const { title, content, tags } = req.body;
		const { user } = req.user;

		const note = new Note({
			title,
			content,
			tags: tags || [],
			userId: user._id,
		});

		await note.save();

		return res.json({
			error: false,
			note,
			message: "Note added successfully",
		});
	} catch (error) {
		next(error);
	}
};
