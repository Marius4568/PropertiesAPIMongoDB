const mongoose = require("mongoose");
const Adress = require("./adress");
const yup = require("yup");

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

const validateProperty = (property) => {
  let schema = yup.object().shape({
    country: yup.string().required(),
    city: yup.string().required(),
    street: yup.string().required(),
    houseNumber: yup.number().required(),
    price: yup.number().required(),
    image: yup.string().required(),
    description: yup.string().required().min(20).max(120),
  });
  return schema
    .validate(property)
    .then((property) => property)
    .catch((err) => err.message);
};

exports.Property = new mongoose.model("Property", PropertySchema);
exports.validateProperty = validateProperty;
