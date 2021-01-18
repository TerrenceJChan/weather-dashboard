var cityName = "Waterloo";
var searchValue = document.getElementById('search');
var initializeArray;
var coords;

// Initializes page
var init = function () {
    if (localStorage.getItem('recent') == null) {
        initializeArray = [];
        localStorage.setItem('recent', JSON.stringify(initializeArray));
    }

    populateRecent();

    for (x = 1; x < 6; x++) {
        let popItems = document.getElementById('pop-' + x);
        popItems.addEventListener('click', function () {
            cityName = popItems.innerText;
            console.log(cityName);
            callWeather();
        })
    }

    document.getElementById('submit-city').addEventListener('click', function () {
        cityName = searchValue.value;
        console.log(cityName);
        callWeather();
        addToRecent(cityName);
        populateRecent();
    })

    document.getElementById('search').addEventListener("keydown", function () {
        if (event.key === 'Enter') {
            cityName = searchValue.value;
            console.log(cityName);
            callWeather();
            addToRecent(cityName);
            populateRecent();
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
            // Fetch UV index
            fetch('https://api.openweathermap.org/data/2.5/uvi?lat=' + data.coord.lat + '&lon=' + data.coord.lon + '&appid=569731c1a4f5965656b996cf8ec76ae7')
                .then(function (response) {
                    return response.json();
                })
                .then(function (uvdata) {
                    let currentUV = document.getElementById('current-uv');
                    currentUV.innerText = "UV Index " + uvdata.value;
                    if (uvdata.value <= 3) {
                        currentUV.style.backgroundColor = "green";
                    } else if (uvdata.value <= 6) {
                        currentUV.style.backgroundColor = "orange";
                    } else {
                        currentUV.style.backgroundColor = "red";
                    }
                    return;
                })
                .catch(function (error) {
                    console.log('Request failed', error)
                });
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
            return;
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

// Adds city to recent list
function addToRecent(city) {
    let recentItems = JSON.parse(localStorage.getItem('recent'));
    if (recentItems.length > 4) {
        recentItems = recentItems.slice(1);
    }
    recentItems.push(city);
    localStorage.setItem('recent', JSON.stringify(recentItems));
}

// Populates recent list
function populateRecent() {
    var recentSearches = document.getElementById('recent-searches');
    var recentData = JSON.parse(localStorage.getItem('recent'));

    recentSearches.innerHTML = "";
    for (let x = 0; x < 5; x++) {
        if (recentData[x] !== undefined) {
            var newList = document.createElement('li');
            var newRecent = document.createTextNode(recentData[x]);
            newList.appendChild(newRecent);
            recentSearches.appendChild(newList).addEventListener('click', function () {
                cityName = event.target.innerText;
                callWeather();
            });
        }
    }
}

window.onload = init;


