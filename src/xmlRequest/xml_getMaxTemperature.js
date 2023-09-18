import Temperature from "../models/Temperature";

async function getMaxTemperature(url, city) {
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

  displayMaxTemperature(measurements, unit);
}

function displayMaxTemperature(measurements, unit) {
  let div = document.getElementById("x_maxTemperature");
  div.innerHTML = "";

  let p = document.createElement("p");

  p.textContent = `Maximum temperature from the last 24 hours is: ${Math.max(
    ...measurements
  )} ${unit}`;
  div.appendChild(p);
}

export default getMaxTemperature;
