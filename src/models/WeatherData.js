import Event from "./Event";

function WeatherData(time, place, value, type, unit) {
  let event = Event(time, place);
  const getValue = () => value;
  const getType = () => type;
  const getUnit = () => unit;

  return { ...event, getValue, getType, getUnit };
}

export default WeatherData;
