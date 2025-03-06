const axios = require("axios");

// Fetch earthquake data from USGS API
const getEarthquakes = async (req, res) => {
  try {
    const response = await axios.get(
      "https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&limit=10"
    );
    const earthquakes = response.data.features.map((quake) => ({
      magnitude: quake.properties.mag,
      latitude: quake.geometry.coordinates[1],
      longitude: quake.geometry.coordinates[0],
    }));
    res.json(earthquakes);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch earthquake data" });
  }
};

module.exports = { getEarthquakes };
