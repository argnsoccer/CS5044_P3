//Load a map, open street view style.
var map = L.map('map').setView([0, 0], 2); 
			
//here we include a tile layer that specifies the visual look of our map
L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png',{
	attribution: '&copy; <a href="href://osm.org/copyright">OpenStreetMap</a> contributors'
	}).addTo(map);
