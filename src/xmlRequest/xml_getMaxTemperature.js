import Temperature from "../models/Temperature";

async function getMaxTemperature(url, city) {
  let temperatures = [];
  let measurements = [];
  let unit = "";

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
      });

      for (let index = 0; index < 24; index++) {
        let temp;
        temp = temperatures.pop();
        measurements.push(temp.getValue());
        unit = temp.getUnit();
      }

      displayMaxTemperature(measurements, unit);
    }
  };

  request.send();
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
