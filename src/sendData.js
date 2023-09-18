import Temperature from "./models/Temperature";

const url = "http://localhost:8080";
const submit = document.addEventListener("submit", () => submitForm());

function submitForm() {
  console.log("nej nej nej");

  var formData = new FormData(document.getElementById("temperatureform"));

  var temp = new Temperature(
    formData.get("time"),
    formData.get("city"),
    formData.get("temperature"),
    "temperature",
    formData.get("temp_unit")
  );
 
  /*
  const json = JSON.parse(temp);
  console.log(json);*/

  json =  '[{"value":-3.1,"type":"temperature","unit":"C","time":"2023-09-10T22:00:00.000Z","place":"Aarhus"}]'
  
  // med XML request
  /* var xml = new XMLHttpRequest();
  xml.onload = function () {
    alert(xml.responseText);
  };
  xml.open(formData.method, formData.getAttribute("action"));
  xml.send(new FormData(formData));
  return false;*/
}
