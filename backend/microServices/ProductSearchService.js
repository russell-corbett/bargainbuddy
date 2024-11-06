// services/ProductSearchService.js
const AmazonService = require('./AmazonService');
const BestBuyService = require('./BestBuyService');
const WalmartService = require('./WalmartService');
const EbayService = require('./EbayService');

class ProductSearchService {
  constructor() {
    this.amazonService = new AmazonService();
    this.bestBuyService = new BestBuyService();
    this.walmartService = new WalmartService();
    this.ebayService = new EbayService();
  }

  async searchProduct(query) {
    let productName = null;
    let bestBuyResult = null;
    let walmartResult = null;

    // Try to get product name from BestBuy
    bestBuyResult = await this.bestBuyService.searchBestBuy(query);
    if (bestBuyResult && bestBuyResult.name) {
      productName = bestBuyResult.name;
    }

    // If no product name from BestBuy, try Walmart
    if (!productName) {
      walmartResult = await this.walmartService.searchWalmart(query);
      if (walmartResult && walmartResult.name) {
        productName = walmartResult.name;
      }
    }

    // If still no product name, assume query is a product name
    if (!productName) {
      productName = query;
    }

    // Search Amazon and eBay using the product name
    const [amazonResult, ebayResult] = await Promise.all([
      this.amazonService.searchAmazon(productName),
      this.ebayService.searchEbay(productName),
    ]);

    const results = [];

    if (bestBuyResult) results.push({ store: 'BestBuy', ...bestBuyResult });
    if (walmartResult) results.push({ store: 'Walmart', ...walmartResult });
    if (amazonResult) results.push({ store: 'Amazon', ...amazonResult });
    if (ebayResult) results.push({ store: 'eBay', ...ebayResult });

    return results;
  }
}

module.exports = ProductSearchService;
