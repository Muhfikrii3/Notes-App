const express = require("express");
const mongoose = require("mongoose");
const config = require("./config/config");
const authRoutes = require("./routes/authRoutes");
const errorHandler = require("./middleware/errorHandler");
const morgan = require("morgan");

const app = express();

app.use(express.json());
app.use(morgan("combined"));

app.use("/api", authRoutes);

app.use(errorHandler);

mongoose
	.connect(config.dbConnectionString)
	.then(() => console.log("MongoDB Connection"))
	.catch((err) => console.error("Error connection MongoDB:", err));

app.listen(config.port, () => {
	console.log(`Server is running on port ${config.port}`);
});

module.exports = app;
