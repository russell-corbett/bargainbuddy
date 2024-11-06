// services/WalmartService.js
const axios = require('axios');

class WalmartService {
  constructor() {
    this.apiKey = process.env.WALMART_API_KEY;
  }

  async searchWalmart(query, searchType) {
    let url;

    switch (searchType) {
      case 'upc':
        // UPC code search
        url = `https://api.walmartlabs.com/v1/items?apiKey=${this.apiKey}&upc=${query}`;
        break;
      case 'modelNumber':
        // Walmart API may not support direct model number search; need to search by keyword
        url = `https://api.walmartlabs.com/v1/search?apiKey=${this.apiKey}&query=${encodeURIComponent(query)}`;
        break;
      case 'productName':
        url = `https://api.walmartlabs.com/v1/search?apiKey=${this.apiKey}&query=${encodeURIComponent(query)}`;
        break;
      default:
        throw new Error(`Invalid search type: ${searchType}`);
    }

    const data = await this.fetchData(url);

    if (data && data.items && data.items.length > 0) {
      const product = data.items[0];
      return {
        name: product.name,
        price: product.salePrice || product.msrp,
        link: product.productUrl,
        image: product.largeImage || product.mediumImage || product.thumbnailImage,
        modelNumber: product.modelNumber || null,
        id: product.itemId.toString(),
      };
    } else {
      return null;
    }
  }

  async fetchData(url) {
    try {
      const response = await axios.get(url, { timeout: 10000 });
      return response.data;
    } catch (error) {
      console.error('Error fetching data from Walmart:', error.message);
      return null;
    }
  }
}

module.exports = WalmartService;
