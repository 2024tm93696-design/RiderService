const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const riderRoutes = require("./routes/rider.routes");
const errorHandler = require("./middleware/errorHandler");
const { v4: uuidv4 } = require("uuid");
const expressWinston = require("express-winston");
const winston = require("winston");

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use((req, res, next) => {
  req.correlationId = uuidv4();
  next();
})
app.use(cors());
app.use(morgan("dev"));

// Structured JSON logging
app.use(
  expressWinston.logger({
    transports: [
      new winston.transports.Console(), // logs to terminal
    ],
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.json()
    ),
    meta: true,
    msg: (req, res) =>
      `HTTP ${req.method} ${req.url} [${req.correlationId}] ${res.statusCode}`,
    expressFormat: false,
    colorize: false,
  })
);


app.get("/", (req, res) => res.send("Rider Service is Running"));
app.use("/v1/riders", riderRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5005;
app.listen(PORT, () =>
  console.log(`Rider Service running on port ${PORT}`)
);
