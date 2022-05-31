const { default: axios } = require("axios");

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
      console.log("a response from the server has been received.");
      console.dir(data);
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
