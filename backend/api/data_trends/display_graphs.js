const matplotlib = require("matplotlib");

class DisplayGraphs {
	constructor(dataPoints, xAxisName, yAxisName) {
		this.dataPoints = dataPoints;
		this.xAxisName = xAxisName;
		this.yAxisName = yAxisName;
	}

	makeGraph() {
		const plt = matplotlib.pyplot;
		const dates = this.dataPoints.map((dp) => dp.date);
		const prices = this.dataPoints.map((dp) => dp.price);

		plt.plot(dates, prices, (marker = "o"));
		plt.xlabel(this.xAxisName);
		plt.ylabel(this.yAxisName);
		plt.title("Price Trends");
		plt.xticks((rotation = 45));
		plt.show();
	}
}

module.exports = DisplayGraphs;
