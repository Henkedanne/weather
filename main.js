var posHolder = document.querySelector('#position');
var tempHolder = document.querySelector('#temp');
var weatherHolder = document.querySelector('#weather_data')
var loader = document.getElementById('loader');
var reloadHolder = document.querySelector('.reload');




function getWeather(url){
	// fetching API data
	fetch(url) 
			.then(function(blob) { 
				return blob.json();
			})
			.then(function(res){
				// Displaying data in holders AND removing loadwheel
				loader.classList.remove('loadwheel');
				reloadHolder.style.display = "block";
				tempHolder.innerHTML = Math.floor(res.main.temp) + "°";
				weatherHolder.innerHTML = res.weather[0].description;
				posHolder.innerHTML = "Near " + "<strong>" + res.name + "</strong>";
			});
			
	};

function getLocation() {
	// clearing all the elements
	posHolder.innerHTML = "";
	tempHolder.innerHTML = "";
	weatherHolder.innerHTML = "";
	// Displaying the loadwheel AND removing "reload"
	reloadHolder.style.display = "none";
	loader.classList.add('loadwheel');
    // Getting location
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(pos){
        	
        	var url = "https://cors.now.sh/" + "http://api.openweathermap.org/data/2.5/weather?lat=" + pos.coords.latitude +"&lon=" + pos.coords.longitude + "&units=metric" +"&APPID=c2ca76245286de363c961123ba8197b5";

        	getWeather(url);
        });
    } else {
        posHolder.innerHTML = "Geolocation is not supported by this browser.";
    }
}
// Reload on click
reloadHolder.addEventListener('click', getLocation);
// Loads on start
window.onload = getLocation();


