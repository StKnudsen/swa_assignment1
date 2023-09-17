import getForecast from "./getForecast";
import getLatestMeasurements from "./getLatestMeasurements";

const city = document.querySelector("#city");
const url = "http://localhost:8080";
let selectedCity = "Horsens";

city.addEventListener("change", () => selectCity());

async function selectCity() {
  selectedCity = city.options[city.selectedIndex].value;

  // Show selected city
  document.getElementById("selectedCity").innerHTML = selectedCity;

  getForecast(url, selectedCity);
  getLatestMeasurements(url, selectedCity);
}
