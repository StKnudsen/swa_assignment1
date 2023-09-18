import getForecast from "./fetch/getForecast";
import getLatestMeasurements from "./fetch/getLatestMeasurements";
import getMinTemperature from "./fetch/getMinTemperature";
import getMaxTemperature from "./fetch/getMaxTemperature";
import getTotalPrecipitation from "./fetch/getTotalPrecipitation";
import getAverageWindSpeeds from "./fetch/getAverageWindSpeeds";

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
  getMinTemperature(url, selectedCity);
  getMaxTemperature(url, selectedCity);
  getTotalPrecipitation(url, selectedCity);
  getAverageWindSpeeds(url, selectedCity);
}
