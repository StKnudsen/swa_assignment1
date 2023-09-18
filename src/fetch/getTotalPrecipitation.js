import Precipitation from "../models/Precipitation";

async function getTotalPrecipitation(url, city) {
  let precipitations = [];
  let measurements = [];
  let unit = "mm";

  const result = await fetch(`${url}/data/${city}`, {
    method: "GET",
    headers: {
      accept: "application/json",
    },
  });

  const json = await result.json();

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

function displayTotalPrecipitation(measurements, unit) {
  let totalValue = 0;

  measurements.forEach((value) => {
    totalValue += value;
  });

  let div = document.getElementById("totalPrecipitation");
  div.innerHTML = "";

  let p = document.createElement("p");

  p.textContent = `Total precipitation the last 24 hours is: ${totalValue.toFixed(
    2
  )} ${unit}`;
  div.appendChild(p);
}

export default getTotalPrecipitation;
