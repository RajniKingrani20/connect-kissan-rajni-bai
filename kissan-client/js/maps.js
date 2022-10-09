// fO56C9HCbRktLBKD7vpk

const addressElement = document.getElementById("address");

const key = "fO56C9HCbRktLBKD7vpk";
let currentLocation = {
  lat: 0,
  lng: 0,
};
function getCurrentLocation() {
  var lt, lg;
  navigator.geolocation.getCurrentPosition((success) => {
    let { latitude, longitude } = success.coords;
    localStorage.setItem("lat", success.coords.latitude);
    localStorage.setItem("lng", success.coords.longitude);
  });
}

async function getAddressByReverseGeoCoding(lng, lat) {
  const url = `http://localhost:8080/api/geocoding/${lat}/${lng}`;
  const data = await fetch(url).then((res) => res.json());
  localStorage.setItem("address", data.place_name);
  return data.place_name;
}

function generateLink() {
  const linkEl = document.getElementById("locationlink");
  linkEl.href = `http://maps.google.com/?q=${sessionStorage.getItem(
    "poplat"
  )},${sessionStorage.getItem("poplng")}`;
  console.log(
    `http://maps.google.com/?q=${sessionStorage.getItem(
      "poplat"
    )},${sessionStorage.getItem("poplng")}`
  );
}

function popUpSetUp(obj) {
  obj.on("open", function () {
    var address = getAddressByReverseGeoCoding(
      obj.getLngLat().lat,
      obj.getLngLat().lng
    );

    sessionStorage.setItem("poplat", obj.getLngLat().lat);
    sessionStorage.setItem("poplng", obj.getLngLat().lng);

    console.log(
      "session: ",
      sessionStorage.getItem("poplat"),
      sessionStorage.getItem("poplng")
    );

    obj.setText(localStorage.getItem("address"));
    addressElement.innerText = localStorage.getItem("address");
    generateLink();
  });
}

getCurrentLocation();

const map = new maplibregl.Map({
  container: "map", // container id
  style: `https://api.maptiler.com/maps/streets/style.json?key=${key}`, // style URL
  center: [localStorage.getItem("lng"), localStorage.getItem("lat")], // starting position [lng, lat]
  zoom: 15, // starting zoom
});

map.addControl(new maplibregl.NavigationControl(), "top-right");

async function getLocations() {
  const url = "http://localhost:8080/api/locations/";
  const data = await fetch(url).then((res) => res.json());
  console.log("done");
  data.locations.forEach((element) => {
    var n = new maplibregl.Marker()
      .setLngLat([element.lng, element.lat])
      .setPopup(new maplibregl.Popup().setText("jdh")) // add popup
      .addTo(map);
    popUpSetUp(n.getPopup());
  });

  return data;
}

// getLocations();

// addting multiple markers
var ghotki = new maplibregl.Marker()
  .setLngLat([69.3235, 28.0271])
  .setPopup(new maplibregl.Popup().setHTML("<h1>Ghotki</h1>")) // add popup
  .addTo(map);

// adding current location marker
var currentLocationMarker = new maplibregl.Marker({
  color: "#FFA500",
})
  .setLngLat([localStorage.getItem("lng"), localStorage.getItem("lat")])
  .setPopup(new maplibregl.Popup().setHTML("<h1>Current Location</h1>")) // add popup
  .addTo(map);

const { lat, lng } = currentLocationMarker.getLngLat();
console.log(lat, lng);

async function getCurrentLocationAddressText(lng, lat) {
  console.log("in func: ", lat, lng);
  const url = `http://localhost:8080/api/geocoding/${lat}/${lng}`;
  const data = await fetch(url).then((res) => res.json());
  console.log(data.place_name);
  localStorage.setItem("currentaddress", data.place_name);
}

getCurrentLocationAddressText(lat, lng);

const currentLocationEl = document.getElementById("current-text");
currentLocationEl.innerText = localStorage.getItem("currentaddress");

var curpop = currentLocationMarker.getPopup();
curpop.on("open", function (e) {
  console.log("current location marker popup opened");
  popUpSetUp(curpop);
});

// const linkEl = document.getElementById("locationlink");
// linkEl.href = `http://maps.google.com/?q=${sessionStorage.getItem(
//   "poplat"
// )},${sessionStorage.getItem("poplng")}`;
// console.log(
//   `http://maps.google.com/?q=${sessionStorage.getItem(
//     "poplat"
//   )},${sessionStorage.getItem("poplng")}`
// );
// toggling up current location pop up icon
currentLocationMarker.togglePopup(); // return the popup instance
// Initialize the geolocate control.

map.on("load", function () {
  getLocations();
});
