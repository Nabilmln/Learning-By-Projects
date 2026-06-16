const inputCity = document.getElementById("city");
const searchButton = document.getElementById("searchBtn");
const result = document.getElementById("result");

searchButton.addEventListener("click", getWeather);

async function getWeather() {
    const city = inputCity.value.trim();

    if(!city){
        alert("Please enter a city name");
        return;
    }

    result.innerHTML = "Loading...";

    try {
        const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${city}`;
        const geoResponse = await fetch(geoUrl);
        const geoData = await geoResponse.json();
        const lat = geoData.results[0].latitude;
        const lon = geoData.results[0].longitude;
        
        const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;
        const weatherResponse = await fetch(weatherUrl);
        const weatherData = await weatherResponse.json();

        const temp = weatherData.current_weather.temperature;
        const windSpeed = weatherData.current_weather.windspeed;

        result.innerHTML = `
            <h2>Weather in ${city}</h2>
            <p>Temperature: ${temp}°C</p>
            <p>Wind Speed: ${windSpeed} km/h</p>
            `
    } catch (error) {
        result.innerHTML = "Error fetching weather data. Please try again.";
    }
}