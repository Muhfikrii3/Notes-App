const Joi = require("joi");

const schemas = {
	createAccount: Joi.object({
		fullName: Joi.string().required(),
		email: Joi.string().email().required(),
		password: Joi.string().min(6).required(),
	}),
	login: Joi.object({
		email: Joi.string().email().required(),
		password: Joi.string().min(6).required(),
	}),
	note: Joi.object({
		title: Joi.string().required(),
		content: Joi.string().required(),
		tags: Joi.array().items(Joi.string()).optional(),
	}),
};

module.exports = schemas;
