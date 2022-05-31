const { default: axios } = require("axios");
const express = require("express");
const cors = require("cors");
const app = express();

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

var corsOptions = {
  origin: [`${process.env.FONTEND_SERVER_URL}`],
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.get("/weather-data", (req, res) => {
  const { lat, lon } = req.query;
  axios
    .get(
      `http://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}` +
        `&exclude=minutely,alerts&units=metric&appid=${process.env.API_KEY}`
    )
    .then(({ data }) => {
      const { current, hourly, daily } = data;
      res.json({
        current: mapCurrentData({ current, daily }),
        daily: mapDailyData({ daily, currentDt: current.dt }),
        hourly: mapHourlyData(hourly),
        data,
      });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({
        message:
          "An error has occured while getting weather data. Please try again later.",
      });
    });
});

app.get("/", (req, res) => {
  console.log("a GET request has been received on the Server.");
  res.json();
});
app.listen("3001");

function mapCurrentData({ current, daily }) {
  return {
    currentTemperature: current.temp,
    weatherIcon: current.weather[0].icon,
    weatherDescription: current.weather[0].description,
    windSpeed: current.wind_speed,
    highTemperature: daily[0].temp.max,
    lowTemperature: daily[0].temp.min,
    feelHighTemperature: Math.max(...Object.values(daily[0].feels_like)),
    feelLowTemperature: Math.min(...Object.values(daily[0].feels_like)),
    precip: daily[0].pop * 100,
  };
}
function mapDailyData({ daily, currentDt }) {
  return daily
    .filter((d) => d.dt > currentDt)
    .map((day) => ({
      datetime: day.dt * 1000,
      temperature: day.temp.day,
      weatherIcon: day.weather[0].icon,
    }));
}
function mapHourlyData(hourly) {
  console.dir(hourly);
  return hourly.map((h) => ({
    datetime: h.dt * 1000,
    temperature: h.temp,
    weatherIcon: h.weather[0].icon,
    feelTemperature: h.feels_like,
    windSpeed: h.wind_speed,
    precip: h.pop * 100,
  }));
}
