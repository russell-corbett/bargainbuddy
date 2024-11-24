const EbayService = require('./EbayService');

async function testEbayService() {
  const ebayService = new EbayService();
  const productName = 'samsung fridge';

  try {
    const result = await ebayService.searchEbay(productName);
    console.log('Search Result:', result);
  } catch (error) {
    console.error('Error during test:', error.message);
  }
}

testEbayService();