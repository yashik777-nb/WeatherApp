// console.log("Starting");

// setTimeout(() => {
//   console.log("2 second timer");
// }, 2000);

// setTimeout(() => console.log("0 second timer"), 0);

// console.log("Stopping");

// const url =
//   "http://api.weatherstack.com/current?access_key=e154567cd956719efad68b335652cf85&query=-52.3333,1.5833";

// Weather API
// request({ url: url, json: true }, (error, response) => {
//   //   console.log(error);
//   //   console.log("status code: ", response.statusCode);
//   //   const data = JSON.parse(body);
//   if (error) {
//     console.log("Unable to connect to the service");
//   } else if (response.body.error) {
//     console.log(response.body.error.code, response.body.error.type);
//   } else {
//     console.log(
//       `It is currently ${chalk.green(
//         response.body.current.temperature
//       )} degrees out. It feels like ${chalk.green(
//         response.body.current.feelslike
//       )} degrees out. The Forecast is ${chalk.yellow(
//         response.body.current.weather_descriptions[0]
//       )}.`
//     );
//   }
// });

// Geocoding API
// Address -> Convert it into Lat & Lon -> Weather Output
// let longitude, latitude;

// const mapBoxApiUrl =
//   "https://api.mapbox.com/geocoding/v5/mapbox.places/warwickshire.json?limit=1&access_token=pk.eyJ1IjoieWFzaGlrNzc3IiwiYSI6ImNranJqN294YjI5Ymsyc21qMTVoaW1ueDkifQ.pzsDJjdOm1-RPePegrOulw";

// request({ url: mapBoxApiUrl, json: true }, (error, response) => {
//   if (error) {
//     console.log("Unable to fetch the co-ordinates");
//   } else if (response.body.features.length == 0) {
//     console.log(response.message);
//   } else {
//     latitude = response.body.features[0].center[1];
//     longitude = response.body.features[0].center[0];
//     console.log(latitude, longitude);
//   }
// });

const chalk = require("chalk");
const yargs = require("yargs");
const forecast = require("./utils/forecast.js");
const geoCode = require("./utils/geoCode.js");

yargs.command({
  command: "location",
  describe: "Weather Details of the location",
  builder: {
    title: {
      describe: "Provide location",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    geoCode(
      argv.title,
      (err, { latitude = 23, longitude = 23, location = "Hyderabad" }) => {
        if (err) return console.log(err);

        forecast(
          { latitude: latitude, longitude: longitude },
          (err, forecastData) => {
            if (err) return console.log(err);

            console.log(
              location,
              forecastData.forecast,
              forecastData.temperature,
              forecastData.feelslike
            );
          }
        );
      }
    );
  },
});

yargs.parse();
