import Temperature from "../models/Temperature";

async function getMinTemperature(url, city) {
  let temperatures = [];
  let measurements = [];
  let unit = "";

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
  });

  for (let index = 0; index < 24; index++) {
    let temp;
    temp = temperatures.pop();
    measurements.push(temp.getValue());
    unit = temp.getUnit();
  }

  displayMinTemperature(measurements, unit);
}

function displayMinTemperature(measurements, unit) {
  let div = document.getElementById("x_minTemperature");
  div.innerHTML = "";

  let p = document.createElement("p");

  p.textContent = `Minimum temperature from the last 24 hours is: ${Math.min(
    ...measurements
  )} ${unit}`;
  div.appendChild(p);
}

export default getMinTemperature;
