const { PrismaClient } = require("@prisma/client");

class Database {
	constructor() {
		this.prisma = new PrismaClient();
	}

	async getRecord(model, where, options = {}) {
		try {
			return await this.prisma[model].findFirst({
				where: where,
				...options, // Allows to include relational data like Item.priceHistory (see getPrices function for example)
			});
		} catch (error) {
			throw new Error(`Error getting record: ${error.message}`);
		}
	}

	async createRecord(model, data) {
		try {
			return await this.prisma[model].create({ data });
		} catch (error) {
			throw new Error(`Error creating record: ${error.message}`);
		}
	}

	async updateRecord(model, where, data) {
		try {
			return await this.prisma[model].update({ where, data });
		} catch (error) {
			throw new Error(`Error updating record: ${error.message}`);
		}
	}

	async deleteRecord(model, where) {
		try {
			return await this.prisma[model].delete({ where });
		} catch (error) {
			throw new Error(`Error deleting record: ${error.message}`);
		}
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

module.exports = new Database();
