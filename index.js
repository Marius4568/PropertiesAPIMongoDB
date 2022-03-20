// mongo us: Molojoker235 ps: gcA7JdDujiGdrbvj

const express = require("express");
const mongoose = require("mongoose");
const app = express();
require("dotenv").config();
const propertiesRoute = require("./routes/properties");
const winston = require("winston");

const PORT = process.env.PORT || 3000;

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//logger
const logger = winston.createLogger({
  level: "info",
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(winston.format.colorize({ all: true })),
    }),
    new winston.transports.File({ filename: "error.log", level: "error" }),
  ],
  exceptionHandlers: [
    new winston.transports.File({ filename: "exceptions.log" }),
  ],
});

//routes
app.use("/properties", propertiesRoute);

// connect to MongoDBAtlas
async function mongooseConnect() {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
    });

    logger.info("connected to MongoDB Atlas");
  } catch (err) {
    logger.error(err.message);
  }
}

mongooseConnect();

//start server
app.listen(PORT, () => {
  logger.info(`server started at Port ${PORT}`);
});
