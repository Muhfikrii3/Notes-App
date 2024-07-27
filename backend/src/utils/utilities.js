const jwt = require("jsonwebtoken");
const config = require("../config/config");
const User = require("../models/userModel");

/**
 * Middleware to verify JWT tokens
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {Function} next - Next middleware function
 */
async function authenticateToken(req, res, next) {
	const authHeader = req.headers["authorization"];
	const token = authHeader && authHeader.split(" ")[1];

	if (!token)
		return res
			.status(401)
			.json({ error: true, message: "Token not found" });

	try {
		const decoded = jwt.verify(token, config.accessTokenSecret);
		const user = await User.findById(decoded.userId);
		if (!user) {
			return res
				.status(404)
				.json({ error: true, message: "User not found" });
		}
		req.user = user;
		next();
	} catch (err) {
		return res.status(403).json({ error: true, message: "Invalid token" });
	}
}

module.exports = {
	authenticateToken,
};
