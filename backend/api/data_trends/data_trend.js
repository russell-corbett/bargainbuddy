const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class DataTrends {
  async getPreviousPrices(itemId) {
    const prices = await prisma.price.findMany({
      where: { itemId },
      orderBy: { date: 'asc' }
    });
    return prices.map(price => ({ date: price.date, price: price.price }));
  }

  async predictFuturePrices(itemId) {
    const prices = await this.getPreviousPrices(itemId);
    // Simple prediction logic (average of previous prices)
    const avgPrice = prices.reduce((sum, p) => sum + p.price, 0) / prices.length;
    const futurePrices = Array(5).fill().map((_, i) => ({
      date: new Date(Date.now() + (i + 1) * 30 * 24 * 60 * 60 * 1000), // Next 5 months
      price: avgPrice
    }));
    return futurePrices;
  }
}

module.exports = DataTrends;
