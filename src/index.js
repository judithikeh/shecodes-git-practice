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




/*
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

// coordinates for forecast
function getCoordinates(coordinates){
  let apiKey = `a95c2c6739994ba4903e007ee817e7d1`;
  let unit = `metric`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=${unit}`;
  console.log(apiUrl); 
}

// api response for temp and city
function updateWeather(response) {
  // retreiving api city temp
  celsiusTemperature = response.data.main.temp;
  let temp = document.querySelector(".exactTemp");
  temp.innerHTML = `${Math.round(celsiusTemperature)}`;
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

  getCoordinates(response.data.coord);
}
// degrees update
function displayFahrenheitTemp(event) {
  event.preventDefault();
  degreesCelsiusElement.classList.add("active");
  degreesFahrenheitElement.classList.remove("active");
  let exactTempElement = document.querySelector(".exactTemp");
  let fahrenheitTemperature = Math.round((celsiusTemperature * 9) / 5 + 32);
  exactTempElement.innerHTML = fahrenheitTemperature;
}

function displayCelsiusTemp(event) {
  event.preventDefault();
  degreesCelsiusElement.classList.remove("active");
  degreesFahrenheitElement.classList.add("active");
  let exactTempElement = document.querySelector(".exactTemp");
  exactTempElement.innerHTML = Math.round(celsiusTemperature);
}

// weekly forecast 
function displayWeeklyForecast() {
  
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  let days = ["Tues", "Wed", "Thurs", "Fri", "Sat"]; 

days.forEach(function (day) {
  forecastHTML = forecastHTML +
  `<div class="col-2 forecastAlign" >
            <div class="weeklyForecast">${day}</div>
            <img
              src="https://openweathermap.org/img/wn/01d@2x.png"
              alt=""
              class="temperatureImageSymbol"
            />
            <div class="highAndLow">
              <span class="maxTemp"><b>11°</b> </span
              ><span class="minTemp">2°</span>
              </div>
          </div>`; 
});
  forecastHTML = forecastHTML + `</div>`;
forecastElement.innerHTML = forecastHTML; 
 };



displayWeeklyForecast(); 
let celsiusTemperature = null;
form.addEventListener("submit", updatedCity);

let degreesCelsiusElement = document.querySelector(".degreesCelsius");
degreesCelsiusElement.addEventListener("click", displayCelsiusTemp);

let degreesFahrenheitElement = document.querySelector(".degreesFahrenheit");
degreesFahrenheitElement.addEventListener("click", displayFahrenheitTemp);
*/

// search engine function & api function
let form = document.querySelector("#search-form");

function updatedCity(event) {
  event.preventDefault();
  let inputCityJs = document.querySelector("#input-city");
  let usersCity = document.querySelector("#users-city-name-html");
  usersCity.innerHTML = `${inputCityJs.value}`;
  let apiKey = `e9b13b0d14e3512d9oa0t7fdc2ebf750`;
  let unit = `metric`;
  let weatherApi = `https://api.shecodes.io/weather/v1/current?query=${inputCityJs.value}&units=${unit}&key=${apiKey}`;
 
  axios.get(`${weatherApi}`).then(updateWeather);
}

// coordinates for forecast
function getCoordinates(coordinates){
  let apiKey = `e9b13b0d14e3512d9oa0t7fdc2ebf750`;
  let unit = `metric`;
  let apiUrl = ` https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}&units=${unit}`;
  axios.get(`${apiUrl}`).then(displayForecast);
} 

// api response for temp and city
function updateWeather(response) {

  // retreiving api city temp
  celsiusTemperature = response.data.temperature.current;
  let temp = document.querySelector(".exactTemp");
  temp.innerHTML = `${Math.round(celsiusTemperature)}`;
  // retreiving api city name
  document.querySelector(".cityPlaceholder").innerHTML = response.data.city;

  document.querySelector(
    `.humidityAttribute`
  ).innerHTML = `Humidity: ${Math.round(response.data.temperature.humidity)}%`;
  document.querySelector(`.windAttribute`).innerHTML = `Wind: ${Math.round(
    response.data.wind.speed
  )} km/h`;

  // retreiving api city temp description
  let weatherDescription = document.querySelector(
    ".weatherConditionDescription"
  );
  weatherDescription.innerHTML = response.data.condition.description;
  // getting users city accurate time and day
  let currentDayAndTimeElement = document.querySelector(`.currentDayAndTime`);
  currentDayAndTimeElement.innerHTML = formatDate(response.data.time * 1000);

  // change icon according to country
  let iconApi = response.data.condition.icon;
  let emojiElement = document.querySelector(`#emoji-symbol`);
  emojiElement.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${iconApi}.png`
  );
  
  getCoordinates(response.data.coordinates);
} 



// degrees update
function displayFahrenheitTemp(event) {
  event.preventDefault();
  degreesCelsiusElement.classList.add("active");
  degreesFahrenheitElement.classList.remove("active");
  let exactTempElement = document.querySelector(".exactTemp");
  let fahrenheitTemperature = Math.round((celsiusTemperature * 9) / 5 + 32);
  exactTempElement.innerHTML = fahrenheitTemperature;
}

function displayCelsiusTemp(event) {
  event.preventDefault();
  degreesCelsiusElement.classList.remove("active");
  degreesFahrenheitElement.classList.add("active");
  let exactTempElement = document.querySelector(".exactTemp");
  exactTempElement.innerHTML = Math.round(celsiusTemperature);
}

// weekly forecast 
function displayForecast(response) {
  let forecast = response.data.daily;
  console.log(forecast);
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  console.log(Math.round(forecast[0].temperature.maximum));

forecast.forEach(function (forecastDays) {
  let maxTemperature = (Math.round(forecastDays.temperature.maximum));
  let minTemperature = (Math.round(forecastDays.temperature.minimum));
  let nameOfWeek = (forecastDays.time);
  date = new Date(nameOfWeek);
  console.log(date);
 
  
  forecastHTML = forecastHTML +
  `<div class="col-2 forecastAlign" >
            <div class="weeklyForecast">mon</div>
            <img
              src="https://openweathermap.org/img/wn/01d@2x.png"
              alt=""
              class="temperatureImageSymbol"
            />
            <div class="highAndLow">
              <span class="maxTemp"><b>
              ${maxTemperature}
              </b> </span
              ><span class="minTemp">
             ${minTemperature}
              </span>
              </div>
          </div>`; 
});
  forecastHTML = forecastHTML + `</div>`;
forecastElement.innerHTML = forecastHTML; 

 };




let celsiusTemperature = null;
form.addEventListener("submit", updatedCity);

let degreesCelsiusElement = document.querySelector(".degreesCelsius");
degreesCelsiusElement.addEventListener("click", displayCelsiusTemp);

let degreesFahrenheitElement = document.querySelector(".degreesFahrenheit");
degreesFahrenheitElement.addEventListener("click", displayFahrenheitTemp);