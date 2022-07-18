const form = document.querySelector("form");
const searchAddress = document.querySelector("input[type='text']");
const submitButton = document.querySelector("button");
const results = document.querySelectorAll(".result");

form.addEventListener("submit", (evt) => {
  evt.preventDefault();
  getData();
});

//Change marker design
let icon = L.icon({
  iconUrl: "./images/icon-location.svg",
});



// Map generator
let map = L.map("map")
map.setView([34.04915, -118.09462], 13);
placeholder()

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);


//Function that checks if a value has been entered.
function getData() {
  if (searchAddress.value !== "") {
    geolocation();
  }
  searchAddress.value = "";
}

//fetch API function
function geolocation() {
  let address = searchAddress.value;
  fetch(
    "https://geo.ipify.org/api/v2/country,city?apiKey=at_GIUwrgS5ZTCn4TruNJyJ8ZNLQqCaw&ipAddress=" +
      address
  )
    .then((response) => {
      if (response.status >= 200 && response.status <= 299) {
        return response.json();
      } else {
        throw Error(response.statusText);
      }
    })
    .then((data) => {
      console.log(data)
      const location = data.location.city;
      const region = data.location.region
      const postalCode = data.location.postalCode;
      const timezone = data.location.timezone;
      const isp = data.isp;
      const longitude = data.location.lng;
      const latitude = data.location.lat;

      L.marker([latitude, longitude], { icon: icon }).addTo(map).openPopup();
       map.setView([latitude, longitude], 13);
      results[0].innerHTML = address;
      results[1].innerHTML = `${location}, ${region} ${postalCode}`;
      results[2].innerHTML = `UTC${timezone}`;
      results[3].innerHTML = isp;
    
    })
    .catch(() => {
      alerts();
      results[0].innerHTML = "";
    });
}

function alerts(){
  const alertPopup = document.querySelector(".alert")
  const alertButton = document.querySelector("[data-alert]")
  alertPopup.classList.remove("hidden")
  alertButton.addEventListener("click", ()=>{
    alertPopup.classList.add("hidden")
  })
}

function placeholder(){
       L.marker([34.04915, -118.09462], { icon: icon }).addTo(map).openPopup();
       //  map.setView([34.04915, -118.09462], 13);
      results[0].innerHTML = "192.212.174.101";
      results[1].innerHTML = "South San Gabriel, California";
      results[2].innerHTML = "UTC-07:00";
      results[3].innerHTML = "Southern California Edison";
}