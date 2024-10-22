const axios = require('axios');
const cheerio = require('cheerio');

const getPricesFromStore = async (url, itemSelector, selectors) => {
    try { 
        const { data } = await axios.get(url, {
            headers: { 'User-Agent': 'Mozilla/5.0' }
        });
        const $ = cheerio.load(data);
        const results = [];

        // Select product items 
        $(itemSelector).each((i, elem) => {
            if (i < 5) { // Limit to 5 items
                const element = $(elem);
                const name = element.find(selectors.name).text().trim() || 'N/A';
                const price = element.find(selectors.price).text().trim() || 'N/A';
                let link = element.find(selectors.link).attr('href') || url;

                // Handle relative links
                if (link && !link.startsWith('http')) {
                    const baseUrl = new URL(url).origin;
                    link = baseUrl + link;
                }

                results.push({ name, price, link });
            }
        });

        return results;
    } catch (error) {
        console.error(`Error fetching data from ${url}:`, error.message);
        return [];
    }
};

const searchProduct = async (productName) => {
    const storeConfigs = {
        Walmart: {
            url: `https://www.walmart.com/search/?query=${encodeURIComponent(productName)}`,
            itemSelector: '[data-automation-id="product-results"] .search-result-gridview-item',
            selectors: {
                name: '.product-title-link span',
                price: '.price-main .visuallyhidden',
                link: '.product-title-link'
            }
        },
        Staples: {
            url: `https://www.staples.com/search?query=${encodeURIComponent(productName)}`,
            itemSelector: '.product-tile-wrapper',
            selectors: {
                name: '.standard-tile__title',
                price: '.standard-price',
                link: '.standard-tile__title a'
            }
        },
        BestBuy: {
            url: `https://www.bestbuy.com/site/searchpage.jsp?st=${encodeURIComponent(productName)}`,
            itemSelector: '.sku-item',
            selectors: {
                name: '.sku-header a',
                price: '.priceView-customer-price span',
                link: '.sku-header a'
            }
        },
        Amazon: {
            url: `https://www.amazon.com/s?k=${encodeURIComponent(productName)}`,
            itemSelector: '.s-result-item',
            selectors: {
                name: 'h2.a-size-mini a.a-link-normal span.a-text-normal',
                price: '.a-price .a-offscreen',
                link: 'h2.a-size-mini a.a-link-normal'
            }
        },
        eBay: {
            url: `https://www.ebay.com/sch/i.html?_nkw=${encodeURIComponent(productName)}`,
            itemSelector: '.s-item',
            selectors: {
                name: '.s-item__title',
                price: '.s-item__price',
                link: '.s-item__link'
            }
        },
        CanadianTire: {
            url: `https://www.canadiantire.ca/en/search-results.html?q=${encodeURIComponent(productName)}`,
            itemSelector: '.product-tile',
            selectors: {
                name: '.product-title',
                price: '.price',
                link: '.product-title a'
            }
        },
        HomeDepot: {
            url: `https://www.homedepot.com/s/${encodeURIComponent(productName)}`,
            itemSelector: '.pod-inner',
            selectors: {
                name: '.pod-plp__description a',
                price: '.price__numbers',
                link: '.pod-plp__description a'
            }
        }
    };

    const prices = {};

    for (const [store, config] of Object.entries(storeConfigs)) {
        const storePrices = await getPricesFromStore(
            config.url,
            config.itemSelector,
            config.selectors
        );
        prices[store] = storePrices;
    }

    return prices;
};

module.exports = { getPricesFromStore, searchProduct };
