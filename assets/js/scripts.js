var cityName;
var searchValue = document.getElementById('search');
var currentData;

var init = function () {
    searchValue.addEventListener('submit', function () {
        cityName = searchValue.value;
        console.log(cityName);
    })
    callWeather();
}

// Fetch request for CURRENT WEATHER
function callWeather(calllback) {
    currentData = fetch('https://api.openweathermap.org/data/2.5/weather?q=Waterloo&appid=569731c1a4f5965656b996cf8ec76ae7')
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            document.getElementById('current-weather').innerText = data.weather[0].main;
        })
        .catch(function (error) {
            console.log('Request failed', error)
        });
    console.log(currentData);
}


window.onload = init;


