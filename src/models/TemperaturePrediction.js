import WeatherPrediction from "./WeatherPrediction";

function TemperaturePrediction(time, place, max, min, type, unit) {
  let weatherPrediction = WeatherPrediction(time, place, max, min, type, unit);
  const convertToF = () => {
    if (unit === "C") {
      unit = "F";
      max = max * 1.8 + 32;
      min = min * 1.8 + 32;
    }
  };
  const convertToC = () => {
    if (unit === "F") {
      unit = "C";
      max = max - (32 * 5) / 9;
      min = min - (32 * 5) / 9;
    }
  };

  return { ...weatherPrediction, convertToF, convertToC };
}
