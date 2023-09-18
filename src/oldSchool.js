import getForecast from "./xmlRequest/xml_getForecast";
/*import getLatestMeasurements from "./xmlRequest/xml_getLatestMeasurements";
import getMinTemperature from "./xmlRequest/xml_getMinTemperature";
import getMaxTemperature from "./xmlRequest/xml_getMaxTemperature";
import getTotalPrecipitation from "./xmlRequest/xml_getTotalPrecipitation";
import getAverageWindSpeeds from "./xmlRequest/xml_getAverageWindSpeeds";*/

const city = document.querySelector("#x_city");
const url = "http://localhost:8080";
let selectedCity = "Horsens";

city.addEventListener("change", () => selectCity());

async function selectCity() {
  selectedCity = city.options[city.selectedIndex].value;

  // Show selected city
  document.getElementById("x_selectedCity").innerHTML = selectedCity;

  getForecast(url, selectedCity);
  /*getLatestMeasurements(url, selectedCity);
  getMinTemperature(url, selectedCity);
  getMaxTemperature(url, selectedCity);
  getTotalPrecipitation(url, selectedCity);
  getAverageWindSpeeds(url, selectedCity);*/
}
