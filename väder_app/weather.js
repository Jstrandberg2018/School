async function fetchWeather() {
    const lat = document.getElementById('latInput').value;
    const lon = document.getElementById('lonInput').value;
    const lang = document.getElementById('lang').value;
    const apiKey = 'ab5e0302f76044133da28d5957097e39';

    if (!lat || !lon) {
        alert('Please enter both latitude and longitude!');
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&lang=${lang}&appid=${apiKey}&units=metric`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);

        document.getElementById('weatherInfo').innerHTML = `
            <h2>${data.name}</h2>
            <p>Temperatur: ${data.main.temp}°C</p>
            <p>Väder: ${data.weather[0].description}</p>
        `;
    } catch (error) {
        console.error('Error:', error);
    }
}