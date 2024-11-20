const AmazonService = require('./AmazonService');

async function testAmazonService() {
  const amazonService = new AmazonService();
  const productName = 'Laptop Lenovo Yoga 370';

  try {
    const result = await amazonService.searchAmazon(productName);
    console.log('Search Result:', result);
  } catch (error) {
    console.error('Error during test:', error.message);
  }
}

testAmazonService();