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

git
            while (weatherInfoDiv.firstChild) {
                weatherInfoDiv.removeChild(weatherInfoDiv.firstChild);
            }


            const cityParagraph = document.createElement('p');
            cityParagraph.textContent = `Місто: ${city}`;

            const weatherParagraph = document.createElement('p');
            weatherParagraph.textContent = `Погода: ${weather}`;

            const tempParagraph = document.createElement('p');
            tempParagraph.textContent = `Температура: ${temperature} ℃`;

            const humidityParagraph = document.createElement('p');
            humidityParagraph.textContent = `Вологість: ${humidity}%`;

            const windParagraph = document.createElement('p');
            windParagraph.textContent = `Швидкість вітру: ${windSpeed} м/с`;

            weatherInfoDiv.appendChild(cityParagraph);
            weatherInfoDiv.appendChild(weatherParagraph);
            weatherInfoDiv.appendChild(tempParagraph);
            weatherInfoDiv.appendChild(humidityParagraph);
            weatherInfoDiv.appendChild(windParagraph);
        })
        .catch(error => {
            console.error(error);

            while (weatherInfoDiv.firstChild) {
                weatherInfoDiv.removeChild(weatherInfoDiv.firstChild);
            }
            const errorParagraph = document.createElement('p');
            errorParagraph.textContent = `Сталася помилка при отриманні даних для міста ${city}. Перевірте API-ключ або назву міста.`;
            weatherInfoDiv.appendChild(errorParagraph);
        });
}

refreshButton.addEventListener('click', () => {
    const selectedCity = citySelect.value;
    getWeather(selectedCity);
});


getWeather(citySelect.value);
