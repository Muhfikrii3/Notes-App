const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const validate = require("../middleware/validation");
const { authenticateToken } = require("../utils/utilities");
const asyncHandler = require("../utils/asyncHandler");

router.post(
	"/registrasi",
	validate("registrationValidation"),
	asyncHandler(authController.registrationUser)
);
router.post(
	"/login",
	validate("loginValidation"),
	asyncHandler(authController.loginUser)
);

router.get("/protected-route", authenticateToken, (req, res) => {
	res.json({ message: "You are accessing a protected route!" });
});

module.exports = router;
