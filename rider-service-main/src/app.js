const express = require("express");
const mongoose = require("mongoose")
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const riderRoutes = require("./routes/rider.routes");
const errorHandler = require("./middleware/errorHandler");
const { v4: uuidv4 } = require("uuid");
const expressWinston = require("express-winston");
const winston = require("winston");
const addRequestId = require("express-request-id")

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(addRequestId());
app.use((req, res, next) => {
  req.correlationId = uuidv4();
  next();
})
app.use(cors());
app.use(morgan("dev"));

// Health check endpoint
app.get("/health", async (req, res) => {
  try {
    const dbState =
      mongoose.connection.readyState === 1 ? "Connected" : "Disconnected";

    res.status(200).json({
      status: "UP",
      service: "rider-service",
      database: dbState,
      timestamp: new Date().toISOString()
    });
  } catch (err) {
    res.status(500).json({
      status: "DOWN",
      error: err.message,
      timestamp: new Date().toISOString()
    });
  }
});

// Structured JSON logging
app.use(
  expressWinston.logger({
    transports: [
      new winston.transports.Console(),
    ],
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
      winston.format.printf(({ level, message, timestamp, meta }) => {
        return `${timestamp} [${level}]: ${message}`;
      })
    ),
    meta: false, // hides headers, query, etc.
    msg: (req, res) =>
      `HTTP ${req.method} ${req.originalUrl} [${req.correlationId}] ${res.statusCode}`,
    expressFormat: false,
    colorize: true,
  })
);


app.get("/", (req, res) => res.send("Rider Service is Running"));
app.use("/v1/riders", riderRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5005;
app.listen(PORT, () =>
  console.log(`Rider Service running on port ${PORT}`)
);
