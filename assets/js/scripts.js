var cityName = "Waterloo";
var searchValue = document.getElementById('search');

var init = function () {
    document.getElementById('submit-city').addEventListener('click', function () {
        cityName = searchValue.value;
        console.log(cityName);
        callWeather();
    })

    document.getElementById('search').addEventListener("keydown", event => {
        if (event.key === 'Enter') {
            cityName = searchValue.value;
            console.log(cityName);
            callWeather();
        }
    });

    callWeather();
}


function callWeather(calllback) {
    // Fetch request for CURRENT WEATHER
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&appid=569731c1a4f5965656b996cf8ec76ae7&units=metric')
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            let today = new Date();
            let date = (today.getMonth() + 1) + '-' + today.getDate() + '-' + today.getFullYear();
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

    // Fetch request for 5-DAY FORECAST
    fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + cityName + '&appid=569731c1a4f5965656b996cf8ec76ae7&units=metric')
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            for (i = 1; i < 6; i++) {
                let jsonNum = i * 8 - 2;

                let targetDate = new Date();
                targetDate.setDate(targetDate.getDate() + i);
                let date = (targetDate.getMonth() + 1) + '-' + targetDate.getDate() + '-' + targetDate.getFullYear();

                document.getElementById('future-' + i + '-date').innerText = date;
                document.getElementById('future-' + i + '-weather').innerText = "There is " + data.list[jsonNum].weather[0].description + " outside.";
                document.getElementById('future-' + i + '-temp').innerText = "Temperature is " + data.list[jsonNum].main.temp + "°C";
                document.getElementById('future-' + i + '-humidity').innerText = "Humidity is " + data.list[jsonNum].main.humidity + "%";
                document.getElementById('future-' + i + '-wind').innerText = "Current wind speeds are " + data.list[jsonNum].wind.speed + "km/h.";
                document.getElementById('future-' + i + '-icon').innerHTML = "<img src=\"http://openweathermap.org/img/w/" + data.list[jsonNum].weather[0].icon + ".png\">";
            }
        })
        .catch(function (error) {
            console.log('Request failed', error)
        });
}


window.onload = init;


