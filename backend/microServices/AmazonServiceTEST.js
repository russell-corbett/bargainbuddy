const axios = require("axios");
const cheerio = require("cheerio");

const AmazonService = async (productName) => {
	const url = `https://www.amazon.ca/s?k=${encodeURIComponent(productName)}`;
	const itemSelector = ".s-result-item";
	const selectors = {
		name: "h2.a-size-mini a.a-link-normal span.a-text-normal",
		price: ".a-price .a-offscreen",
		link: "h2.a-size-mini a.a-link-normal",
		image: ".s-image",
	};

	try {
		const { data } = await axios.get(url, {
			headers: { "User-Agent": "Mozilla/5.0" },
		});
		const $ = cheerio.load(data);
		let bestItem = null;
		let bestScore = 0;

		$(itemSelector).each((i, elem) => {
			const element = $(elem);
			const name = element.find(selectors.name).text().trim() || null;
			let price = element.find(selectors.price).first().text().trim() || null;
			let link = element.find(selectors.link).attr("href") || null;
			const image = element.find(selectors.image).attr("src") || null;

			if (link && !link.startsWith("http")) {
				const baseUrl = new URL(url).origin;
				link = baseUrl + link;
			}

			// Ensure only one price is selected
			if (price) {
				const priceParts = price.split("$");
				price = priceParts.length > 1 ? `$${priceParts[1].trim()}` : price;
			}

			const score = [name, price, link, image].filter(Boolean).length;

			if (score > bestScore) {
				bestItem = { name, price, link, image };
				bestScore = score;
			}

			if (score === 4) return false; // exit loop early if perfect match
		});

		return bestItem;
	} catch (error) {
		console.error(`Error fetching data from ${url}:`, error.message);
		return null;
	}
};

const productName = process.argv[2] || "Mens Extended Sizes Jersey Knit Sleep Pajama Lounge Pant (1 & 2 Packs) Pajama Bottom";
AmazonService(productName).then((item) => {
	if (!item) {
		console.log("No results found.");
	} else {
		console.log(`\nPrices for "${productName}" from Amazon Canada:\n`);
		console.log(`Name: ${item.name}`);
		console.log(`Price: ${item.price}`);
		console.log(`Link: ${item.link}`);
		console.log(`Image: ${item.image}`);
	}
});
