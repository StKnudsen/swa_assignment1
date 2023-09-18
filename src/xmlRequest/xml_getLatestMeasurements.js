import Temperature from "../models/Temperature";
import Precipitation from "../models/Precipitation";
import Wind from "../models/Wind";

async function getLatestMeasurements(url, city) {
  let temperatures = [];
  let precipitations = [];
  let windSpeeds = [];

  function reqListener() {
    console.log(this.responseText);
  }

  const request = new XMLHttpRequest();
  request.addEventListener("load", reqListener);
  request.open("GET", `${url}/data/${city}`);
  request.responseType = "text";
  request.onload = () => {
    if (request.readyState === request.DONE && request.status === 200) {
      const result = request.response;
      const json = JSON.parse(result);

      json.map((item) => {
        if (item.type === "temperature") {
          temperatures.push(
            Temperature(item.time, item.place, item.value, item.type, item.unit)
          );
        }

        if (item.type === "precipitation") {
          precipitations.push(
            Precipitation(
              item.time,
              item.place,
              item.value,
              item.type,
              item.unit,
              item.precipitation_type
            )
          );
        }

        if (item.type === "wind speed") {
          windSpeeds.push(
            Wind(
              item.time,
              item.place,
              item.value,
              item.type,
              item.unit,
              item.direction
            )
          );
        }
      });

      displayTemperature(temperatures.pop());
      displayPrecipitation(precipitations.pop());
      displayWind(windSpeeds.pop());
    }
  };

  request.send();
}

function displayTemperature(temperature) {
  let div = document.getElementById("x_latestTemperature");
  div.innerHTML = "";

  let p = document.createElement("p");
  const date = new Date(temperature.getTime());
  p.textContent = `${date.getMonth() + 1}/${date.getDate()}
      ${date.toTimeString().slice(0, 5)} >>
      ${temperature.getValue()} ${temperature.getUnit()}
      `;
  div.appendChild(p);
}

function displayPrecipitation(precipitation) {
  let div = document.getElementById("x_latestPrecipitation");
  div.innerHTML = "";

  let p = document.createElement("p");
  const date = new Date(precipitation.getTime());
  p.textContent = `${date.getMonth() + 1}/${date.getDate()}
          ${date.toTimeString().slice(0, 5)} >>
          ${precipitation.getValue()} ${precipitation.getUnit()} 
          ${precipitation.getPrecipitationType()}
          `;
  div.appendChild(p);
}

function displayWind(wind) {
  let div = document.getElementById("x_latestWind");
  div.innerHTML = "";

  let p = document.createElement("p");
  const date = new Date(wind.getTime());
  p.textContent = `${date.getMonth() + 1}/${date.getDate()}
          ${date.toTimeString().slice(0, 5)} >>
          ${wind.getValue()} 
          ${wind.getUnit()} ${wind.getDirection()}
          `;
  div.appendChild(p);
}

export default getLatestMeasurements;
