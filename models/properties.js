const mongoose = require("mongoose");
const Adress = require("./adress");

// PROPERTY SCHEMA
const PropertySchema = new mongoose.Schema({
  adress: Adress.schema,
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
    minlength: 20,
    maxlength: 120,
  },
});

module.exports = new mongoose.model("Property", PropertySchema);
