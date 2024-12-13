const button = document.getElementById('getLocationBtn');
const output = document.getElementById('output');

const cityName = document.getElementById('city-name');
const cityTime = document.getElementById('city-time');
const cityTemp = document.getElementById('city-temp');

async function getData(lati, longi) {
  const promise = await fetch(`http://api.weatherapi.com/v1/current.json?key=7798ad4ac2da420fa2d173205241212&q=${lati},${longi}&aqi=yes`);
  return await promise.json();
}

button.addEventListener('click', async ()=>{
  navigator.geolocation.getCurrentPosition(
    async (position) => {
      const { latitude, longitude } = position.coords;
      output.textContent = `Latitude: ${latitude}, Longitude: ${longitude}`;
      const result = await getData(latitude, longitude);
      console.log(result);
      cityName.innerText = `${result.location.name}, ${result.location.region}, ${result.location.country}`
      cityTime.innerText = result.location.localtime;
      cityTemp.innerText = `${result.current.temp_c} Celcius`;
    }
  );
})