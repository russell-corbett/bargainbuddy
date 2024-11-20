const axios = require('axios'); // to make HTTP requests
const cheerio = require('cheerio'); //parse and manipulate HTML.

class AmazonService {
  constructor() {
  }

  async searchAmazon(productName) {
    const url = `https://www.amazon.ca/s?k=${encodeURIComponent(productName)}`;
    const itemSelector = '.s-search-results .s-result-item';
    const selectors = {
      name: 'h2.a-size-mini a.a-link-normal span.a-text-normal, h2.a-size-mini a.a-link-normal span',
      price: '.a-price .a-offscreen',
      link: 'h2.a-size-mini a.a-link-normal',
      image: '.s-image',
    };

    try {
      const { data } = await axios.get(url, {
        headers: { 'User-Agent': 'Mozilla/5.0' },
      });
      const $ = cheerio.load(data);
      let bestItem = null;
      let bestScore = 0;

      $(itemSelector).each((i, elem) => { //loop through each item matching itemSelector using cheerio
        const element = $(elem);
        const name = element.find(selectors.name).text().trim() || null;
        let price = element.find(selectors.price).first().text().trim() || null;
        let link = element.find(selectors.link).attr('href') || null;
        const image = element.find(selectors.image).attr('src') || null;

        if (!name || !link) {
          // Skip items without name or link
          return;
        }

        if (link && !link.startsWith('http')) {
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
          price = price.replace(/[^0-9.,]/g, '').replace(',', '.');
          price = parseFloat(price);
        }

        const score = [name, price, link, image].filter(Boolean).length;

        if (score > bestScore) {
          bestItem = { store: 'Amazon', name, price, link, image, modelNumber: null, upc: null, id };
          bestScore = score;
        }

        if (score === 4) return false; // Exit loop early if perfect match
      });

      return bestItem;
    } catch (error) {
      console.error('Error searching Amazon:', error.message);
      return null;
    }
  }
}

module.exports = AmazonService;
