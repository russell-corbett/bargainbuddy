// services/AmazonService.js
const axios = require("axios");
const cheerio = require("cheerio");

class AmazonService {
	constructor() {
		// Initialization if needed
	}

	async searchAmazon(productName) {
		const url = `https://www.amazon.ca/s?k=${encodeURIComponent(productName)}`;
		const itemSelector = ".s-search-results .s-result-item";
		const selectors = {
			name: "h2.a-size-mini a.a-link-normal span.a-text-normal, h2.a-size-mini a.a-link-normal span",
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

				if (!name || !link) {
					// Skip items without name or link
					return;
				}

				if (link && !link.startsWith("http")) {
					const baseUrl = new URL(url).origin;
					link = baseUrl + link;
				}

				// Extract ASIN (Amazon Standard Identification Number) from the link
				let id = null;
				const asinMatch = link.match(/\/(dp|gp)\/([A-Z0-9]{10})/);
				if (asinMatch) {
					id = asinMatch[2];
				}

				// Clean up the price and convert to a number
				if (price) {
					price = price.replace(/[^0-9.,]/g, "").replace(",", ".");
					price = parseFloat(price);
				}

				const score = [name, price, link, image, id].filter(Boolean).length;

				if (score > bestScore) {
					bestItem = { name, price, link, image, id, modelNumber: null };
					bestScore = score;
				}

				if (score === 5) return false; // exit loop early if perfect match
			});

			return bestItem;
		} catch (error) {
			console.error(`Error fetching data from Amazon:`, error.message);
			return null;
		}
	}
}

module.exports = AmazonService;
