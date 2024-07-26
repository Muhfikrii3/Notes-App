const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
	fullName: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	createdOn: { type: Date, default: Date.now },
});

userSchema.pre("save", async function (next) {
	if (this.isModified("password") || this.isNew) {
		const secure = await bcrypt.genSalt(10);
		this.password = await bcrypt.hash(this.password, secure);
	}
	next();
});

userSchema.methods.comparePassword = function (candidatePassword) {
	return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
