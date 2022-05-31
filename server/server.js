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
      console.dir(data);
      const { current, hourly, daily } = data;
      res.json({
        current: mapCurrentData({ current }),
        daily: mapDailyData({ daily }),
        hourly: mapHourlyData({ hourly }),
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

function mapCurrentData(current) {}
function mapDailyData(daily) {}
function mapHourlyData(hourly) {}
