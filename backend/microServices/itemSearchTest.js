const ItemSearchService = require('./itemSearchService');

async function testItemSearchService() {
  const itemSearchService = new ItemSearchService();
  const query = '600603167720'; // You can change this to a model number or UPC or productName (upc: 600603167720, modelNumber: "920-003376"
  const email = 'test@example.com'; // Use a test email
  const searchType = 'upc'; // You can change this to 'upc' or 'modelNumber' or 'productName'

  try {
    console.log(`Searching for product: ${query} with search type: ${searchType}`);
    const result = await itemSearchService.searchAndStoreItem(query, email, searchType);
    console.log('Search and Store Result:', result);
  } catch (error) {
    console.error('Error during test:', error.message);
  }
}

testItemSearchService();