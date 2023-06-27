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

// weekly forecast date format 

function formatDay(timestamp){
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
  
  return days[day];
} 

// weekly forecast 
function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  

forecast.forEach(function (forecastDays, index) {
  if ( index < 5 ){ 
  let maxTemperature = (Math.round(forecastDays.temperature.maximum));
  let minTemperature = (Math.round(forecastDays.temperature.minimum));
  let iconImage = (forecastDays.condition.icon); 
  console.log(index);
  forecastHTML = forecastHTML +
  `<div class="col-2 forecastAlign" >
            <div class="weeklyForecast">${formatDay(forecastDays.time)}</div>
            <img
              src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${iconImage}.png"
              alt=""
              class="temperatureImageSymbol"
            />
            <div class="highAndLow">
              <span class="maxTemp"><b>
              ${maxTemperature}°
              </b> </span
              ><span class="minTemp">
             ${minTemperature}°
              </span>
              </div>
          </div>`; }
});
  forecastHTML = forecastHTML + `</div>`;
forecastElement.innerHTML = forecastHTML; 
 };

 
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
  currentDayAndTimeElement.innerHTML = formatDate(response.data.time*1000);

  // change icon according to country
  let iconApi = response.data.condition.icon;
  let emojiElement = document.querySelector(`#emoji-symbol`);
  emojiElement.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${iconApi}.png`
  );
  
  getCoordinates(response.data.coordinates);
} 

function search(city) {
  let apiKey = `e9b13b0d14e3512d9oa0t7fdc2ebf750`;
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
  axios.get(apiUrl).then(updateWeather);
}
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

let celsiusTemperature = null;
form.addEventListener("submit", updatedCity);
search (`London`);