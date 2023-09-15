import WeatherData from "./WeatherData";

function Wind(time, place, value, type, unit, direction) {
  let weatherData = WeatherData(time, place, value, type, unit);
  const getDirection = () => direction;
  const convertToMPH = () => {
    if (unit === "m/s") {
      unit = "mph";
      value = value * 2.23694;
    }
  };
  const convertToMS = () => {
    if (unit === "mph") {
      unit = "m/s";
      value = value / 2.23694;
    }
  };

  return { ...weatherData, getDirection, convertToMPH, convertToMS };
}

export default Wind;
