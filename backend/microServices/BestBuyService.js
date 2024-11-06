const axios = require('axios');

class BestBuyService {
  constructor() {
    this.apiKey = process.env.BESTBUY_API_KEY || 'yAXuIGzr8Lnmm4pXN9MX2FQ5';
  }

  async fetchData(url) {
    try {
      const response = await axios.get(url, { timeout: 10000 });
      return response.data;
    } catch (error) {
      console.error('Error fetching data from BestBuy:', error.message);
      console.error('Error details:', error.response ? error.response.data : 'No response data');
      return null;
    }
  }

  async searchBestBuy(query, searchType) {
    try {
      let productDetails = null;

      switch (searchType) {
        case 'upc':
          productDetails = await this.fetchProductByUPC(query);
          break;
        case 'modelNumber':
          productDetails = await this.fetchProductByModelNumber(query);
          break;
        case 'productName':
          productDetails = await this.fetchProductByName(query);
          break;
        default:
          throw new Error(`Invalid search type: ${searchType}`);
      }

      return productDetails;
    } catch (error) {
      console.error('Error in searchBestBuy:', error.message);
      return null;
    }
  }

  async fetchProductByUPC(upc) {
    const url = `https://api.bestbuy.com/v1/products(upc=${upc})?apiKey=${this.apiKey}&format=json`;
    const data = await this.fetchData(url);

    if (data && data.products && data.products.length > 0) {
      const product = data.products[0];
      return this.formatProductDetails(product);
    } else {
      return null;
    }
  }

  async fetchProductByModelNumber(modelNumber) {
    const url = `https://api.bestbuy.com/v1/products(modelNumber="${encodeURIComponent(modelNumber)}")?apiKey=${this.apiKey}&format=json`;
    const data = await this.fetchData(url);

    if (data && data.products && data.products.length > 0) {
      const product = data.products[0];
      return this.formatProductDetails(product);
    } else {
      return null;
    }
  }

  async fetchProductByName(productName) {
    const url = `https://api.bestbuy.com/v1/products((search=${encodeURIComponent(productName)}))?apiKey=${this.apiKey}&sort=name.asc&show=sku,name,salePrice,image,url,modelNumber,upc&format=json`;
    const data = await this.fetchData(url);

    if (data && data.products && data.products.length > 0) {
      const product = data.products[0];
      return this.formatProductDetails(product);
    } else {
      return null;
    }
  }
  
  formatProductDetails(product) {
    return {
      name: product.name || null,
      price: product.salePrice || null,
      link: product.url || null,
      image: product.image || null,
      modelNumber: product.modelNumber || null,
      upc: product.upc || null, // Added UPC field
    };
  }
}

module.exports = BestBuyService;
