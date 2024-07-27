const User = require("../models/userModel");
const createError = require("http-errors");

const getUserById = async (userId) => {
	const user = await User.findById(userId);
	if (!user) {
		throw createError(404, "User not found");
	}
	return user;
};

module.exports = {
	getUserById,
};
