let container = document.querySelector(".container"); 
let search_input = document.querySelector(".input");
let search_button = document.querySelector(".button");
let weather_icon = document.querySelector(".rain");

const apikey = "43b11960b3ea439aa8f54ea8d2aefd1c"; 

const apilink = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

async function showWeather(city) {
    try {
        const response = await fetch(apilink + city + `&appid=${apikey}`);

        if (response.status === 404) {
            alert("Error: City not found. Please check the spelling.");
            return;
        }

        if (response.status === 401) {
            alert("Error: Invalid or inactive API key. Please wait for the key to activate.");
            return;
        }

        const data = await response.json();
        
        const wind_speed_kmh = (data.wind.speed * 3.6).toFixed(1); 
        
        document.querySelector(".h3").textContent = data.name;
        document.querySelector(".h2").textContent = `${Math.round(data.main.temp)}°C`;
        document.querySelector(".p1").textContent = `${data.main.humidity}%`;
        document.querySelector(".p4").textContent = `${wind_speed_kmh} Km/h`;

        const weatherCondition = data.weather[0].main.toLowerCase();

        if (weatherCondition === "clouds") {
            weather_icon.src = "/weather-app-img/images/clouds.png";
        } else if (weatherCondition === "clear") {
            weather_icon.src = "/weather-app-img/images/clear.png";
        } else if (weatherCondition === "rain") {
            weather_icon.src = "/weather-app-img/images/rain.png";
        } else if (weatherCondition === "drizzle") {
            weather_icon.src = "/weather-app-img/images/drizzle.png";
        } else if (weatherCondition === "mist" || weatherCondition === "haze" || weatherCondition === "fog") {
            weather_icon.src = "/weather-app-img/images/mist.png";
        } else if (weatherCondition === "snow") {
            weather_icon.src = "/weather-app-img/images/snow.png";
        } else {
            weather_icon.src = "/weather-app-img/images/clear.png"; 
        }

    } catch (error) {
        console.error("Fetch error:", error);
        alert("An unexpected error occurred. Please check the console for details.");
    }
}

search_button.addEventListener("click", function () {
    const city = search_input.value.trim();
    if (city) {
        showWeather(city);
        search_input.value = ""; 
    } else {
        alert("Please enter a city name.");
    }
});

search_input.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        search_button.click();
    }
});

showWeather("London");