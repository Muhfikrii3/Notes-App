require("dotenv").config();

module.exports = {
	port: process.env.PORT || 8000,
	dbConnectionString: `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority&appName=${process.env.DB_APP_NAME}`,
	accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
};
