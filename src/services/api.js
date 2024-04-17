const axios = require('axios');

/**
 * ingests all ICAO airports, only call this one time and then store it on init since it is a large (8mb) file
 * @returns [
 *  "KMIA": {
            "icao": "KMIA",
            "iata": "MIA",
            "name": "Miami International Airport",
            "city": "Miami",
            "state": "Florida",
            "country": "US",
            "elevation": 8,
            "lat": 25.7931995392,
            "lon": -80.2906036377,
            "tz": "America\/New_York"
    },
    ...
 * ]
 */
export async function getAirports() {
    const response = await axios.request({
        method: 'GET',
        url: 'https://raw.githubusercontent.com/mwgg/Airports/master/airports.json',
    });
    return response.data;
}

/**
 * Get Metar Data
 * @param {String} bbox 
 * @param {ISO8601 String} date 
 * @returns {Array} Metar data
 */
export async function getMetar(bbox, date) {
    const options = {
        method: 'GET',
        url: 'https://aviationweather.gov/api/data/metar',
        params: {format: 'json', bbox: bbox, date: date},
        headers: {'User-Agent': 'xwind.baseleg.io'}
      };

    const response = await axios.request(options);
    return response.data;
}

