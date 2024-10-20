const express = require("express");
const trendController = require("../trendController");

const router = express.Router();

// Requires an item ID as an argument and will create a plot of that items
// price history and save it to the root/trends as a file titled "<itemID>_trend.png"
router.post("/makeTrend", trendController.makeTrend);

module.exports = router;