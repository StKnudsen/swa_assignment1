import WeatherPrediction from "./WeatherPrediction";

function CloudCoveragePrediction(time, place, max, min, type, unit) {
  let weatherPrediction = WeatherPrediction(time, place, max, min, type, unit);
  return { ...weatherPrediction };
}
