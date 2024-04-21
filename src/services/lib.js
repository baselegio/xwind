const api = require('./api')

function calculatePoint45(lat1, lon1, bearing) {
  const R = 3958.8 // Earth's radius in miles
  const width = 25 // Desired width in miles
  const angularDistance = width / R

  // Calculate the coordinates 25 miles away
  const lat = (lat1 * Math.PI) / 180
  const lon = (lon1 * Math.PI) / 180
  const lat1_45 = Math.asin(
    Math.sin(lat) * Math.cos(angularDistance) +
      Math.cos(lat) *
        Math.sin(angularDistance) *
        Math.cos(bearing + (45 * Math.PI) / 180),
  )
  const lon1_45 =
    lon +
    Math.atan2(
      Math.sin(bearing + (45 * Math.PI) / 180) *
        Math.sin(angularDistance) *
        Math.cos(lat),
      Math.cos(angularDistance) - Math.sin(lat) * Math.sin(lat1_45),
    )

  // Convert back to degrees
  const newLat_45 = (lat1_45 * 180) / Math.PI
  const newLon_45 = (lon1_45 * 180) / Math.PI

  return { lat: newLat_45, lng: newLon_45 }
}

const lib = {
  calculateBBox(lat1, lng1, lat2, lng2) {
    // Calculate the bearing from the first point to the second point
    const y = Math.sin(lng2 - lng1) * Math.cos(lat2)
    const x =
      Math.cos(lat1) * Math.sin(lat2) -
      Math.sin(lat1) * Math.cos(lat2) * Math.cos(lng2 - lng1)
    const bearing = Math.atan2(y, x) // in radians
    const bearing2 = bearing * Math.PI //opposite bearing in radians

    const boxpoint1 = calculatePoint45(lat1, lng1, bearing)
    const boxpoint2 = calculatePoint45(lat2, lng2, bearing2)

    return `${boxpoint1.lat}, ${boxpoint1.lng}, ${boxpoint2.lat}, ${boxpoint2.lng}`
  },
}

//test
console.log(
  lib.calculateBBox(39.17539978, -76.66829681, 26.2471008301, -80.1110992432),
)

//fire off icao ingest
/*
const startTime = performance.now();
api.getAirports().then((icao) => {
    lib.icao = icao;
});
const endTime = performance.now();
console.info(`STATUS: ${Object.keys(lib.icao).length} ICAO airports ingested`)
console.info(`STATUS: ICAO Ingest completed in ${endTime - startTime} ms`);
*/
module.exports = lib
