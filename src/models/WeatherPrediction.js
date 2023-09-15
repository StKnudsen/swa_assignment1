import Event from "./Event";

function WeatherPrediction(time, place, max, min, type, unit) {
  let event = Event(time, place);
  const matches = (data) => {
    return Boolean(
      data.getTime() === time &&
        data.getPlace() === place &&
        data.getValue() >= min &&
        data.getValue() <= max &&
        data.getType() === type &&
        data.getUnit() === unit
    );
  };
  const getMax = () => max;
  const getMin = () => min;
  const getType = () => type;
  const getUnit = () => unit;

  return { ...event, matches, getMax, getMin, getType, getUnit };
}

export default WeatherPrediction;
