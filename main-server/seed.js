import fetch from "node-fetch";
import fs from "fs";

async function getLocations() {
  const url = "http://localhost:8080/api/locations/";
  const data = await fetch(url).then((res) => res.json());
  console.log("done");
  console.log(data.locations);
  return data;
}

async function addLocation(lat, lng) {
  const url = "http://localhost:8080/api/locations/";
  var ok = { lat: lat, lng: lng };
  const data = await fetch(url, {
    method: "POST",
    headers: {
      "User-Agent": "*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(ok),
  });
}

function parseLocations() {
  var locations = fs.readFileSync("locations.txt");
  var arr = locations.toString().split("\n");

  arr.forEach((element) => {
    element = element.toString().split(" ");
    console.log(element[0], element[1]);
    addLocation(element[0], element[1]);
  });
}

// parseLocations();
// getLocations();

function parseNewTextFile() {
  var data = fs.readFileSync("new.txt");
  var arr = data.toString().split("\n");
  console.log(arr.length);
  arr.forEach((element) => {
    element = element.toString().split(";");
    addLocation(element[8], element[9]);
    console.log(element[8], element[9], element[6]);
  });
  console.log(arr.length);
}

// parseNewTextFile();
getLocations();
