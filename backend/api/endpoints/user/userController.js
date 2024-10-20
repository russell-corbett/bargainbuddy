const db = require("../../../database");

exports.createUser = async (req, res) => {
	const email = req.body.email;
	const user = await db.getRecord("user", { email });
	if (user) {
		return res.status(400).json({ error: "Email already exists" });
	}
	if (!email.includes("@") || !email.includes(".")) {
		return res.status(400).json({ error: "Email is not valid" });
	}
	const password = req.body.password;
	if (password.length < 8) {
		return res.status(400).json({ error: "Password is too short" });
	}
	if (!password.match(/[A-Z]/)) {
		return res.status(400).json({ error: "Password does not contain a capital letter" });
	}
	try {
		const record = await db.createRecord("user", req.body);
		res.status(201).json(record);
	} catch (error) {
		res.status(500).json({ error: "Error creating record" });
	}
};

exports.updateUser = async (req, res) => {
	const email = req.body.email;
	const user = await db.getRecord("user", { email });
	if (!user) {
		return res.status(400).json({ error: "Account does not exist" });
	}
	if (!email.includes("@") || !email.includes(".")) {
		return res.status(400).json({ error: "Email is not valid" });
	}
	const password = req.body.password;
	if (password.length < 8) {
		return res.status(400).json({ error: "Password is too short" });
	}
	if (!password.match(/[A-Z]/)) {
		return res.status(400).json({ error: "Password does not contain a capital letter" });
	}
	try {
		const record = await db.updateRecord("user", { email }, req.body);
		res.status(201).json(record);
	} catch (error) {
		res.status(500).json({ error: "Error updating record" });
	}
};

exports.deleteUser = async (req, res) => {
	const email = req.body.email;
	const user = await db.getRecord("user", { email });
	if (!user) {
		return res.status(400).json({ error: "Account does not exist" });
	}
	try {
		const record = await db.deleteRecord("user", req.body);
		res.status(201).json(record);
	} catch (error) {
		res.status(500).json({ error: "Error deleting record" });
	}
};

exports.connectUserItem = async (req, res) => {
	const email = req.body.email;
	const modelNumber = req.body.modelNumber;
	try {
		const user = await db.getRecord("user", { email });
		if (!user) {
			return res.status(400).json({ error: "User does not exist" });
		}
		const item = await db.getRecord("item", { modelNumber });
		if (!item) {
			return res.status(400).json({ error: "Item does not exist" });
		}
		const userItem = await db.getRecord("userItem", {
			userId: user.id,
			itemId: item.id,
		});
		if (userItem) {
			return res.status(400).json({ error: "UserItem already exists" });
		}
		const record = await db.createRecord("userItem", {
			userId: user.id,
			itemId: item.id,
		});
		res.status(201).json(record);
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: "Error creating record" });
	}
};
exports.disconnectUserItem = async (req, res) => {
	const email = req.body.email;
	const user = await db.getRecord("User", { email });
	if (!user) {
		return res.status(400).json({ error: "User does not exist" });
	}
	const modelNumber = req.body.modelNumber;
	const item = await db.getRecord("Item", { modelNumber });
	if (!item) {
		return res.status(400).json({ error: "Item does not exist" });
	}
	try {
		const record = await db.deleteRecord("UserItem", req.body);
		res.status(201).json(record);
	} catch (error) {
		res.status(500).json({ error: "Error deleting record" });
	}
};

exports.getUserItems = async (req, res) => {
	const email = req.body.email;
	try {
		const user = await db.getRecord("User", { email });
		if (!user) {
			return res.status(400).json({ error: "User does not exist" });
		}
		const userItems = await db.prisma.userItem.findMany({
			where: { userId: user.id },
			include: { item: true },
		});
		res.status(200).json(userItems);
	} catch (error) {
		res.status(500).json({ error: "Error fetching user items" });
	}
};
