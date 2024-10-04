const ItemSearchService = require("./itemSearchService.js");

(async () => {
  console.log("Starting ItemSearchService test...");

  const itemSearchService = new ItemSearchService();

  try {
    console.log("Searching for item...");
    const result = await itemSearchService.searchAndStoreItem("walmart123");
    console.log(result);
  } catch (error) {
    console.error("Error:", error);
  }
})();
