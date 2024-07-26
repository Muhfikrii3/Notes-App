const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const validate = require("../middleware/validateRequest");
const { authenticateToken } = require("../utilities");

router.post("/create-account", validate, authController.createAccount);
router.post("/login", validate, authController.login);

router.get("/protected-route", authenticateToken, (req, res) => {
	res.json({ message: "You are accessing a protected route!" });
});

module.exports = router;
