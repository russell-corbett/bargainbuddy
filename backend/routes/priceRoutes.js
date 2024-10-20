const express = require("express");
const priceController = require("../controllers/priceController");

const router = express.Router();

router.post("/addPrice", priceController.addPrice);
router.post("/getPrices", priceController.getPrices);

module.exports = router;