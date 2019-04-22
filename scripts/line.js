var svg = d3.select("body").append("svg").attr("width", 1400).attr("height", 500);
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

        var xScale = d3.scaleTime().domain(timeExtent).range([0,1400]);

        var missionCounts = new Array();
        for(var i = 0; i < dataLength; i++)
        {
            var length = d3.values(missionWeatherData[i])[1].length;
            missionCounts.push(length);
        }
        
        var sumExtent = d3.extent(missionCounts, function(d){
            return parseInt(d);
        });

        console.log(sumExtent);

        var yScale = d3.scaleLinear().domain(sumExtent).range([400,0]);

        var line = d3.line()
        .x(function(d){
            return 100 + xScale(new Date(d.key));
        })
        .y(function(d){
            return yScale(parseInt(d.values));
        });

        var xaxis = d3.axisBottom(xScale);
        var yaxis = d3.axisLeft(yScale);

        

        d3.select(".x.axis")
            .append("text")
            .text("Date")
            .style("fill", "black")
            .attr("x", 1400/2);

        d3.select(".y.axis")
            .append("text")
            .text("Missions Carried Out")
            .style("fill", "black")
            .attr("transform", "rotate(-90,0," + 90 + ") translate(" + -100 + ",0)");

        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(100, 400)")
            .call(xaxis.tickFormat(d3.timeFormat("%Y-%m-%d")))
                .selectAll("text")
                .style("text-anchor", "end")
                .attr("dx", "-.8em")
                .attr("dy", ".15em")
                .attr("transform", "rotate(-65)");

        // d3.select("svg")
        //     .append("g")
        //         .attr("class", "x axis")
        //         .attr("transform", "translate(100, 450)")
        //         .call(xaxis.tickFormat(d3.timeFormat("%Y-%m-%d")))
        //             .selectAll("text")
        //             .style("text-anchor", "end")
        //             .attr("dx", "-.8em")
        //             .attr("dy", ".15em")
        //             .attr("transform", "rotate(-65)");

        svg.append("g").attr("class", "y axis").attr("transform", "translate(100, 0)").call(yaxis);
        // d3.select("svg")
        //     .append("g").
        //         attr("class", "y axis")
        //         .attr("transform", "translate(100,500)")
        //         .call(yaxis);


        svg.append("path").datum(missionCounts).attr("class", "line").attr("d", line);
        // d3.select("svg").
        //     append("path")
        //         .datum(missionCounts)
        //         .attr("class", "line")
        //         .attr("d", line);

        // console.log(missionCounts);

        // console.log(dataLength);
        // console.log(missionWeatherData);
    }

}