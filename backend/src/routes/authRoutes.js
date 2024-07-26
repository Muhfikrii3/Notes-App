const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const noteController = require("../controllers/noteController");
const validate = require("../middleware/validation");
const { authenticateToken } = require("../utils/utilities");

router.post(
	"/create-account",
	validate("createAccount"),
	authController.createAccount
);
router.post("/login", validate("login"), authController.login);
router.post(
	"/notes",
	authenticateToken,
	validate("note"),
	noteController.createNote
);

router.get("/protected-route", authenticateToken, (req, res) => {
	res.json({ message: "You are accessing a protected route!" });
});

module.exports = router;
