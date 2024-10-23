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

// exports.getPrices = async (req, res) => {
//   try {
//     const record = await db.getRecord("price", req.body);
//     res.status(201).json(record);
//   } catch (error) {
//     res.status(500).json({ error: "Error getting record" });
//   }
// };
