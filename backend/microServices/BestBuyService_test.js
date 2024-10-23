const BestBuyService = require("./BestBuyService");

const bestBuyService = new BestBuyService();

bestBuyService
	.searchBestBuy("981-001256")
	.then((productDetails) => {
		console.log(productDetails);
	})
	.catch((error) => {
		console.error("Error:", error);
	});
