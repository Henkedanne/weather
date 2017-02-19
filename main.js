var posHolder = document.querySelector('#position');

// api key = c2ca76245286de363c961123ba8197b5




function getWeather(url){
	data = fetch(url)
			.then(function(blob) {
				return blob.json;
			})
			.then(function(data) {
				var name = data;
				console.log(name);
			}); 
	
	var name = data[1];
	console.log(name);
};

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(pos){
        	
        	
			posHolder.innerHTML = pos.coords.latitude + "</br>" + pos.coords.longitude;
			console.log(pos);
			var url = "https://cors.now.sh/" + "http://api.openweathermap.org/data/2.5/weather?lat=" + pos.coords.latitude +"&lon=" + pos.coords.longitude + "&units=metric" +"&APPID=c2ca76245286de363c961123ba8197b5";

        	getWeather(url);
        });
    } else {
        posHolder.innerHTML = "Geolocation is not supported by this browser.";
    }
}



window.onload = getLocation();


