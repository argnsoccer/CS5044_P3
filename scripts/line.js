

class LineChart
{
    constructor(data)
    {
        this.data = data;
        this.processGraph();
    }

    processGraph()
    {
        var opsData = data[0];
        var weatherData = data[1];
        var missionWeatherData = d3.nest()
        .key(function(d){
            return d[0].date;
        })
        .key(function(d){
            return d[1].adverseWeather;
        })
        .entries(data);
        console.log(missionWeatherData);
    }

}