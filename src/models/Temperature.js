import WeatherData from "./WeatherData";

function Temperature(time, place, value, type, unit) {
  let weatherData = WeatherData(time, place, value, type, unit);
  const convertToF = () => {
    if (unit === "C") {
      unit = "F";
      value = value * 1.8 + 32;
    }
  };
  const convertToC = () => {
    if (unit === "F") {
      unit = "C";
      value = value - (32 * 5) / 9;
    }
  };

  return { ...weatherData, convertToF, convertToC };
}

export default Temperature;
