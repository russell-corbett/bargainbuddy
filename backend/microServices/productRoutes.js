// routes/productRoutes.js
const express = require("express");
const router = express.Router();
const ProductController = require("../controllers/productController");

router.post("/search", ProductController.searchAndSaveProduct);

module.exports = router;
