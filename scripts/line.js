

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
            return d.date;
        })
        .key(function(d){
            return d.id
        })
        .entries(opsData);
        var length = missionWeatherData[0].length;
        console.log(missionWeatherData[0])
        console.log(length);
        console.log(missionWeatherData);
    }

}