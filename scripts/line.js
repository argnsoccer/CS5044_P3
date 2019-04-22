

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
        var timeExtent = d3.extent(opsData, function(d){
            return d.date;
        });
        var dataLength = d3.values(missionWeatherData).length;

        var xScale = d3.scaleTime().domain(timeExtent).range([0,1503]);
        var missionCounts = new Array();
        for(i = 0; i < dataLength; i++)
        {
            var length = d3.values(missionWeatherData[i])[1].length;
            missionCounts.push(length);
        }
        
        console.log(missionCounts);

        console.log(dataLength);
        console.log(missionWeatherData);
    }

}