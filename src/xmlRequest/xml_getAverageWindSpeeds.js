import Wind from "../models/Wind";

async function getAverageWindSpeeds(url, city) {
  let windSpeeds = [];
  let measurements = [];
  let unit = "m/s";

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

      for (let index = 0; index < 24; index++) {
        let wind;
        wind = windSpeeds.pop();
        wind.convertToMS();
        measurements.push(wind.getValue());
      }

      displayAverageWindSpeeds(measurements, unit);
    }
  };

  request.send();
}

function displayAverageWindSpeeds(measurements, unit) {
  let averageValue = 0;

  measurements.forEach((value) => {
    averageValue += value;
  });

  averageValue = averageValue / 24;

  let div = document.getElementById("x_averageWindSpeeds");
  div.innerHTML = "";

  let p = document.createElement("p");

  p.textContent = `Average wind speeds the last 24 hours is: ${averageValue.toFixed(
    2
  )} ${unit}`;
  div.appendChild(p);
}

export default getAverageWindSpeeds;
