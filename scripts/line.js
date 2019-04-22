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
        function sortByDateAscending(a, b) {
            // Dates will be cast to numbers automagically:
            return a.key - b.key;
        }

        var data = this.data;
        var opsData = data[0];
        var weatherData = data[1];
        var missionWeatherData = d3.nest()
        .key(function(d){
            return d.date;
        }).sort(sortByDateAscending)
        .key(function(d){
            return d.id
        })
        .entries(opsData)

        missionWeatherData = missionWeatherData.sort(sortByDateAscending)
        console.log(missionWeatherData);

        var timeExtent = d3.extent(opsData, function(d){
            return d.date;
        });
        var dataLength = d3.values(missionWeatherData).length;

        var xScale = d3.scaleTime().domain(timeExtent).range([0,1400]);

        var missionCounts = new Array();
        var lineData = [];
        for(var i = 0; i < dataLength; i++)
        {
            var length = d3.values(missionWeatherData[i])[1].length;
            missionCounts.push(length);
            lineData.push({date: d3.values(missionWeatherData[i])[0], count: length});
        }

        console.log(lineData);
        
        var sumExtent = d3.extent(missionCounts, function(d){
            return parseInt(d);
        });

        var yScale = d3.scaleLinear().domain(sumExtent).range([400,0]);

        var line = d3.line()
        .x(function(d){
            return 100 + xScale(new Date(d.date));
        })
        .y(function(d){
            return yScale(parseInt(d.count));
        });

        var area = d3.area()
        .x(function(d){
            return 100 + xScale(new Date(d.date));
        })
        .y1(function(d){
            return yScale(parseInt(d.count));
        })
        .y0(function(d){
            return yScale.range()[0];
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
            .attr("transform", "rotate(-90,0,90) translate(-100,0)");

        svg.append("text")
            .text("Missions Over Time")
            .style("fill", "black");

        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(100, 400)")
            .call(xaxis.tickFormat(d3.timeFormat("%Y-%m-%d")))
                .selectAll("text")
                .style("text-anchor", "end")
                .attr("dx", "-.8em")
                .attr("dy", ".15em")
                .attr("transform", "rotate(-65)")

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

        //console.log(missionCounts);

        svg.append("path")
            .datum(lineData)
            .attr("class", "area")
            .attr("d", area)
            .style("stroke", "red");
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