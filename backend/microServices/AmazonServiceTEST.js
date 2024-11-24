const AmazonService = require('./AmazonService');

async function testAmazonService() {
  const amazonService = new AmazonService();
  const productName = 'Lenovo ThinkPad L13 Yoga 13.3" Touchscreen FHD 2-in-1 Business Laptop,';

  try {
    const result = await amazonService.searchAmazon(productName);
    console.log('Search Result:', result);
  } catch (error) {
    console.error('Error during test:', error.message);
  }
}

testAmazonService();