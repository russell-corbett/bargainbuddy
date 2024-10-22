const axios = require('axios');

class BestBuyService {
    constructor() {
        this.apiKey = 'yAXuIGzr8Lnmm4pXN9MX2FQ5'; // Ensure this is a valid API key
        this.modelNumber = '920-003376';
    }

    async fetchData(url) {
        try {
            const response = await axios.get(url, {
                timeout: 10000,
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
                }
            });
            return response.data;
        } catch (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.error('Error fetching data:', error.response.status, error.response.statusText);
            } else if (error.request) {
                // The request was made but no response was received
                console.error('Error fetching data: No response received', error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.error('Error fetching data:', error.message);
            }
            return null;
        }
    }

    async fetchProductDetails() {
        const productUrl = `https://api.bestbuy.com/v1/products(modelNumber=${this.modelNumber})?apiKey=${this.apiKey}&format=json`;
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
}

module.exports = BestBuyService;