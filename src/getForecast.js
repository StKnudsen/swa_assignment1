import TemperaturePrediction from "./models/TemperaturePrediction";
import PrecipitationPrediction from "./models/PrecipitationPrediction";
import WindPrediction from "./models/WindPrediction";

async function getForecast(url, city) {
  let temperatures = [];
  let precipitations = [];
  let windSpeeds = [];

  const result = await fetch(`${url}/forecast/${city}`, {
    method: "GET",
    headers: {
      accept: "application/json",
    },
  });

  const json = await result.json();

  json.map((item) => {
    if (item.type === "temperature") {
      temperatures.push(
        TemperaturePrediction(
          item.time,
          item.place,
          item.to,
          item.from,
          item.unit
        )
      );
    }

    if (item.type === "precipitation") {
      precipitations.push(
        PrecipitationPrediction(
          item.time,
          item.place,
          item.to,
          item.from,
          item.precipitation_types[0],
          item.unit,
          item.precipitation_types
        )
      );
    }

    if (item.type === "wind speed") {
      windSpeeds.push(
        WindPrediction(
          item.time,
          item.place,
          item.to,
          item.from,
          item.type,
          item.unit,
          item.directions
        )
      );
    }
  });

  displayTemperatures(temperatures);
  displayPrecipitation(precipitations);
  displayWinds(windSpeeds);
}

function displayTemperatures(temperatures) {
  let div = document.getElementById("temperatures");
  div.innerHTML = "";

  temperatures.map((temperature) => {
    let p = document.createElement("p");
    const date = new Date(temperature.getTime());
    p.textContent = `${date.getMonth() + 1}/${date.getDate()}
      ${date.toTimeString().slice(0, 5)} >>
      ${temperature.getMin()} to ${temperature.getMax()} ${temperature.getUnit()}
      `;
    div.appendChild(p);
  });
}

function displayPrecipitation(precipitations) {
  let div = document.getElementById("precipitation");
  div.innerHTML = "";

  precipitations.map((precipitation) => {
    let p = document.createElement("p");
    const date = new Date(precipitation.getTime());
    p.textContent = `${date.getMonth() + 1}/${date.getDate()}
        ${date.toTimeString().slice(0, 5)} >>
        ${precipitation.getMin()} to ${precipitation.getMax()} 
        ${precipitation.getUnit()} ${precipitation.getExpectedTypes()}
        `;
    div.appendChild(p);
  });
}

function displayWinds(windSpeeds) {
  let div = document.getElementById("winds");
  div.innerHTML = "";

  windSpeeds.map((wind) => {
    let p = document.createElement("p");
    const date = new Date(wind.getTime());
    p.textContent = `${date.getMonth() + 1}/${date.getDate()}
          ${date.toTimeString().slice(0, 5)} >>
          ${wind.getMin()} to ${wind.getMax()} 
          ${wind.getUnit()} ${wind.getExpectedDirections()}
          `;
    div.appendChild(p);
  });
}

export default getForecast;
