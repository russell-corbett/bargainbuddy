const BestBuyService = require('./BestBuyService');

async function testBestBuyService() {
  const bestBuyService = new BestBuyService();
  const productName = 'Laptop Lenovo Yoga';
  const searchType = 'productName'; // You can change this to 'upc' or 'modelNumber' as needed

  try {
    const result = await bestBuyService.searchBestBuy(productName, searchType);
    console.log('Search Result:', result);
  } catch (error) {
    console.error('Error during test:', error.message);
  }
}

testBestBuyService();