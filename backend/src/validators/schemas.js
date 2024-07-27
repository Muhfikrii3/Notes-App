const Joi = require("joi");

const schemas = {
	registrationValidation: Joi.object({
		fullName: Joi.string().required(),
		email: Joi.string().email().required(),
		password: Joi.string().min(6).required(),
	}),
	loginValidation: Joi.object({
		email: Joi.string().email().required(),
		password: Joi.string().min(6).required(),
	}),
	noteValidation: Joi.object({
		title: Joi.string().required(),
		content: Joi.string().required(),
		tags: Joi.array().items(Joi.string()).optional(),
	}),
	notePinnedValidation: Joi.object({
		isPinned: Joi.boolean().required(),
	}),
};

module.exports = schemas;
