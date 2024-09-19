const { PrismaClient } = require("@prisma/client");

class Database {
  constructor() {
    this.prisma = new PrismaClient();
  }

  async createRecord(model, data) {
    console.log(data);
    return await this.prisma[model].create({ data });
  }

  async getRecord(model, where) {
    return await this.prisma[model].findUnique({ where });
  }

  async updateRecord(model, where, data) {
    return await this.prisma[model].update({
      where,
      data,
    });
  }

  async deleteRecord(model, where) {
    return await this.prisma[model].delete({ where });
  }

  async getAllRecords(model) {
    return await this.prisma[model].findMany();
  }

  async close() {
    await this.prisma.$disconnect();
  }
}

module.exports = Database;
