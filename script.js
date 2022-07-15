const form = document.querySelector("form");
// const ipAdress = document.querySelector(".ip");
// const locationAddress = document.querySelector(".location");
// const timezone = document.querySelector(".timezone");
// const isp = document.querySelector(".isp");
const searchAddress = document.querySelector("input[type='text']");
const submitButton = document.querySelector("button");
const results = document.querySelectorAll(".result");

form.addEventListener("submit", (evt) => {
  evt.preventDefault();
  if (searchAddress.value !== "") {
    results[0].innerHTML = searchAddress.value;
  }
  searchAddress.value = "";
});

// Map generator
let map = L.map("map").setView([51.505, -0.09], 13);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

L.marker([51.5, -0.09]).addTo(map).openPopup();

// submitButton.addEventListener("click", () => {
//   // if(submitAddress !== ""){
//   // }
// });
