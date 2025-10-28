const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const riderRoutes = require("./routes/rider.routes");
const errorHandler = require("./middleware/errorHandler");

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.get("/", (req, res) => res.send("Rider Service is Running"));
app.use("/v1/riders", riderRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5005;
app.listen(PORT, () =>
  console.log(`Rider Service running on port ${PORT}`)
);
