// current date and time
let newDateAndTime = new Date();
let jsCurrentDateAndTime = document.querySelector(".currentDateAndTime");
let hour = newDateAndTime.getHours();
if (hour < 10) {
  let hour = `0${hour}`;
}
let minutes = newDateAndTime.getMinutes();
/* if (minutes > 10) {
  let minutes = `0${minutes}`;
} */

let weekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let dayOfWeek = weekDays[newDateAndTime.getDay()];

jsCurrentDateAndTime.innerHTML = `${dayOfWeek}, ${hour}:${minutes}`;

// search engine function & api function
let form = document.querySelector("#search-form");

function updatedCity(event) {
  event.preventDefault();
  let searchCity = document.querySelector("#search-for-city");
  let usersCity = document.querySelector("#city-name");
  usersCity.innerHTML = `${searchCity.value}`;
  let apiKey = `a95c2c6739994ba4903e007ee817e7d1`;

  let unit = `metric`;
  let weatherApi = `https://api.openweathermap.org/data/2.5/weather?q=${searchCity.value}&units=${unit}&appid=${apiKey}`;
  axios.get(`${weatherApi}`).then(updateWeather);
}

form.addEventListener("submit", updatedCity);

// api response
function updateWeather(response) {
  let temp = document.querySelector(".exactTemp");
  temp.innerHTML = `${Math.round(
    response.data.main.temp
  )}<sup style="font-size:30px;">°C</sup>`;
  document.querySelector("#city-name").innerHTML = response.data.name;
  document.querySelector(".weatherDescription").innerHTML =
    response.data.weather[0].description;
  console.log(response);
}

/*
// get lat and long
function revealPosition(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let unit = `metric`;
  let cLocation = document.querySelector("#current-location-button");
  let apiKey = `a95c2c6739994ba4903e007ee817e7d1`;
  let geolocationApi = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=0${long}&units=${unit}&appid=${apiKey}`;
  axios.get(`${geolocationApi}`).then(revealGeoLo);

  // geo location function here
  function revealGeoLo(response) {
    let areaName = response.data.name;
    let usersCity = document.querySelector("#city-name");
    usersCity.innerHTML = `${response.data.name}`;
    let temp = Math.round(response.data.main.temp);
    temp.innerHTML = `${Math.round(
      response.data.main.temp
    )}<sup style="font-size:30px;">°C</sup>`;
  }
}

// current location button
function revealLiveLocation(event) {
  event.preventDefault();
  let cLocation = document.querySelector("#current-location-button");
}

let liveLocationButton = document.querySelector("#current-location-button");
liveLocationButton.addEventListener("click", revealLiveLocation);

navigator.geolocation.getCurrentPosition(revealPosition);
*/
