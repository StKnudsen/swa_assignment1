import Precipitation from "../models/Precipitation";

async function getTotalPrecipitation(url, city) {
  let precipitations = [];
  let measurements = [];
  let unit = "mm";

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
      });

      for (let index = 0; index < 24; index++) {
        let precip;
        precip = precipitations.pop();
        precip.convertToMM();
        measurements.push(precip.getValue());
      }

      displayTotalPrecipitation(measurements, unit);
    }
  };

  request.send();
}

function displayTotalPrecipitation(measurements, unit) {
  let totalValue = 0;

  measurements.forEach((value) => {
    totalValue += value;
  });

  let div = document.getElementById("x_totalPrecipitation");
  div.innerHTML = "";

  let p = document.createElement("p");

  p.textContent = `Total precipitation the last 24 hours is: ${totalValue.toFixed(
    2
  )} ${unit}`;
  div.appendChild(p);
}

export default getTotalPrecipitation;
