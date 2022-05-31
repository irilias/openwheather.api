import { format } from "date-fns";
const { default: setElementTextContentValue, setImage } = require("./Helper");

export default function renderView(current, daily, hourly) {
  renderCurrentView(current);
  renderDailyView(daily);
  renderHourlyView(hourly);
}

function renderCurrentView(current) {
  setImage(".weather-icon", current.weatherIcon, { size: "@4x" });
  setElementTextContentValue("current-temp", current.currentTemperature);
  setElementTextContentValue("current-description", current.weatherDescription);
  setElementTextContentValue("current-high-temp", current.highTemperature);
  setElementTextContentValue("current-low-temp", current.lowTemperature);
  setElementTextContentValue(
    "current-feels-like-high-temp",
    current.feelHighTemperature
  );
  setElementTextContentValue(
    "current-feels-like-low-temp",
    current.feelLowTemperature
  );
  setElementTextContentValue("current-wind-speed", current.windSpeed);
  setElementTextContentValue("current-precip", current.precip);
}

function renderDailyView(daily) {
  const dailyWeatherElement = document.querySelector(".daily-weather");
  dailyWeatherElement.innerHTML = "";
  const dailyTemplate = document.getElementById("daily-info-template");
  let dailyElement = dailyTemplate.content.cloneNode(true);
  daily.forEach((day) => {
    if (dailyElement.childNodes.length < 1)
      dailyElement = dailyTemplate.content.cloneNode(true);
    setImage(".weather-icon", day.weatherIcon, "@2x", dailyElement);
    setElementTextContentValue("date", formatTimestamp(day.datetime), {
      parentElement: dailyElement,
    });
    setElementTextContentValue("daily-temp", day.temperature, {
      parentElement: dailyElement,
    });
    dailyWeatherElement.appendChild(dailyElement);
  });
}

function renderHourlyView(hourly) {
  //TODO : Render the hourly view.
}

function formatTimestamp(timestamp) {
  return format(new Date(timestamp), "EEEE");
}
