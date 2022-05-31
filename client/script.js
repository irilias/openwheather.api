const { default: axios } = require("axios");
const { default: renderView } = require("./modules/Renderer");
const bodyElement = document.querySelector("body");
navigator.geolocation.getCurrentPosition(onSuccessPosition, onErrorPosition);
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

function onSuccessPosition({ coords }) {
  const { latitude, longitude } = coords;
  axios
    .get(
      `${process.env.BACKEND_SERVER_URL}/weather-data?lat=${latitude}&lon=${longitude}`
    )
    .then(({ data }) => {
      console.log("A response from the server has been received.");
      const { current, daily, hourly } = data;
      bodyElement.classList.remove("blurred");
      renderView(current, daily, hourly);
    })
    .catch((error) =>
      console.error(
        `An Error has occured, please try again. Error : ${error.message}`
      )
    );
}

function onErrorPosition(error) {
  if (error)
    alert(
      "In order to display the correct weather forcast, the application needs access to your location."
    );
}
