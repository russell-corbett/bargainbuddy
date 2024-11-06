const puppeteer = require('puppeteer');
const cheerio = require('cheerio');

const getPricesFromCanadianTire = async (productName) => {
    const url = `https://www.canadiantire.ca/en/search?q=${encodeURIComponent(productName)}`;
    const storeUrl = 'https://www.canadiantire.ca/en/store-locator.html';

    const itemSelector = '.product-item';
    const selectors = {
        name: '.product-name',
        price: '.product-price',
        link: 'a.product-name-link',
        image: 'img.product-image'
    };

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    try {
        // Navigate to Canadian Tire homepage to set location (if needed)
        await page.goto(storeUrl, { waitUntil: 'networkidle2' });

        // Here you might need to add steps to set the store location if required
        // await page.click('location-selector');
        // await page.type('#search-input-field', 'St. John\'s, NL');
        // await page.keyboard.press('Enter');

        // Navigate to the search results page
        await page.goto(url, { waitUntil: 'networkidle2' });
        const data = await page.content();
        const $ = cheerio.load(data);

        let bestItem = null;
        let bestScore = 0;

        $(itemSelector).each((i, elem) => {
            const element = $(elem);
            const name = element.find(selectors.name).text().trim() || null;
            let price = element.find(selectors.price).text().trim() || null;
            let link = element.find(selectors.link).attr('href') || null;
            const image = element.find(selectors.image).attr('src') || null;

            console.log(`Found item: ${name}`);

            // Handle relative links
            if (link && !link.startsWith('http')) {
                const baseUrl = 'https://www.canadiantire.ca';
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

const productName = process.argv[2] || 'EGO POWER+ Brushless Cordless 24-in Self-Propelled 2-Stage Snow Blower with PEAK POWER™ with (2) 7.5Ah Batteries and 280W Dual-Port Charger';

getPricesFromCanadianTire(productName).then(item => {
    if (!item) {
        console.log('\nNo results found.');
    } else {
        console.log(`\nPrices for "${productName}" from Canadian Tire:\n`);
        console.log(`Name: ${item.name}`);
        console.log(`Price: ${item.price}`);
        console.log(`Link: ${item.link}`);
        console.log(`Image: ${item.image}`);
    }
});
