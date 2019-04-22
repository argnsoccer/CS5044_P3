

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
        .rollup(function(leaves){
            return d3.sum(leaves, function(d){
                return parseInt(d.VALUE);
            })
        })
        .entries(opsData);
        console.log(missionWeatherData);
    }

}