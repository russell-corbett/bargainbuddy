const express = require("express");
const priceController = require("../controllers/priceController");

const router = express.Router();

// Creates a new Price model, requires store, price, and itemId in the body
router.post("/addPrice", priceController.addPrice);

router.post("/getPrices", priceController.getPrices); // Needs to be made

module.exports = router;