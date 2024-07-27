const { registration, login } = require("../services/auth.services");
const { handleResponse } = require("../utils/response");
const asyncHandler = require("../utils/asyncHandler");

const registrationUser = asyncHandler(async (req, res) => {
	const { user, accessToken } = await registration(req.validatBody);

	return handleResponse(res, 201, "Registration Successful", {
		user,
		accessToken,
	});
});

const loginUser = asyncHandler(async (req, res) => {
	const { email, accessToken } = await login(req.validateBody);

	return handleResponse(res, 201, "Login Successful", {
		email,
		accessToken,
	});
});

module.exports = {
	registrationUser,
	loginUser,
};
