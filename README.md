Weather Dashboard
Project Overview
The Weather Dashboard is a web application that allows users to view real-time weather information for any city in the world. The app uses the OpenWeatherMap API to fetch weather data such as temperature, humidity, wind speed, and weather conditions. It also includes a geolocation feature that automatically detects the user’s location and displays the weather for their current location upon launching the app.

Features
Real-time Weather Data: Provides live weather updates for any city.
Geolocation: Automatically detects the user’s location and displays weather information without any input.
Search Functionality: Users can manually search for weather data in any city worldwide.
Error Handling: Displays a user-friendly error message if the city entered is invalid.
Responsive Design: Optimized for different screen sizes, ensuring a seamless experience on both mobile and desktop devices.
Technologies Used
HTML5: For structuring the application.
CSS3: For styling and responsive design using Flexbox and media queries.
JavaScript (ES6): For API integration, geolocation, and dynamic updates.
OpenWeatherMap API: To fetch real-time weather data.
How It Works
When the app loads, it automatically retrieves the user's current location using the browser’s Geolocation API.
The app then uses reverse geocoding to convert the latitude and longitude coordinates into a city name.
The OpenWeatherMap API is called to fetch the weather data for that city, and the information is displayed on the dashboard.
Users can also search for weather data in other cities by typing the city name into the search bar.
If an invalid city name is entered, an error message is displayed.