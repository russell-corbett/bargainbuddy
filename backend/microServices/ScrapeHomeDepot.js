const axios = require("axios");
const cheerio = require("cheerio");

const getPricesFromStore = async (productName) => {
	const url = `https://www.homedepot.ca/search?q=${encodeURIComponent(productName)}`;
	const itemSelector = ".product-result__product-item";
	const selectors = {
		name: ".product-tile__title",
		price: ".price-format__main-price",
		link: "a.product-tile__image-wrapper",
		image: "img.product-image",
	};

	try {
		console.log(`Fetching data from ${url}`);
		const { data } = await axios.get(url, {
			headers: {
				"User-Agent": "Mozilla/5.0",
				"Accept-Language": "en-CA,en;q=0.9",
			},
		});
		const $ = cheerio.load(data);
		let bestItem = null;
		let bestScore = 0;

		$(itemSelector).each((i, elem) => {
			const element = $(elem);
			const name = element.find(selectors.name).text().trim() || null;
			let price = element.find(selectors.price).text().trim() || null;
			let link = element.find(selectors.link).attr("href") || null;
			const image = element.find(selectors.image).attr("src") || null;

			console.log(`Found item: ${name}`);

			// Handle relative links
			if (link && !link.startsWith("http")) {
				const baseUrl = "https://www.homedepot.ca";
				link = baseUrl + link;
			}

			// Clean up price format
			if (price) {
				const priceMatch = price.match(/[\d.,]+/);
				price = priceMatch ? `$${priceMatch[0]}` : price;
			}

			const score = [name, price, link, image].filter(Boolean).length;
			if (score > bestScore) {
				bestItem = { name, price, link, image };
				bestScore = score;
			}

			if (score === 4) return false; // Exit loop early if perfect match
		});

		return bestItem;
	} catch (error) {
		console.error(`Error fetching data from ${url}:`, error.message);
		return null;
	}
};

const productName = process.argv[2] || "RIDGID 18V Drill/Driver and Impact Driver";

getPricesFromStore(productName).then((item) => {
	if (!item) {
		console.log("\nNo results found.");
	} else {
		console.log(`\nPrices for "${productName}" from Home Depot Canada:\n`);
		console.log(`Name: ${item.name}`);
		console.log(`Price: ${item.price}`);
		console.log(`Link: ${item.link}`);
		console.log(`Image: ${item.image}`);
	}
});
