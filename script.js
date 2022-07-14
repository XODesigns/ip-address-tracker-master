const form = document.querySelector("form")

form.addEventListener("click", (evt)=>{
    evt.preventDefault()
})


let map = L.map('map').setView([51.505, -0.09], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

L.marker([51.5, -0.09]).addTo(map).openPopup();
