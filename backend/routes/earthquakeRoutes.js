const express = require("express");
const { getEarthquakesInRadius } = require("../controllers/getearthquakeInRadius");
const router = express.Router();

const { getEarthquakesByMagnitude } = require("../controllers/magnitudecontroller");

// Route to get earthquakes sorted only by magnitude
router.get("/magnitude", getEarthquakesByMagnitude);


router.get("/earthquakes-in-radius", getEarthquakesInRadius);

module.exports = router;
