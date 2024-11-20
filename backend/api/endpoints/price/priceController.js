const db = require("../../../database");

exports.addPrice = async (req, res) => {
	try {
		const record = await db.createRecord("Price", req.body);
		res.status(201).json(record);
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: "Error creating record" });
	}
};

exports.getPrices = async (req, res) => {
	try {
	  const itemRecord = await db.getRecord("Item", req.body, { include: { priceHistory: true } });
	  const prices = {};
  
	  // Iterate over each price record to group data by monthDay and store
	  itemRecord.priceHistory.forEach((price) => {
		const date = new Date(price.date);
		const monthDay = `${date.getMonth() + 1}-${date.getDate()}`; // Format as "MM-DD"
		const storeName = price.store.toLowerCase(); // Normalize store name to lowercase
		const itemPrice = price.price;
  
		if (!prices[monthDay]) {
		  prices[monthDay] = { monthDay }; // Initialize monthDay object
		}
  
		prices[monthDay][storeName] = itemPrice; // Add store and price to monthDay
	  });
  
	  // Convert the object into the desired array format
	  const formattedPrices = Object.values(prices);
  
	  // Send the response
	  res.status(201).json({ Prices: formattedPrices });
	} catch (error) {
	  res.status(500).json({ error: "Error getting record" });
	}
  };
  