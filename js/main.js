document.getElementById('getWeather').addEventListener('click', function() {
  const location = document.getElementById('location').value || "";
  const apiKey = '791e16718efbc4aa7991917aa490e213';

  // Display the current date
  const currentDate = new Date();
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  document.getElementById('currentDate').innerText = currentDate.toLocaleDateString(undefined, options);

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch weather data');
      }
      return response.json();
    })
    .then(data => {
      if (data && data.main && data.weather && data.weather[0]) {
        const iconElement = document.getElementById('cloudIcon');
        if (data.weather[0].main === "Clouds") {
          iconElement.className = "fas fa-cloud";
        } else if (data.weather[0].main === "Clear") {
          iconElement.className = "fas fa-sun";
          iconElement.style.color = "#FFD700"; // Golden color for the sun icon
        } else if (data.weather[0].main === "Rain") {
          iconElement.className = "fas fa-cloud-rain";
          iconElement.style.color = "#3498db"; // Reset color
        } else {
          iconElement.style.color = "#3498db"; // Reset color for other conditions
        }

        document.getElementById('cityName').innerText = data.name || 'N/A';
        document.getElementById('temperature').innerText = `${data.main.temp}°C` || 'N/A';
        document.getElementById('description').innerText = data.weather[0].description || 'N/A';
        document.getElementById('humidity').innerText = `${data.main.humidity}%`;
        document.getElementById('windSpeed').innerText = `${data.wind.speed} m/s`;

        // Make the weather display visible
        document.getElementById('weatherDisplay').classList.add('active');
      } else {
        alert('Weather data is incomplete or unavailable for this location.');
      }
    })
    .catch(error => {
      console.error("Error fetching weather data:", error);
      alert('Error fetching weather data. Please try again.');
    });
});
