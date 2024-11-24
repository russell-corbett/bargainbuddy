const AmazonService = require('./AmazonService');
const BestBuyService = require('./BestBuyService');
const WalmartService = require('./WalmartService');
const EbayService = require('./EbayService');

class ProductSearchLogic {
  constructor() {
    this.amazonService = new AmazonService();
    this.bestBuyService = new BestBuyService();
    this.walmartService = new WalmartService();
    this.ebayService = new EbayService();
  }

  async searchProduct(query, type) {
    let bestBuyResult = null;
    let walmartResult = null;
	  let productUPC = null;
    let productModelNumber = null;

    let formattedType = type.toLowerCase();

    // try Walmart
    walmartResult = await this.walmartService.searchWalmart(query, formattedType);
    if (walmartResult && walmartResult.name) {
      productUPC = walmartResult.upc;
      productModelNumber = walmartResult.modelNumber;

      if (productUPC) {
        bestBuyResult = await this.bestBuyService.searchBestBuy(productUPC, "upc");
      }
      if (!bestBuyResult && productModelNumber) {
        bestBuyResult = await this.bestBuyService.searchBestBuy(productModelNumber, "modelnumber");
      }
    }

    // Try to get product name from BestBuy
    if (!bestBuyResult) {
      bestBuyResult = await this.bestBuyService.searchBestBuy(query, formattedType);
      if (bestBuyResult && bestBuyResult.name) {
        productUPC = bestBuyResult.upc;
        productModelNumber = bestBuyResult.modelNumber;

        if (!walmartResult) {
          if (productUPC) {
            walmartResult = await this.walmartService.searchWalmart(productUPC, "upc");
          }
          if (productModelNumber) {
            walmartResult = await this.walmartService.searchWalmart(productModelNumber, "modelnumber");
          }
        }
      }
    }

    const results = [];

    if (bestBuyResult) results.push({ store: 'bestbuy', ...bestBuyResult });
    if (walmartResult) results.push({ store: 'walmart', ...walmartResult });
    return results;
  }
}

module.exports = ProductSearchLogic;