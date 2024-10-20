const priceController = require("../priceController");


const router = express.Router();

// Creates a new Price model, requires store, price, and itemId in the body
router.post("/addPrice", priceController.addPrice);
router.post("/getPrices", priceController.getPrices); // Needs to be made

module.exports = router;