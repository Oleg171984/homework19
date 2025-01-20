const apiKey = '8743029326bb6fb3381f059a850e0ae7'; 
const weatherInfoDiv = document.getElementById('weather-info');
const citySelect = document.getElementById('city-select');
const refreshButton = document.getElementById('refresh-button');


function getWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=uk`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP помилка! статус: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const weather = data.weather[0].description;
            const temperature = data.main.temp;
            const humidity = data.main.humidity;
            const windSpeed = data.wind.speed;

            weatherInfoDiv.innerHTML = `
                <p>Місто: ${city}</p>
                <p>Погода: ${weather}</p>
                <p>Температура: ${temperature} &#8451;</p>
                <p>Вологість: ${humidity}%</p>
                <p>Швидкість вітру: ${windSpeed} м/с</p>
            `;
        })
        .catch(error => {
            console.error(error);
            weatherInfoDiv.innerHTML = `<p>Сталася помилка при отриманні даних для міста ${city}. Перевірте API-ключ або назву міста.</p>`;
        });
}

refreshButton.addEventListener('click', () => {
    const selectedCity = citySelect.value;
    getWeather(selectedCity);
});


getWeather(citySelect.value);