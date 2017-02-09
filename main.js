var posHolder = document.querySelector('#position');

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        posHolder.innerHTML = "Geolocation is not supported by this browser.";
    }
}
function showPosition(position) {
    posHolder.innerHTML = "Latitude: " + position.coords.latitude + 
    "<br>Longitude: " + position.coords.longitude; 
}

window.onload = getLocation();