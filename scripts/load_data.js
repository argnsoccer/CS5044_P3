//setting up what data we want to grab from each dataset
var weatherConverter = function(d) {
	var yr = d.YR;
	var mo = d.MO;
	var day = d.DA;

	return{
		date: new Date(+yr, +mo-1,+day),
		Station: d.STA,
		Precipitation: d.PRCP,
		peakWindSpeed: d.SPD,
		maxTemp: d.MAX,
		minTemp: d.MIN,
		meanTemp: d.MEA,
		latitude: d.LAT,
		longitude: d.LON,
        adverseWeather: d.TSHDSBRSGF
	}
}

var opsConverter = function(d) {
	var timeData = d['Mission Date'];
	var datum = timeData.split("/");

	return {
		missionId: d['Mission ID'],
		date: new Date(+datum[2], +datum[0]-1,+datum[1]),
		id: d['Mission ID'],
		theaterOfOperations: d['Theater of Operations'],
		country: d.Country,
		airForce: d['Air Force'],
		aircraftSeries: d['Aircraft Series'],
		missionType: d['Mission Type'],
		targetCountry: d['Target Country'],
		targetCity: d['Target City'],
		targetType: d['Target Type'],
		targetIndustry: d['Target Industry'],
		targetPrio: d['Target Priority'],
		altitude: d['Altitude (Hundreds of Feet)'],
		airboneAircraft: d['Airborne Aircraft'],
		attackingAircraft: d['Attacking Aircraft'],
		bombingAircraft: d['Bombing Aircraft'],
		highExplosiveWeight: d['High Explosives Weight (Pounds)'],
		totalWeight: d['Total Weight'],
		targetLat: d['Target Latitude'],
		targetLon: d['Target Longitude'],
		takeoffLat: d['Takeoff Latitude'],
		takeoffLon: d['Takeoff Longitude']
	}
}

var dataOps = "data/operations.csv";
var dataWeather = "data/ww2-weather.csv";
var stationList = "data/Weather Station Locations.csv";

var promises = [d3.csv(dataOps, opsConverter), d3.csv(dataWeather, weatherConverter), d3.csv(stationList)];

Promise.all(promises).then(ready);

function ready(data) {
	//looking up and adding longitude and latitude of Weather station to weather data
	data[1].forEach(function(weatherD) {
		var result = data[2].filter(function(stationD) {return stationD.WBAN === weatherD.Station;});
		weatherD.latitude = (result[0] !== undefined) ? result[0].Latitude : null;
		weatherD.longitude = (result[0] !== undefined) ? result[0].Longitude : null;
	});
	
	var map = new Map(data, new Date(1945, 2, 16));
	var lineChart = new LineChart(data); 
	var svgDoc = d3.select("body").append("svg").attr("width", 700).attr("height", 350);
	var map = new Map(data, new Date(1945, 2, 16));
	var dashboard = new Dashboard(data, '1');
}
