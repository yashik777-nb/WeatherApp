const request = require("postman-request");

const forecast = ({ latitude: latitude, longitude: longitude }, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=e154567cd956719efad68b335652cf85&query=${latitude},${longitude}`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to fetch the forecast");
    } else if (body.error) {
      callback(body.error.type);
    } else {
      callback(undefined, {
        forecast: body.current.weather_descriptions[0],
        temperature: body.current.temperature,
        feelslike: body.current.feelslike,
      });
    }
  });
};

module.exports = forecast;
