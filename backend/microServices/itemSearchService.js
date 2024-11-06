// ItemSearchService.js
const { PrismaClient } = require('@prisma/client');
const AmazonService = require('./AmazonService.js');
const BestBuyService = require('./BestBuyService.js');
const WalmartService = require('./WalmartService.js');
const EbayService = require('./EbayService.js');

class ItemSearchService {
  constructor() {
    this.amazonService = new AmazonService();
    this.bestBuyService = new BestBuyService();
    this.walmartService = new WalmartService();
    this.ebayService = new EbayService();
    this.prisma = new PrismaClient();
    console.log('Item search service constructed');
  }

  async searchAndStoreItem(query, email, searchType) {
    try {
      const results = await this.searchProduct(query, searchType);

      if (results.length === 0) {
        return { message: 'No products found' };
      }

      // Get user
      const user = await this.prisma.user.findUnique({ where: { email } });

      if (!user) {
        return { message: 'User not found' };
      }

      for (const result of results) {
        const { store, name, price, link, image, modelNumber, upc } = result;

        const uniqueId = modelNumber || upc || name;

        // Find or create the item
        let item = await this.prisma.item.findUnique({
          where: { uniqueId },
        });

        if (!item) {
          item = await this.prisma.item.create({
            data: {
              uniqueId,
              name,
              modelNumber: modelNumber || null,
              description: null,
              itemImg: image,
              currentBestPrice: parseFloat(price),
              currentStore: store,
              link,
              priceHistory: {
                create: [{ price: parseFloat(price), date: new Date(), store }],
              },
              storeIds: {
                create: [{ store, storeId: upc }],
              },
            },
          });
        } else {
          // Update item price if necessary
          if (parseFloat(price) < item.currentBestPrice) {
            await this.prisma.item.update({
              where: { id: item.id },
              data: {
                currentBestPrice: parseFloat(price),
                currentStore: store,
              },
            });
          }

          // Add to price history
          await this.prisma.price.create({
            data: {
              price: parseFloat(price),
              date: new Date(),
              store,
              itemId: item.id,
            },
          });
        }

        // Associate the item with the user
        await this.prisma.userItem.upsert({
          where: {
            userId_itemId: { userId: user.id, itemId: item.id },
          },
          update: {},
          create: {
            userId: user.id,
            itemId: item.id,
          },
        });
      }

      return { message: 'Item prices updated successfully' };
    } catch (error) {
      console.error('Error searching and storing item:', error);
      throw new Error(`Error searching and storing item: ${error.message}`);
    }
  }

  async searchProduct(query, searchType) {
    let productName = null;
    let bestBuyResult = null;
    let walmartResult = null;

    // Try to get product name from BestBuy
    bestBuyResult = await this.bestBuyService.searchBestBuy(query, searchType);
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

module.exports = ItemSearchService;
