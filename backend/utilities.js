const jwt = require("jsonwebtoken");
const config = require("./config/config");

/**
 * Middleware to verify JWT tokens
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {Function} next - Next middleware function
 */
function authenticateToken(req, res, next) {
	const authHeader = req.headers["authorization"];
	const token = authHeader && authHeader.split(" ")[1];

	if (!token)
		return res
			.status(401)
			.json({ error: true, message: "Token not found" });

	jwt.verify(token, config.accessTokenSecret, (err, user) => {
		if (err)
			return res
				.status(403)
				.json({ error: true, message: "Invalid token" });
		req.user = user;
		next();
	});
}

module.exports = {
	authenticateToken,
};
