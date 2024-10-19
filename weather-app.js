// API key for OpenWeatherMap
const apiKey = "3bacb3445e1577d8b34b4c2ddf4aa94b";

// Base URL for OpenWeatherMap API, returning metric units
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

// Select the input, button, and weather icon elements
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

// On page load, get the user's location if supported
window.addEventListener('load', () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    } else {
        alert("Geolocation is not supported by this browser.");
    }
});

// Function triggered when geolocation is successful
function onSuccess(position) {
    const { latitude, longitude } = position.coords; // Extract latitude and longitude
    getCityName(latitude, longitude); // Use coordinates to get the city name
}

// Handle geolocation errors
function onError(error) {
    searchBox.placeholder = "Enter city name manually"; // Allow manual input if geolocation fails
    searchBox.disabled = false;
    alert("Unable to retrieve your location. Please search manually.");
}

// Use reverse geocoding to get the city name from coordinates
async function getCityName(lat, lon) {
    const reverseGeoUrl = `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${apiKey}`;
    const response = await fetch(reverseGeoUrl);
    const data = await response.json();

    if (data && data.length > 0) {
        const city = data[0].name;  // Get the city name from response
        searchBox.value = city;     // Display city name in input field
        checkWeather(city);         // Automatically check weather for the city
    } else {
        alert("Unable to retrieve city information.");
    }
}

// Fetch and display weather data for the given city
async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if (response.status == 404) {
        document.querySelector(".error").style.display = "block";  // Show error if city not found
        document.querySelector(".weather").style.display = "none";
    } else {
        const data = await response.json();

        // Update the UI with weather data
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

        // Update the weather icon based on the condition
        const weatherCondition = data.weather[0].main;
        if (weatherCondition == "Clouds") {
            weatherIcon.src = "images/clouds.png";
        } else if (weatherCondition == "Clear") {
            weatherIcon.src = "images/clear.png";
        } else if (weatherCondition == "Rain") {
            weatherIcon.src = "images/rain.png";
        } else if (weatherCondition == "Drizzle") {
            weatherIcon.src = "images/drizzle.png";
        } else if (weatherCondition == "Mist") {
            weatherIcon.src = "images/mist.png";
        }

        // Display the weather data and hide any error messages
        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";
    }
}

// Event listener for the search button to fetch weather based on user input
searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value); // Call checkWeather when search button is clicked
});
