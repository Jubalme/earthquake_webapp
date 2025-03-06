const express = require("express");
const { getEarthquakes } = require("../controllers/earthquakeControllers");

const router = express.Router();

router.get("/", getEarthquakes);

module.exports = router;
