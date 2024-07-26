const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
	title: { type: String, required: true },
	content: { type: String, require: true },
	tags: { type: [String], default: [] },
	isPinned: { type: Boolean, default: false },
	userId: { type: String, required: true },
	createdOn: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Note", noteSchema);
