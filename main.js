	// VARIABLES
var posHolder = document.querySelector('#position');
var tempHolder = document.querySelector('#temp');
var weatherHolder = document.querySelector('#weather_data');
var reloadHolder = document.querySelector('.reload i');
var reloadClick = document.querySelector('.reload');
var iconHolder = document.querySelector('#weather_icon');
var forTempHolder = document.querySelector('#fore-temp');
var forHolder = document.querySelector('#fore-data');
var temp = document.querySelector('#time-stamp');
var nextBtns = document.querySelectorAll('.right-arrow');


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
			
}

function getForecast(url) {
	fetch(url)
				.then(function(blob) {
					return blob.json();
				})	
				.then(function(result) {
					console.log(result);
					temp.innerHTML = result.list[8].dt_txt;
					forTempHolder.innerHTML = Math.floor(result.list[8].main.temp) + "°";
					forHolder.innerHTML = result.list[8].weather[0].description;
				});
}

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

var cardIndex = 1;
showCards(cardIndex);

function plusCards(n) {
  showCards(cardIndex += n);
}

function currentCard(n) {
  showCards(cardIndex = n);
}

function showCards(n) {
  var i;
  var cards = document.getElementsByClassName("card");
  // var dots = document.getElementsByClassName("dot");
  if (n > cards.length) {cardIndex = 1} 
  if (n < 1) {cardIndex = cards.length}
  for (i = 0; i < cards.length; i++) {
      cards[i].classList.remove('active'); 
  }
  // for (i = 0; i < dots.length; i++) {
      // dots[i].className = dots[i].className.replace(" active", "");
  // }
  cards[cardIndex-1].classList.add('active'); 
  // dots[cardIndex-1].className += " active";
}
nextBtns.forEach(function(btn){
	btn.addEventListener('click', function(){
		plusCards(1);
	});
});
// Reload on click
reloadClick.addEventListener('click', getLocation);
// Loads on start
window.onload = getLocation();


