const { registration, login } = require("../services/authServices");
const { handleResponse } = require("../utils/response");
const asyncHandler = require("../utils/asyncHandler");

const registrationUser = asyncHandler(async (req, res) => {
	const { user, accessToken } = await registration(req.validatedBody);
	return handleResponse(res, 201, "Registration Successful", {
		user,
		accessToken,
	});
});

const loginUser = asyncHandler(async (req, res) => {
	const { email, accessToken } = await login(req.validatedBody);
	return handleResponse(res, 201, "Login Successful", {
		email,
		accessToken,
	});
});

module.exports = {
	registrationUser,
	loginUser,
};
