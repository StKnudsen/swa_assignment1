import WeatherPrediction from "./WeatherPrediction";

function PrecipitationPrediction(
  time,
  place,
  max,
  min,
  type,
  unit,
  expectedType
) {
  let weatherPrediction = WeatherPrediction(time, place, max, min, type, unit);
  const getExpectedTypes = () => expectedType;
  const matches = (data) => {
    return Boolean(
      weatherPrediction.matches(data) &&
        expectedType.includes(data.getExpectedTypes())
    );
  };
  const convertToInches = () => {
    if (unit === "mm") {
      unit = "in";
      min = min / 25.4;
      max = max / 25.4;
    }
  };
  const convertToMM = () => {
    if (unit === "in") {
      unit = "mm";
      min = min * 25.4;
      max = max * 25.4;
    }
  };
  return {
    ...weatherPrediction,
    getExpectedTypes,
    convertToInches,
    convertToMM,
  };
}
