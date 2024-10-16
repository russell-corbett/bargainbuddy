const BestBuyService = require('./BestBuyService');

const bestBuyService = new BestBuyService();

bestBuyService.searchBestBuy().then(productDetails => {
    console.log(productDetails);
}).catch(error => {
    console.error('Error:', error);
});
