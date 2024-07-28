const express = require("express");
const mongoose = require("mongoose");
const config = require("./config/config");
const authRoutes = require("./routes/authRoutes");
const noteRoutes = require("./routes/noteRoutes");
const userRoutes = require("./routes/userRoutes");
const errorHandler = require("./middleware/errorHandler");
const morgan = require("morgan");
const cors = require("cors");

const app = express();

const allowedOrigins = ["http://localhost:5173"];
const corsOptions = {
	origin: (origin, callback) => {
		if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
			callback(null, true);
		} else {
			callback(new Error("Not allowed by CORS"));
		}
	},
	optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(morgan("combined"));
app.use("/api/auth", authRoutes);
app.use("/api/notes", noteRoutes);
app.use("/api/user", userRoutes);

app.use(errorHandler);

mongoose
	.connect(config.dbConnectionString)
	.then(() => console.log("MongoDB Connection"))
	.catch((err) => console.error("Error connection MongoDB:", err));

app.listen(config.port, () => {
	console.log(`Server is running on port ${config.port}`);
});

module.exports = app;
