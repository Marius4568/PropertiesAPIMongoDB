// mongo us: Molojoker235 ps: gcA7JdDujiGdrbvj

const express = require("express");
const mongoose = require("mongoose");
const app = express();
require("dotenv").config();
const propertiesRoute = require("./routes/properties");

const PORT = process.env.PORT || 3000;

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
app.use("/api/properties", propertiesRoute);

// connect to MongoDBAtlas
async function mongooseConnect() {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
    });

    console.log("connected to mongo");
  } catch (err) {
    console.log(err);
  }
}

mongooseConnect();

//start server
app.listen(PORT, () => {
  console.log("server started at Port " + PORT);
});
