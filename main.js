var posHolder = document.querySelector('#position');
var tempHolder = document.querySelector('#temp');
var weatherHolder = document.querySelector('#weather_data');
var reloadHolder = document.querySelector('.reload i');
var reloadClick = document.querySelector('.reload');
var iconHolder = document.querySelector('#weather_icon');
var forTempHolder = document.querySelector('#fore-temp');
var forHolder = document.querySelector('#fore-data');


function getWeather(url){
	// fetching API data
	fetch(url) 
			.then(function(blob) { 
				return blob.json();
			})
			.then(function(result){
				
				var iconType = "";
				var weatherId = result.weather[0].id;
				console.log(weatherId);

				if (weatherId >= 200 && weatherId <= 232 ){
					iconType = "fa-bolt";
				} else if (weatherId >= 300 && weatherId <= 321) {
					iconType = "fa-umbrella";
				} else if (weatherId >= 500 && weatherId <= 531) {
					iconType = "fa-tint";
				} else if (weatherId >= 600 && weatherId <= 622) {
					iconType = "fa-snowflake-o";
				} else if (weatherId === 800) {
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
				tempHolder.innerHTML = Math.floor(result.main.temp) + "°";
				weatherHolder.innerHTML = result.weather[0].description;
				posHolder.innerHTML = "Near " + "<strong>" + result.name + "</strong>";
			});
			
	};
function getForecast(url) {
	fetch(url)
				.then(function(blob) {
					return blob.json();
				})	
				.then(function(result) {
					console.log(result);
					forTempHolder.innerHTML = "Temp: " + Math.floor(result.list[8].main.temp) + "°";
					forHolder.innerHTML = result.list[8].weather[0].description;
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
        	
        	var urlCurrent = "https://cors.now.sh/" + "http://api.openweathermap.org/data/2.5/weather?lat=" + pos.coords.latitude +"&lon=" + pos.coords.longitude + "&units=metric" +"&APPID=c2ca76245286de363c961123ba8197b5";
        	var urlForecast = "https://cors.now.sh/" + "http://api.openweathermap.org/data/2.5/forecast?lat=" + pos.coords.latitude +"&lon=" + pos.coords.longitude + "&units=metric" +"&APPID=c2ca76245286de363c961123ba8197b5";
        	getWeather(urlCurrent);
        	getForecast(urlForecast);
        });
    } else {
        posHolder.innerHTML = "Geolocation is not supported by this browser.";
    }
}
// Reload on click
reloadClick.addEventListener('click', getLocation);
// Loads on start
window.onload = getLocation();


