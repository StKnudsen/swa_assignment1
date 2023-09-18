import Temperature from "../models/Temperature";
import Precipitation from "../models/Precipitation";
import Wind from "../models/Wind";

async function getLatestMeasurements(url, city) {
  let temperatures = [];
  let precipitations = [];
  let windSpeeds = [];

  const result = await fetch(`${url}/data/${city}`, {
    method: "GET",
    headers: {
      accept: "application/json",
    },
  });

  const json = await result.json();

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

function displayTemperature(temperature) {
  let div = document.getElementById("latestTemperature");
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
  let div = document.getElementById("latestPrecipitation");
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
  let div = document.getElementById("latestWind");
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
