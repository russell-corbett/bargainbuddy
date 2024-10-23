const db = require("../../../database");
const { callPlotPriceTrends } = require("../../../microServices/createTrendPlotWrapper");

exports.makeTrend = async (req, res) => {
	const itemID = req.body.itemID;
	const item = await db.getRecord("Item", { itemID });
	if (!item) {
		return res.status(400).json({ error: "Item does not exist" });
	}

	const priceHistory = item.priceHistory;

	// Initialize arrays to hold prices and dates
	let prices = [];
	let dates = [];

	// Loop through priceHistory and populate arrays
	for (let i = 0; i < priceHistory.length; i++) {
		prices.push(priceHistory[i].price);
		dates.push(priceHistory[i].date);
	}

	// Assuming store can be extended for multiple stores later
	let store = "BestBuy";

	// Call the function to plot price trends
	try {
		await callPlotPriceTrends(itemID, dates, prices, store);
		res.status(200).json({ message: "Price trends plotted successfully." });
	} catch (error) {
		res.status(500).json({ error: "Error plotting price trends." });
	}
};
