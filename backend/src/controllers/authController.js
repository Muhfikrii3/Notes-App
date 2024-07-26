const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const config = require("../config/config");

exports.createAccount = async (req, res, next) => {
	try {
		const { fullName, email, password } = req.body;
		const existingUser = await User.findOne({ email });

		if (existingUser) {
			return res
				.status(200)
				.json({ error: false, message: "User already exist" });
		}

		const user = new User({ fullName, email, password });
		await user.save();

		const accessToken = jwt.sign(
			{ userId: user._id },
			config.accessTokenSecret,
			{ expiresIn: "3600m" }
		);

		return res.json({
			error: false,
			message: "Registration Successful",
			user,
			accessToken,
		});
	} catch (error) {
		next(error);
	}
};

exports.login = async (req, res, next) => {
	try {
		const { email, password } = req.body;
		const user = await User.findOne({ email });

		if (!user) {
			return res.status(400).json({
				error: true,
				message: "User not found",
			});
		}

		const isMatch = await user.comparePassword(password);
		if (isMatch) {
			const accessToken = jwt.sign(
				{ userId: user._id },
				config.accessTokenSecret,
				{ expiresIn: "3600m" }
			);
			return res.json({
				error: false,
				message: "Login Successful",
				email,
				accessToken,
			});
		} else {
			return res
				.status(400)
				.json({ error: true, message: "Credential Invalid" });
		}
	} catch (error) {
		next(error);
	}
};
