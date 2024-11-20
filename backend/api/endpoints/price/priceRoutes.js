const express = require("express");
const priceController = require("./priceController");

const router = express.Router();

// Creates a new Price model, requires store, price, and itemId in the body
router.post("/addPrice", priceController.addPrice);

// Will be used by data trends to get prices by store in the form of week vs price
// Requires itemId in body
router.post("/getPrices", priceController.getPrices);

module.exports = router;
