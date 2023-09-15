// import generateText from "./generateText";
// console.log(generateText());
import Temperature from "./models/Temperature";
import Precipitation from "./models/Precipitation";
import Wind from "./models/Wind";

const city = document.querySelector("#city");
const url = "http://localhost:8080";
let selectedCity = "Horsens";

let temperatures = [];
let precipitations = [];
let windSpeeds = [];

document.getElementById("city").addEventListener("change", selectCity(), false);

async function selectCity() {
  selectedCity = city.options[city.selectedIndex].value;

  const result = await fetch(`${url}/data/${selectedCity}`, {
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
      precipitations.push(item);
    }

    if (item.type === "wind speed") {
      windSpeeds.push(item);
    }
  });

  displayTemperatures(temperatures);
  displayPrecipitations(precipitations);
  displayWindSpeeds(windSpeeds);
}

function displayTemperatures(temperatures) {
  let div = document.getElementById("temperatures");
  temperatures.map((temperature) => {
    let p = document.createElement("p");
    p.textContent = temperature.getTime();
    " " + temperature.getValue() + " " + temperature.getUnit();
    div.appendChild(p);
  });
}

function displayPrecipitations(precipitations) {
  precipitations.map((precipitation) => {
    console.log(precipitation.value);
    console.log(precipitation.unit);
  });
}

function displayWindSpeeds(windSpeeds) {
  windSpeeds.map((wind) => {
    console.log(wind.value);
    console.log(wind.unit);
  });
}
