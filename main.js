var posHolder = document.querySelector('#position');
var tempHolder = document.querySelector('#temp');
var weatherHolder = document.querySelector('#weather_data')
var reloadHolder = document.querySelector('.reload i');
var iconHolder = document.querySelector('#weather_icon')



function getWeather(url){
	// fetching API data
	fetch(url) 
			.then(function(blob) { 
				return blob.json();
			})
			.then(function(res){
				
				var iconType = "";
				var weatherId = res.weather[0].id;
				console.log(weatherId);

				if (weatherId >= 200 && weatherId <= 232 ){
					iconType = "fa-bolt";
				} else if (weatherId >= 300 && weatherId <= 321) {
					iconType = "fa-umbrella";
				} else if (weatherId >= 500 && weatherId <= 531) {
					iconType = "fa-tint";
				} else if (weatherId >= 600 && weatherId <= 622) {
					iconType = "fa-snowflake-o";
				} else if (weatherId == 800) {
					iconType = "fa-sun-o";
				} else if (weatherId >= 801 && weatherId <= 804) {
					iconType = "fa-cloud";
				} else {
					iconType = "";
				}

				// Displaying data in holders AND removing loadwheel
				iconHolder.style.display = "block";
				iconHolder.classList.add(iconType);
				reloadHolder.classList.remove('fa-spin');
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
	iconHolder.style.display = "none";
	// Displaying the loadwheel AND removing "reload"
	reloadHolder.classList.add('fa-spin');
	
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


