// console.log("Starting");

// setTimeout(() => {
//   console.log("2 second timer");
// }, 2000);

// setTimeout(() => console.log("0 second timer"), 0);

// console.log("Stopping");

const chalk = require("chalk");
const request = require("postman-request");

const url =
  "http://api.weatherstack.com/current?access_key=e154567cd956719efad68b335652cf85&query=London&units=f";

request({ url: url, json: true }, (error, response) => {
  console.log(error);
  console.log("status code: ", response.statusCode);
  //   const data = JSON.parse(body);
  if (response.statusCode === 200 && !error) {
    console.log(
      `It is currently ${chalk.green(
        response.body.current.temperature
      )} degrees out. It feels like ${chalk.green(
        response.body.current.feelslike
      )} degrees out. The Forecast is ${chalk.yellow(
        response.body.current.weather_descriptions[0]
      )}.`
    );
  } else {
    console.log(response.body.error.code, response.body.error.type);
  }
});
