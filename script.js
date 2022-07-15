const form = document.querySelector("form");
const searchAddress = document.querySelector("input[type='text']");
const submitButton = document.querySelector("button");
const results = document.querySelectorAll(".result");

form.addEventListener("submit", (evt) => {
  evt.preventDefault();
  getData();
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

function getData() {
  if (searchAddress.value !== "") {
    results[0].innerHTML = searchAddress.value;

    let address = searchAddress.value;

    fetch(
      "https://geo.ipify.org/api/v2/country?apiKey=at_GIUwrgS5ZTCn4TruNJyJ8ZNLQqCaw&ipAddress=" +
        address
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const location = data.location.region;
        const timezone = data.location.timezone;
        const isp = data.isp;
        console.log(data.code)
        
        results[1].innerHTML = location;
        results[2].innerHTML = timezone;
        results[3].innerHTML = isp;
      });
      
  }
  searchAddress.value = "";
}
