const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { authenticateToken } = require("../utils/utilities");
const asyncHandler = require("../utils/asyncHandler");

router.get(
	"/get-user",
	authenticateToken,
	asyncHandler(userController.getUser)
);

module.exports = router;
