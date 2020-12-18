const output = document.querySelector("#output");
async function getData(location, units) {
  try {
    const response = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=40b3120ab87ca706d45e437d4ec5bee3&units=${units}`
    );
    let data = await response.json();
    data = processData(data);
    displayData(data, units);
  } catch (error) {
    console.log("Error: " + error);
  }
}

function processData(data) {
  return {
    name: data.name,
    temp: data.main.temp,
    feels_like: data.main.feels_like,
    main: data.weather[0].main,
    humidity: data.main.humidity,
    wind: data.wind.speed,
  };
}

function displayData(data, units) {
  for (let key in data) {
    const el = document.querySelector(`#${key}`);
    data[key] = addSuffixes(key, data[key], units);
    el.textContent = data[key];
  }
}

//Returns new value with suffix added on
function addSuffixes(key, value, units) {
  switch(key) {
    case 'temp':
      value = value + ((units==='metric') ? ' °C' : ' °F');
      break;
    case 'feels_like':
      value = 'Feels like: ' + value + ((units==='metric') ? ' °C' : ' °F');
      break;
    case 'wind':
      value = 'Wind: ' + value + ((units==='metric') ? ' km/h' : ' mph');
      break;
    case 'humidity':
      value = 'Humidity: ' + value + '%';
      break;
  }
  return value;
}

function processForm() {
  const location = document.querySelector("#location").value;
  let unit;
  const units = document.getElementsByName("unit").forEach((el) => {
    if (el.checked) {
      unit = el.value;
    }
  });
  unit = (unit == "celsius") ? "metric" : "imperial";
  getData(location, unit);
}

window.onload = function() {
  getData('New York City', 'imperial')
}
