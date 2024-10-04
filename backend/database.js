const { PrismaClient } = require("@prisma/client");

class Database {
  constructor() {
    this.prisma = new PrismaClient();
  }

  async register(email, password) {
    try {
      const existingUser = await this.prisma.user.findUnique({
        where: { email },
      });

      if (existingUser) {
        throw new Error("User already exists");
      }
    } catch (error) {
      throw new Error(`Registration failed: ${error.message}`);
    }
  }
}

module.exports = Database;
