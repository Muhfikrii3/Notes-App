const handleResponse = (res, statusCode, message, data = null) => {
	return res.status(statusCode).json({
		error: false,
		message,
		data,
	});
};

module.exports = {
	handleResponse,
};
