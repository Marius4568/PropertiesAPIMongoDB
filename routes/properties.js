const express = require("express");
const router = express.Router();
const Property = require("../models/properties");

//POST: POST A NEW PROPERTY
router.post("/", (req, res) => {
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
