const axios = require("axios");

function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of the Earth in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in kilometers
  return distance;
}

const getEarthquakesInRadius = async (req, res) => {
  const { userLat, userLon, radius } = req.query;

  if (!userLat || !userLon || !radius) {
    return res.status(400).json({ error: "Missing parameters: userLat, userLon, and radius are required." });
  }

  try {
    const response = await axios.get(
      "https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&limit=15&minmagnitude=2"
    );
    
    // Log the API response to check if it returns data
    console.log(response.data);

    // Filter earthquakes within the specified radius
    const earthquakesInRadius = response.data.features.filter((quake) => {
      const quakeLat = quake.geometry.coordinates[1];
      const quakeLon = quake.geometry.coordinates[0];
      const distance = calculateDistance(userLat, userLon, quakeLat, quakeLon);
      
      return distance <= radius; // Only include earthquakes within the given radius
    }).map((quake) => ({
      magnitude: quake.properties.mag,
      location: quake.properties.place, // Location of the earthquake
      latitude: quake.geometry.coordinates[1],
      longitude: quake.geometry.coordinates[0],
      distance: calculateDistance(userLat, userLon, quake.geometry.coordinates[1], quake.geometry.coordinates[0]).toFixed(2),
    }));

    // If no earthquakes are found within the radius, return a message
    if (earthquakesInRadius.length === 0) {
      return res.status(200).json({
        message: "No recent earthquakes were found within your selected radius."
      });
    }

    console.log(earthquakesInRadius); // Log filtered earthquakes to ensure filtering works
    res.json(earthquakesInRadius);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch earthquake data" });
  }
};

module.exports = { getEarthquakesInRadius };
