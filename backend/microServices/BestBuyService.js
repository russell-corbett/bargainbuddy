const axios = require('axios');

class BestBuyService {
    constructor() {
        this.apiKey = 'yAXuIGzr8Lnmm4pXN9MX2FQ5';
        // this.modelNumber = '981-001256';
    }

    async fetchData(url) {
        try {
            const response = await axios.get(url, { timeout: 10000 });
            return response.data;
        } catch (error) {
            console.error('Error fetching data:', error.message);
            return null;
        }
    }

    async fetchProductDetails(mn) {
        const productUrl = `https://api.bestbuy.com/v1/products(modelNumber=${mn})?apiKey=${this.apiKey}&format=json`;
        const productData = await this.fetchData(productUrl);

        if (productData && productData.products && productData.products.length > 0) {
            const product = productData.products[0];
            const productDetails = {
                name: product.name,
                sku: product.sku,
                price: product.salePrice,
                productPicture: product.image
            };
            return productDetails;
        } else {
            throw new Error('Product information not found');
        }
    }

    async fetchHistoricalPrices(sku) {
        const historicalPricesUrl = `https://api.bestbuy.com/v1/products/${sku}/priceHistory?apiKey=${this.apiKey}&format=json`;
        const historicalPricesData = await this.fetchData(historicalPricesUrl);

        if (historicalPricesData && historicalPricesData.priceHistory) {
            return historicalPricesData.priceHistory;
        } else {
            return [];
        }
    }

    async searchBestBuy(model_number) {
        try {
            const productDetails = await this.fetchProductDetails(model_number);
            const historicalPrices = await this.fetchHistoricalPrices(productDetails.sku);
            return {
                ...productDetails,
                historicalPrices: historicalPrices
            };
        } catch (error) {
            console.error('Error in searchBestBuy:', error.message);
            return { error: error.message };
        }
    }
}

module.exports = BestBuyService;

