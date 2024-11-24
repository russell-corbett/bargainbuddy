const puppeteer = require("puppeteer");
const cheerio = require("cheerio");

const getPricesFromStore = async (productName) => {
	const url = `https://www.homedepot.ca/search?q=${encodeURIComponent(productName)}`;
	const storeUrl = "https://www.homedepot.ca/en/home.html";

	const itemSelector = ".product-result__product-item";
	const selectors = {
		name: ".product-tile__title",
		price: ".price-format__main-price",
		link: "a.product-tile__image-wrapper",
		image: "img.product-image",
	};

	const browser = await puppeteer.launch();
	const page = await browser.newPage();

	try {
		// Set the location by navigating to the store page and setting the store
		await page.goto(storeUrl, { waitUntil: "networkidle2" });
		await page.click("#headerStoreSelectorDropdown");
		await page.type("#search-input-field-header", "St. John's, NL");
		await page.waitForTimeout(2000); // Wait for the dropdown to populate
		await page.keyboard.press("Enter");

		// Wait for the store location to be set
		await page.waitForTimeout(5000);

		// Navigate to the product search page
		await page.goto(url, { waitUntil: "networkidle2" });
		const data = await page.content();
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
	} finally {
		await browser.close();
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
