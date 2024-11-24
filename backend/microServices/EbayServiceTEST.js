const axios = require("axios");
const cheerio = require("cheerio");

const EbayService = async (productName) => {
	const url = `https://www.ebay.ca/sch/i.html?_nkw=${encodeURIComponent(productName)}`;
	const itemSelector = ".s-item";
	const selectors = {
		name: ".s-item__title",
		price: ".s-item__price",
		link: ".s-item__link",
		image: ".s-item__image-img",
	};

	try {
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

			// Exclude non-product items
			const nameText = element.find(selectors.name).text().trim();
			if (!nameText || nameText === "Shop on eBay") return;

			const name = nameText || null;
			let price = element.find(selectors.price).first().text().trim() || null;
			let link = element.find(selectors.link).attr("href") || null;

			// Handle image: check for data-src and src attributes
			let image = element.find(selectors.image).attr("src") || element.find(selectors.image).attr("data-src") || element.find(selectors.image).attr("srcset") || null;

			// If image is stored in srcset, extract the URL
			if (image && image.includes(" ")) {
				image = image.split(" ")[0]; // Get the first URL before the space
			}

			// Handle relative links
			if (link && !link.startsWith("http")) {
				const baseUrl = "https://www.ebay.ca";
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

const productName = process.argv[2] || "Logitech Pebble Keys 2 K380s Multi-Device Bluetooth Wireless Keyboard";

EbayService(productName).then((item) => {
	if (!item) {
		console.log("\nNo results found.");
	} else {
		console.log(`\nPrices for "${productName}" from eBay Canada:\n`);
		console.log(`Name: ${item.name}`);
		console.log(`Price: ${item.price}`);
		console.log(`Link: ${item.link}`);
		console.log(`Image: ${item.image}`);
	}
});
