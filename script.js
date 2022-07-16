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
  iconUrl: './images/icon-location.svg'
})


//accessing langitude and latitude

// Map generator
let map = L.map("map").setView([51.505, -0.09], 13);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

L.marker([51.5, -0.09], {icon:icon}).addTo(map).openPopup();


function getData() {
  if (searchAddress.value !== "") {

    geolocation()
        
  }
  searchAddress.value = "";
}

function geolocation(){
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
        console.log(data);
        const location = data.location.city;
        const postalCode = data.location.postalCode
        const timezone = data.location.timezone;
        const isp = data.isp;
        const longitude = data.location.lng
        const latitude = data.location.lat


        results[0].innerHTML = address;
        results[1].innerHTML = `${location} ${postalCode}`;
        results[2].innerHTML = `UTC${timezone}`;
        results[3].innerHTML = isp;

        //adding dynamic map.
        // L.map("map").setView([latitude, longitude], 13);
        // L.marker([latitude, longitude], {icon:icon}).addTo(map).openPopup();

      })
      .catch(() => {
        alert("Enter a correct ipv4 or ipv6 address");
        results[0].innerHTML = ""
      });

}
