/* current date and time
let newDateAndTime = new Date();
let jsCurrentDateAndTime = document.querySelector(".currentDayAndTime");
let hour = newDateAndTime.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minutes = newDateAndTime.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
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
let dayOfWeek = weekDays[newDateAndTime.getDay()];

jsCurrentDateAndTime.innerHTML = `${dayOfWeek}, ${hour}:${minutes}`; */
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

form.addEventListener("submit", updatedCity);

// api response for temp and city
function updateWeather(response) {
  // retreiving api city temp
  let temp = document.querySelector(".exactTemp");
  temp.innerHTML = `${Math.round(
    response.data.main.temp
  )} <span class="col-2 degreesUnits">
              <sup>
                <a href="#" class="degreesCelsius"
                  >°C <span class="unitsDivider">|</span></a
                >
                <a href="#" class="degreesFahrenheit">°F</a></sup
              >
            </span>`;
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

  /* change icon
  let weatherIconCode = response.data.weather[0].icon;
  let weatherEmojiUrl = `https://openweathermap.org/img/wn/${weatherIconCode}@2x.png`;
  let jsEmohiPlaceholder = document.querySelector(".weatherIconCodeHtml");
  jsEmojiPlaceholder.innerHTML = `${response.weatherEmojiUrl}`; */
}
