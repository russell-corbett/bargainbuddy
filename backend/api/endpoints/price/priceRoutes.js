const express = require("express");
const userController = require("./priceController");

const router = express.Router();

router.post("/addPrice", priceController.addPrice);
router.post("/getPrices", priceController.getPrice);

module.exports = router;