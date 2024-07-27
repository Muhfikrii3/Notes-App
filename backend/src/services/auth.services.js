const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const config = require("../config/config");
const createError = require("http-errors");

const registration = async (userData) => {
	const { fullName, email, password } = userData;
	const existingUser = await User.findOne({ email });

	if (existingUser) {
		throw createError(400, "User already exist");
	}

	const user = new User({ fullName, email, password });
	await user.save();

	const accessToken = jwt.sign(
		{ userId: user._id },
		config.accessTokenSecret,
		{ expiresIn: "3600m" }
	);

	return { user, accessToken };
};

const login = async (loginData) => {
	const { email, password } = loginData;
	const user = await User.findOne({ email });

	if (!user) {
		throw createError(400, "User not found");
	}

	const isMatch = await user.comparePassword(password);
	if (!isMatch) {
		throw createError(400, "Invalid credentials");
	}

	const accessToken = jwt.sign(
		{ userId: user._id },
		config.accessTokenSecret,
		{ expiresIn: "3600m" }
	);

	return { email, accessToken };
};

module.exports = {
	registration,
	login,
};
