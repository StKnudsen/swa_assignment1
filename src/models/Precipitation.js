import WeatherData from "./WeatherData";

function Precipitation(time, place, value, type, unit, precipitationType) {
  let weatherData = WeatherData(time, place, value, type, unit);
  const getPrecipitationType = () => precipitationType;
  const convertToInches = () => {
    if (unit === "mm") {
      unit = "in";
      value = value / 25.4;
    }
  };
  const convertToMM = () => {
    if (unit === "in") {
      unit = "mm";
      value = value * 25.4;
    }
  };
  return { ...weatherData, getPrecipitationType, convertToInches, convertToMM };
}

export default Precipitation;
