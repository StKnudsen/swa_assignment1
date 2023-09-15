import WeatherData from "./WeatherData";

function CloudCoverage(time, place, value, type, unit) {
  let weatherData = WeatherData(time, place, value, type, unit);
  return { ...weatherData };
}
