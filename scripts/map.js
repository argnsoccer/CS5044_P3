//Load a map, open street view style.
var map = L.map('map').setView([0, 0], 2); 
			
//here we include a tile layer that specifies the visual look of our map
L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png',{
		attribution: '&copy; <a href="href://osm.org/copyright">OpenStreetMap</a> contributors'
		}).addTo(map);

class Map {
		constructor(data, date) {
				this.date = date;
				this.data = data;
				this.isTemperature = true;
				this.refresh();	
		}

		refresh() {
				if(this.isTemperature) {
						this.refreshTemperature();
				}
		}

		refreshTemperature() {
				var data = this.data;
				//var missionData = data[0]
				var weatherData = data[1]
				//missionData = missionData.filter(dateFilter);
				weatherData = weatherData.filter(getFilter(this));

				//console.log("Mission data length: " + missionData.length)
				console.log("Weather data length: " + weatherData.length)
				
				var arr = []
				var hottestPlace = 0
				var coolestPlace = 1000
				weatherData.forEach(function(d) {
						if(d.meanTemp > hottestPlace) {
								hottestPlace = d.meanTemp;
						}
						if(d.meanTemp < coolestPlace) {
								coolestPlace = d.meanTemp;
						}
				})
				var tempDiff = 0 - coolestPlace;
				weatherData.forEach(function(d) {
						var meanTemp = d.meanTemp + tempDiff;
						arr.push([d.latitude, d.longitude, meanTemp]);
				})

				//Create icon for weather station
				var WeatherStation = L.Icon.extend({
					options: {
						iconUrl: 'weather-station.png',
						iconSize:     [15, 15],
					}
				});
				var weatherStation = new WeatherStation();

				weatherData.forEach(function(d) {
						var marker = L.marker([d.latitude, d.longitude], {icon: weatherStation}).addTo(map).bindPopup("Station: " + d.Station + " Temp: " + (d.meanTemp-32)/1.8 + " c");

						//var popUp = L.popup();
						//marker.on("mouseover", function(e) {
						//		popUp.setLatLng(e.latlng).setContent((d.meanTemp-32)/1.8 + " c").openOn(map);
						//})
				})
				
				//Library we use for these neat interpolated maps
				//https://github.com/JoranBeaufort/Leaflet.idw
				var idx = L.idwLayer(arr, {opacity: 0.3, cellSize: 10, exp: 5, max: hottestPlace+tempDiff, gradient:{0: 'blue', 0.5: 'lime', 1: 'red'}}).addTo(map);
		}

		getDate() {
				return this.date;
		}
}

function getFilter(map) {
		return function dateFilter(d) {
				var date = map.getDate();
				return d.date.getTime() == date.getTime(); 
		}
}

