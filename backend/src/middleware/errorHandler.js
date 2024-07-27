module.exports = (err, res) => {
	console.error(err.stack);
	res.status(err.status || 500).json({
		error: true,
		message: err.message || "Internal Server Error",
	});
};
