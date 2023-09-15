function Event(time, place) {
  const getTime = () => time;
  const getPlace = () => place;
  return { getTime, getPlace };
}

export default Event;
