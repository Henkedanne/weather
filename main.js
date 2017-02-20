var posHolder = document.querySelector('#position');
var tempHolder = document.querySelector('#temp');
var weatherHolder = document.querySelector('#weather_data')
// api key = c2ca76245286de363c961123ba8197b5




function getWeather(url){
	fetch(url)
			.then(function(blob) {
				return blob.json();
			})
			.then(function(res){
				console.log(res);
				tempHolder.innerHTML = Math.floor(res.main.temp) + "°C";
				weatherHolder.innerHTML = res.weather[0].description;
				posHolder.innerHTML = "Near " + "<strong>" + res.name + "</strong>";
			});
			
	};

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(pos){
        	
        	
			//posHolder.innerHTML = pos.coords.latitude + "</br>" + pos.coords.longitude;
			
			var url = "https://cors.now.sh/" + "http://api.openweathermap.org/data/2.5/weather?lat=" + pos.coords.latitude +"&lon=" + pos.coords.longitude + "&units=metric" +"&APPID=c2ca76245286de363c961123ba8197b5";

        	getWeather(url);
        });
    } else {
        posHolder.innerHTML = "Geolocation is not supported by this browser.";
    }
}



window.onload = getLocation();


