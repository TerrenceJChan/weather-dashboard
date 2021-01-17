var cityName;
var searchValue = document.getElementById('search');

var init = function () {
    searchValue.addEventListener('submit', function () {
        cityName = searchValue.value;
        console.log(cityName);
    })
    callWeather();
}

// Fetch request for CURRENT WEATHER
function callWeather(calllback) {
    fetch('https://api.openweathermap.org/data/2.5/weather?q=Waterloo&appid=569731c1a4f5965656b996cf8ec76ae7&units=metric')
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            let today = new Date();
            let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
            document.getElementById('city-name').innerText = data.name;
            document.getElementById('current-date').innerText = date;
            document.getElementById('current-weather').innerText = "There is " + data.weather[0].description + " outside.";
            document.getElementById('current-temp').innerText = "Temperature is " + data.main.temp + "°C";
            document.getElementById('current-humidity').innerText = "Humidity is " + data.main.humidity + "%";
            document.getElementById('current-wind').innerText = "Current wind speeds are " + data.wind.speed + "km/h.";
            document.getElementById('current-uv').innerText = "The UV index is:";
            document.getElementById('current-icon').innerHTML = "<img src=\"http://openweathermap.org/img/w/" + data.weather[0].icon + ".png\">";
        })
        .catch(function (error) {
            console.log('Request failed', error)
        });
}


window.onload = init;


