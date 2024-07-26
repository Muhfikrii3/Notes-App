const Joi = require("joi");

module.exports = (req, res, next) => {
	let schema;

	if (req.path === "/create-account") {
		schema = Joi.object({
			fullName: Joi.string().required(),
			email: Joi.string().email().required(),
			password: Joi.string().min(6).required(),
		});
	} else if (req.path === "/login") {
		schema = Joi.object({
			email: Joi.string().email().required(),
			password: Joi.string().min(6).required(),
		});
	}

	if (!schema) {
		return res.status(500).json({ error: true, message: "Unknown route" });
	}

	const { error } = schema.validate(req.body);
	if (error) {
		return res
			.status(400)
			.json({ error: true, message: error.details[0].message });
	}
	next();
};
