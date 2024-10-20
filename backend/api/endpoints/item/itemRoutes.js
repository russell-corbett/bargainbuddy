const express = require("express");
const itemController = require("./itemController");

const router = express.Router();

router.post("/createItem", itemController.createItem);
router.post("/updateItem", itemController.updateItem);
router.post("/createPriceLog", itemController.createPriceLog);

module.exports = router;
