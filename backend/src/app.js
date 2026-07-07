const express = require("express");
const cors = require("cors");
const app = express();
const authRoutes = require("./routes/authRoutes");
const interviewRoutes = require("./routes/interviewRoutes");
const answerRoutes = require("./routes/answerRoutes");
const errorHandler = require("./middleware/errorHandler");
const { swaggerUiExpress, specs } = require("./docs/swagger");
const dashboardRoutes = require("./routes/dashboardRoutes");

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/interviews", interviewRoutes);
app.use("/api/questions", answerRoutes);
app.use("/api-docs", swaggerUiExpress.serve, swaggerUiExpress.setup(specs));
app.use("/api/dashboard", dashboardRoutes);
app.use(errorHandler);

module.exports = app;
