class Dashboard {
    constructor(data, missionId) {
        this.data = data;
        this.missionId = missionId;
        this.createDashboard();
    }

    createDashboard() {
		// Build data set
		var missionData = this.data[0];
        var d = missionData.filter(getFilter(this));
        var data = [d[0].aircraftSeries, d[0].airForce, d[0].missionType, d[0].targetCity];
		var columns = ['Aircraft', 'Airforce', 'Mission Type', 'Target City']
		// Build dashboard
		var dashboard = d3.select("#dashboard").append("table").attr("id", "dashtbl");
		for(var i = 0; i < columns.length; i++) {
			addDashboardElement(columns[i], data[i], dashboard);
		}
	}
	
	getId() {
		return this.missionId;
	}
}

function addDashboardElement(name, datapoint, dashboard) {
	var element = document.createElement("tr");
	if(datapoint == "") {
		datapoint = "N/A";
	}
	element.innerHTML = "<td>" + name + ": " + datapoint + "</td>" ;
	dashboard.append(function() { return element; });	
}

function getFilter(dashboard) {
    return function dateFilter(d) {
		var id = dashboard.getId();
        return d.missionId == id; 
    }
}
