const { PrismaClient } = require("@prisma/client");
const AmazonService = require("./AmazonService.js");
const BestBuyService = require("./BestBuyService.js");
const WalmartService = require("./WalmartService.js");

// console.log("Running");

class ItemSearchService {
	constructor() {
		this.amazonService = new AmazonService();
		this.bestBuyService = new BestBuyService();
		this.walmartService = new WalmartService();

		this.prisma = new PrismaClient();

		console.log("Item search service constructed");
	}

	async searchAndStoreItem(query) {
		try {
			const amazonResult = await this.amazonService.searchAmazon(query);
			const bestBuyResult = await this.bestBuyService.searchBestBuy(query);
			const walmartResult = await this.walmartService.searchWalmart(query);

			const results = [
				{ store: "Amazon", ...amazonResult },
				{ store: "BestBuy", ...bestBuyResult },
				{ store: "Walmart", ...walmartResult },
			];

			for (const result of results) {
				const { store, title, price, id } = result;

				let item = await this.prisma.item.findFirst({
					where: {
						OR: [{ amazonId: id }, { bestBuyId: id }, { walmartId: id }],
					},
				});

				if (item) {
					await this.prisma.price.create({
						data: {
							price,
							store,
							itemId: item.id,
						},
					});
				} else {
					item = await this.prisma.item.create({
						data: {
							name: title,
							amazonId: store === "Amazon" ? id : null,
							bestBuyId: store === "BestBuy" ? id : null,
							walmartId: store === "Walmart" ? id : null,
							priceHistory: {
								create: {
									price: 19.99,
									date: new Date(),
									store: "Walmart",
								},
							},
							currentPrice: 19.99,
						},
					});
				}
			}

			return { message: "Item prices updated successfully" };
		} catch (error) {
			console.error("Error searching and storing item:", error);
			throw new Error(`Error searching and storing item: ${error.message}`);
		}
	}
}

module.exports = ItemSearchService;
