import WeatherPrediction from "./WeatherPrediction";

function WindPrediction(time, place, max, min, type, unit, directions) {
  let weatherPrediction = WeatherPrediction(time, place, max, min, type, unit);
  const getExpectedDirections = () => directions;
  const matches = (data) => {
    return Boolean(
      weatherPrediction.matches(data) &&
        directions.includes(data.getDirection())
    );
  };
  const convertToMPH = () => {
    if (unit === "m/s") {
      unit = "mph";
      min = min * 2.23694;
      max = max * 2.23694;
    }
  };
  const convertToMS = () => {
    if (unit === "mph") {
      unit = "m/s";
      min = min / 2.23694;
      max = max / 2.23694;
    }
  };

  return {
    ...weatherPrediction,
    getExpectedDirections,
    convertToMPH,
    convertToMS,
  };
}
