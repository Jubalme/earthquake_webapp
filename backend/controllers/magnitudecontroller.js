const axios = require("axios");

const getEarthquakesByMagnitude = async (req, res) => {
  try {
    const response = await axios.get(
      "https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&limit=15&minmagnitude=2"
    );

    // Extract earthquake data and sort by magnitude (descending order)
    const sortedEarthquakes = response.data.features
      .map((quake) => ({
        magnitude: quake.properties.mag,
        location: quake.properties.place, // Location of the earthquake
        latitude: quake.geometry.coordinates[1],
        longitude: quake.geometry.coordinates[0],
        time: new Date(quake.properties.time).toLocaleString(), // Timestamp of the earthquake event
      }))
      .sort((a, b) => b.magnitude - a.magnitude); // Sort from highest to lowest magnitude

    res.json(sortedEarthquakes);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch earthquake data" });
  }
};

module.exports = { getEarthquakesByMagnitude };
