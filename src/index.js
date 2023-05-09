function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hour = date.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minute = date.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
  }
  let weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let dayOfWeek = weekDays[date.getDay()];

  return `${dayOfWeek}, ${hour}:${minute}`;
}
// search engine function & api function
let form = document.querySelector("#search-form");

function updatedCity(event) {
  event.preventDefault();
  let inputCityJs = document.querySelector("#input-city");
  let usersCity = document.querySelector("#users-city-name-html");
  usersCity.innerHTML = `${inputCityJs.value}`;
  let apiKey = `a95c2c6739994ba4903e007ee817e7d1`;
  let unit = `metric`;
  let weatherApi = `https://api.openweathermap.org/data/2.5/weather?q=${inputCityJs.value}&units=${unit}&appid=${apiKey}`;
  axios.get(`${weatherApi}`).then(updateWeather);
}

// api response for temp and city
function updateWeather(response) {
  // retreiving api city temp
  let temp = document.querySelector(".exactTemp");
  temp.innerHTML = `${Math.round(response.data.main.temp)}`;
  // retreiving api city name
  document.querySelector(".cityPlaceholder").innerHTML = response.data.name;

  document.querySelector(
    `.humidityAttribute`
  ).innerHTML = `Humidity: ${Math.round(response.data.main.humidity)}%`;
  document.querySelector(`.windAttribute`).innerHTML = `Wind: ${Math.round(
    response.data.wind.speed
  )} km/h`;

  // retreiving api city temp description
  let weatherDescription = document.querySelector(
    ".weatherConditionDescription"
  );
  weatherDescription.innerHTML = response.data.weather[0].description;
  // getting users city accurate time and day
  let currentDayAndTimeElement = document.querySelector(`.currentDayAndTime`);
  currentDayAndTimeElement.innerHTML = formatDate(response.data.dt * 1000);

  // change icon aaccording to country
  let iconApi = response.data.weather[0].icon;
  let emojiElement = document.querySelector(`#emoji-symbol`);
  emojiElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${iconApi}@2x.png`
  );

  console.log(iconApi);
}

function displayFahrenheitTemp(event) {
  let exactTempElement = document.querySelector(".exactTemp");
  let fahrenheitTemperature = Math.round(
    (exactTempElement.innerHTML * 9) / 5 + 32
  );
  exactTempElement.innerHTML = fahrenheitTemperature;
}

form.addEventListener("submit", updatedCity);

let degreesFahrenheitElement = document.querySelector(".degreesFahrenheit");
degreesFahrenheitElement.addEventListener("click", displayFahrenheitTemp);
