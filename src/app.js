function formatDate (timestamp) {
    let date = new Date (timestamp);
    let hours = date.getHours();
    if (hours < 10) {
        hours = `0${hours}`;
    }
    let minutes = date.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }
    let days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
let day = days[date.getDay()];
return `${day}, ${hours}:${minutes}`;
}

function displayTemperature (response) {
let temperatureElement = document.querySelector("#temperature");
let cityElement = document.querySelector("#city");
    let descriptionElement = document.querySelector("#description");
   let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
let dateElement = document.querySelector("#date");
let iconElement = document.querySelector("#icon");
  
celsiusTemperature = response.data.main.temp;


temperatureElement.innerHTML = Math.round(celsiusTemperature);
   cityElement.innerHTML = response.data.name;
   descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
dateElement.innerHTML = formatDate(response.data.dt * 1000);
iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}.png`);
iconElement.setAttribute("alt", response.data.weather[0].description);
}

function search(city) {
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=7a70d3b7b9ef2868a29c2eda310cd96b&units=metric`;
axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit (event) {
event.preventDefault();
let cityInputElement = document.querySelector("#city-input");
search(cityInputElement.value);
}


let celsiusTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

function displayFahrenheitTemperature(event) {
event.preventDefault();
celsiusLink.classList.remove("active");
fahrenheitLink.classList.add("active");
let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
let temperatureElement = document.querySelector("#temperature");
temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemperature(event) {
event.preventDefault();
fahrenheitLink.classList.remove("active");
celsiusLink.classList.add("active");
let temperatureElement = document.querySelector("#temperature");
temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

search("Lisbon");

