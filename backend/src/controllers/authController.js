const { registration, login } = require("../services/auth.services");
const { handleResponse } = require("../utils/response");
const asyncHandler = require("../utils/asyncHandler");
const {
	registrationValidation,
	loginValidation,
} = require("../validators/schemas");

const registrationUser = asyncHandler(async (req, res) => {
	const { error, value } = registrationValidation.validate(req.body);
	if (error) {
		return res
			.status(400)
			.json({ error: true, message: error.details[0].message });
	}

	const { user, accessToken } = await registration(value);

	return handleResponse(res, 201, "Registration Successful", {
		user,
		accessToken,
	});
});

const loginUser = asyncHandler(async (req, res) => {
	const { error, value } = loginValidation.validate(req.body);
	if (error) {
		return res
			.status(400)
			.json({ error: true, message: error.details[0].message });
	}

	const { email, accessToken } = await login(value);

	return handleResponse(res, 201, "Login Successful", {
		email,
		accessToken,
	});
});

module.exports = {
	registrationUser,
	loginUser,
};
