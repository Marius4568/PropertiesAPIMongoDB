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

//GET ALL PROPERTIES
router.get("/", (req, res) => {
  Property.find()
    .then((properties) => res.send(properties))
    .catch((err) => res.status(500).send("bad stuff happened"));
});

//GET THE PROPERTY BY ID

router.get("/:propertyId", async (req, res) => {
  try {
    const propertyById = await Property.findById(req.params.propertyId);
    if (propertyById) res.send(propertyById);
    res.status(404).send("property not found");
  } catch (err) {
    res.status(500).send(err.message);
  }
});

//GET THE PROPERTY BY Country
router.get("/countries/search", async (req, res) => {
  try {
    const queryArr = req.query.arr.split(",");
    const propertiesByCountry = await Property.find({
      "adress.country": { $in: queryArr },
    });
    if (propertiesByCountry) res.send(propertiesByCountry);
    res.status(404).send("no properties found");
  } catch (err) {
    res.status(500).send(err.message);
  }
});

//Update Book based on ID

router.put("/:propertyId", async (req, res) => {
  const propertyById = await Property.findByIdAndUpdate(
    req.params.propertyId,
    {
      adress: {
        country: req.body.country,
        city: req.body.city,
        street: req.body.street,
        houseNumber: req.body.houseNumber,
      },
      price: req.body.price,
      image: req.body.image,
      description: req.body.description,
    },
    { new: true }
  );

  if (!propertyById) res.status(404).send("property not found");
  res.send(propertyById);
});

//DELETE book based on id

router.delete("/:propertyId", async (req, res) => {
  const property = await Property.findByIdAndRemove(req.params.propertyId);

  if (!property) res.status(404).send("property not found");
  res.send(property);
});

module.exports = router;
