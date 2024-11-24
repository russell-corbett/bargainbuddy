const BestBuyService = require('./BestBuyService');

async function testBestBuyService() {
  const bestBuyService = new BestBuyService();
  const productName = '600603167720';
  const searchType = 'upc'; // You can change this to 'upc' or 'modelNumber' as needed

  try {
    console.log(`Searching for product: ${productName} with search type: ${searchType}`);
    const result = await bestBuyService.searchBestBuy(productName, searchType);
    console.log('Search Result:', result);
  } catch (error) {
    console.error('Error during test:', error.message);
  }
}

testBestBuyService();
