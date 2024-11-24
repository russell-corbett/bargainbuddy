const { PrismaClient } = require('@prisma/client');
const ProductSearchLogic = require('./ProductSearchLogic');

class ItemSearchService {
  constructor() {
    this.searchService = new ProductSearchLogic();
    this.prisma = new PrismaClient();
    console.log('Item search service constructed');
  }

  async searchAndStoreItem(query, email, searchType) {
    try {
      const results = await this.searchService.searchProduct(query, searchType);

      if (results.length === 0) {
        return { message: 'No products found' };
      }

      const user = await this.prisma.user.findUnique({ where: { email } });
      if (!user) {
        return { message: 'User not found' };
      }

      for (const result of results) {
        const { store, name, price, link, image, modelNumber, upc } = result;
        const uniqueId = modelNumber || upc || name;

        let item = await this.prisma.item.findUnique({ where: { uniqueId } });
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
          // Update currentBestPrice if the new price is lower
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
}

module.exports = ItemSearchService;
