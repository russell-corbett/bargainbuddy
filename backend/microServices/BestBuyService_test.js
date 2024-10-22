const BestBuyService = require('./BestBuyService');

const bestBuyService = new BestBuyService();

bestBuyService.fetchProductDetails().then(productDetails => {
    console.log(productDetails);
}).catch(error => {
    console.error('Error:', error.message);
});