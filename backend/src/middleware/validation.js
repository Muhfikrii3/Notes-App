const schemas = require("../validators/schemas");
const createError = require("http-errors");

module.exports = (schemaName) => {
	return (req, _, next) => {
		const schema = schemas[schemaName];
		if (!schema) {
			return next(createError(500, "Schema not found"));
		}

		const { error, value } = schema.validate(req.body);
		if (error) {
			return next(createError(400, error.details[0].message));
		}

		req.validatedBody = value;
		next();
	};
};
