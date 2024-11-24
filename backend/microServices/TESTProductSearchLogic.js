const ProductSearchLogic = require('./ProductSearchLogic');

async function testProductSearchLogic() {
  const productSearchLogic = new ProductSearchLogic();
  const query = '600603167720'; // You can change this to a model number or UPC or productName (upc: 600603167720, modelNumber: "920-003376"
  const searchType = 'upc'; // You can change this to 'upc' or 'modelNumber' or productName

  try {
    console.log(`Searching for product: ${query} with search type: ${searchType}`);
    const result = await productSearchLogic.searchProduct(query, searchType);
    console.log('Search Result:', result);
  } catch (error) {
    console.error('Error during test:', error.message);
  }
}

testProductSearchLogic();