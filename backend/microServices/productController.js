// controllers/productController.js
const ItemSearchService = require("../services/ItemSearchService");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class ProductController {
	static async searchAndSaveProduct(req, res) {
		const { query, email, searchType } = req.body;

		if (!query || !email || !searchType) {
			return res.status(400).json({ error: "Query, email, and searchType are required" });
		}

		try {
			const itemSearchService = new ItemSearchService();
			const result = await itemSearchService.searchAndStoreItem(query, email, searchType);
			res.json(result);
		} catch (error) {
			console.error("Error in searchAndSaveProduct:", error.message);
			res.status(500).json({ error: "Internal server error" });
		}
	}
}

module.exports = ProductController;
