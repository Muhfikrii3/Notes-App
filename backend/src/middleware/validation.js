const schemas = require("../validators/schemas");

module.exports = (schemaName) => {
	return (req, res, next) => {
		const schema = schemas[schemaName];
		if (!schema) {
			return res
				.status(500)
				.json({ error: true, message: "Schema not found" });
		}

		const { error } = schema.validate(req.body);
		if (error) {
			return res
				.status(400)
				.json({ error: true, message: error.details[0].message });
		}

		next();
	};
};
