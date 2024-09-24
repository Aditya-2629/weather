let errorHandle = document.querySelector(".errorHandle");

// weather main data

let cityName = document.querySelector(".weather_city");
let dateTime = document.querySelector(".weather_date_time");
let forecast = document.querySelector(".weather_forecast");
let icon = document.querySelector(".weather_icon");
let temperature = document.querySelector(".weather_temperature");
let minTem = document.querySelector(".weather_min");
let maxTem = document.querySelector(".weather_max");

// weather extra data

let feelsLike = document.querySelector(".weather_feelsLike");
let humidity = document.querySelector(".weather_humidity");
let w_wind = document.querySelector(".weather_wind");
let pressure = document.querySelector(".weather_pressure");

let citySearch = document.querySelector(".weather_search");

let city = "palanpur";

// getting country name by code

const getCountryName = (code) => {
  return new Intl.DisplayNames([code], { type: "region" }).of(code);
};

// getting date and time in a format

const getDateTime = (dt) => {
  const curDate = new Date(dt * 1000);
  console.log(curDate);

  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };

  const formatter = new Intl.DateTimeFormat("en-GB", options);
  console.log(formatter);
  return formatter.format(curDate);
};

// searching city functionality

citySearch.addEventListener("submit", (e) => {
  e.preventDefault();

  let cityName = document.querySelector(".city_name");
  city = cityName.value;

  getWeatherData();

  cityName = "";
});

const getWeatherData = async () => {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=09737326d5dea1eba6e8a5b2ad04c62d&units=metric`;
  try {
    const res = await fetch(apiUrl);
    const data = await res.json();
    console.log(data);

    const { main, name, weather, wind, sys, dt } = data;

    cityName.innerHTML = `${name} , ${getCountryName(sys.country)} `;
    dateTime.innerHTML = getDateTime(dt);
    forecast.innerHTML = ` ${weather[0].main}`;
    icon.innerHTML = `<img src="http://openweathermap.org/img/wn/${weather[0].icon}@4x.png" />`;
    temperature.innerHTML = `${main.temp.toFixed()}°C`;
    minTem.innerHTML = `Min: ${main.temp_min.toFixed()}°C`;
    maxTem.innerHTML = `Max: ${main.temp_max.toFixed()}°C`;
    feelsLike.innerHTML = `${main.feels_like.toFixed()}°C`;
    humidity.innerHTML = `${main.humidity} %`;
    w_wind.innerHTML = `${(wind.speed * 3.6).toFixed(2)}  km/h`;
    pressure.innerHTML = `${main.pressure} hpa`;
  } catch (error) {
    console.log(error);
  }
};

document.body.addEventListener("load", getWeatherData());
