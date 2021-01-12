const request = require("postman-request");

const geoCode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?limit=1&access_token=pk.eyJ1IjoieWFzaGlrNzc3IiwiYSI6ImNranJqN294YjI5Ymsyc21qMTVoaW1ueDkifQ.pzsDJjdOm1-RPePegrOulw`;
  request({ url, json: true }, (error, { body, message }) => {
    // return callback("Error", undefined);
    if (error) {
      callback("Unable to connect to location services.");
    } else if (body.features.length === 0) {
      callback(message);
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name,
      });
    }
  });
};

module.exports = geoCode;
