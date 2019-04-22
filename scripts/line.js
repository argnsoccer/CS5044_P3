

class LineChart
{
    constructor(data)
    {
        this.data = data;
        this.processGraph();
    }

    processGraph()
    {
        var data = this.data;
        var opsData = data[0];
        var weatherData = data[1];
        var missionWeatherData = d3.nest()
        .key(function(d){
            return d[1].adverseWeather;
        })
        .key(function(d){
            return d[0].date
        })
        .entries(data);
        console.log(missionWeatherData);
    }

}