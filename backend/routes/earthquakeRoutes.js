const express = require("express");
const { getEarthquakesInRadius } = require("../controllers/getearthquakeInRadius");
const router = express.Router();




router.get("/earthquakes-in-radius", getEarthquakesInRadius);

module.exports = router;
