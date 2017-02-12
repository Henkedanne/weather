var posHolder = document.querySelector('#position');

// api key = af7c0d1e9a573a42db1eb2be21afc6e0

var wheaterData;
var lat = 0;
var long = 0;

function getApi(url){
	data = fetch(url)
			.then(blob => blob.json())
			.then(data => wheaterData.push(data)); //Hur får jag in data i wheaterData???
			console.log(wheaterData);
};
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (pos){
        	
        	
			posHolder.innerHTML = pos.coords.latitude + "</br>" + pos.coords.longitude;
			
			var url = "http://api.openweathermap.org/data/2.5/weather?lat=" + pos.coords.latitude +"&lon=" + pos.coords.longitude + "&APPID=af7c0d1e9a573a42db1eb2be21afc6e0";

        	getApi(url);
        });
    } else {
        posHolder.innerHTML = "Geolocation is not supported by this browser.";
    }
}


window.onload = getLocation();


