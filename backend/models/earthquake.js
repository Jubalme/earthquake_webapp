const mongoose = require("mongoose");

const EarthquakeSchema = new mongoose.Schema({
  place: String,
  magnitude: Number,
  time: Date,
  latitude: Number,
  longitude: Number,
});

module.exports = mongoose.model("Earthquake", EarthquakeSchema);
