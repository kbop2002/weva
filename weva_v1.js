// Function to create a weather card
function createCard(weatherData) {
    const card = document.createElement('div');
    card.classList.add('card');
    if(weatherData.location.country == 'United States of America'){
        card.innerHTML = `
        <h2>${weatherData.location.name}, ${weatherData.location.region}</h2>
        <p>${weatherData.current.temp_f}°F</p>
        <p>${weatherData.location.localtime}</p>
        <img src="https:${weatherData.current.condition.icon}" alt="${weatherData.current.condition.text}">
    `;
    }else{
        card.innerHTML = `
        <h2>${weatherData.location.name}, ${weatherData.location.country}</h2>
        <p>${weatherData.current.f}°F</p>
        <p>${weatherData.location.localtime}</p>
        <img src="https:${weatherData.current.condition.icon}" alt="${weatherData.current.condition.text}">
    `;
        

    }

    // Check if forecastday is present and has at least one entry
    if (weatherData.forecast && weatherData.forecast.forecastday && weatherData.forecast.forecastday.length > 0) {
        // Access the first forecastday and its day object
        const firstForecastDay = weatherData.forecast.forecastday[0];
        const day = firstForecastDay.day;
        if (day) {
            card.innerHTML += `
                <p>High: ${day.maxf}°F | Low: ${day.minf}°F</p>
            `;
        }
    }
    return card;
}



        // Function to display weather cards in a carousel
        async function displayWeatherCarousel(weatherData) {
            const carousel = document.getElementById('weather-carousel');
            const card = createCard(weatherData);
            carousel.appendChild(card);
        }

// Function to fetch weather data for a given location
async function fetchWeather(location) {
    const apiKey = '9dd9371a0b054552ab2162937241306';
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}&aqi=no`;
    console.log('Fetching weather data from:', url);
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Failed to fetch weather data');
        }
        const data = await response.json();
        console.log('Weather data:', data);
        return data;
    } catch (error) {
        console.error('Error fetching weather data:', error);
        throw error;
    }
}

// Function to get user's IP address
async function getIP() {
    try {
        const response = await fetch('https://api64.ipify.org?format=json');
        if (!response.ok) {
            throw new Error('Failed to fetch IP address');
        }
        const data = await response.json();
        const ip = data.ip;
        console.log('User IP address:', ip);
        const weatherData = await fetchWeather(ip);
        displayWeatherCarousel(weatherData);
    } catch (error) {
        console.error('Error fetching IP:', error);
    }
}

// Function to display weather card for user's current location
async function push_search() {
    const location = document.getElementById('Search').value;
    console.log('Searching weather for location:', location);
    try {
        const weatherData = await fetchWeather(location);
        displayWeatherCarousel(weatherData);
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}