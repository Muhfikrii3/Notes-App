const { getUserById } = require("../services/userServices");
const { handleResponse } = require("../utils/response");
const asyncHandler = require("../utils/asyncHandler");

const getUser = asyncHandler(async (req, res) => {
	const userId = req.user._id;
	const user = await getUserById(userId);

	return handleResponse(res, 200, "User found", {
		fullName: user.fullName,
		email: user.email,
		_id: user._id,
		createdOn: user.createdOn,
	});
});

module.exports = {
	getUser,
};
