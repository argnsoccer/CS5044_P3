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
        var weatherData = data[1]
        weatherData = weatherData.filter(getFilter(this));
        var refreshData = []
        weatherData.forEach(function(d) {
            var temp = Math.round(((d.meanTemp-32)/1.8) * 100) / 100
            refreshData.push([temp, d.latitude, d.longitude, d.Station]);
        })
        //Create the layer    
        this.refreshLayer(refreshData, " Temp: ", " c", 'blue', 'lime', 'red');
        console.log(refreshData)
    }

    refreshLayer(dataVar, labelFront, labelEnd, colourLeft, colourCenter, colourRight) {
        // Normalise the data
        var arr = []
        var min = 1000000;
        var max = 0;
        dataVar.forEach(function(d) {
            if(d[0] > max) {
                max = d[0];
            }
            if(d[0] < min ) {
                min = d[0];
            }
        })
        var diff = 0 - min;
        dataVar.forEach(function(d) {
            arr.push([d[1], d[2], d[0] + diff]);
        })
        //Normalisation done.
        console.log("Minimum temperature: " + min);
        console.log("Maximum temperature: " + max);

        //Create icon for weather station
        var WeatherStation = L.Icon.extend({
            options: {
                iconUrl: 'weather-station.png',
                iconSize:     [15, 15],
            }
        });
        var weatherStation = new WeatherStation();

        dataVar.forEach(function(d) {
            var marker = L.marker([d[1], d[2]], 
                {icon: weatherStation}).addTo(map)
                .bindPopup("Station: " + d[3] + labelFront 
                    + d[0] + labelEnd);
        })

        //Library we use for these neat interpolated maps
        //https://github.com/JoranBeaufort/Leaflet.idw
        var idx = L.idwLayer(arr, {opacity: 0.3, cellSize: 10, exp: 5,
            max: max+diff, 
            gradient:{0: colourLeft, 0.5: colourCenter, 1: colourRight}}).addTo(map);
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

