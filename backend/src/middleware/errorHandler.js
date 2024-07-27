module.exports = (err, _req, res, _next) => {
	console.error(err.stack);
	res.status(err.status || 500).json({
		error: true,
		message: err.message || "Internal Server Error",
	});
};
