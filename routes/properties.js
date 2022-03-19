const express = require("express");
const router = express.Router();
const { Property, validateProperty } = require("../models/properties");

//POST: POST A NEW PROPERTY
router.post("/", async (req, res) => {
  const error = await validateProperty(req.body);
  if (error.message) res.status(400).send(error.message);
  property = new Property({
    adress: {
      country: req.body.country,
      city: req.body.city,
      street: req.body.street,
      houseNumber: req.body.houseNumber,
    },
    price: req.body.price,
    image: req.body.image,
    description: req.body.description,
  });

  property
    .save()
    .then((property) => {
      res.send(property);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

module.exports = router;
