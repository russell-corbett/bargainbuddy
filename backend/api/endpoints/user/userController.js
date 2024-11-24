const db = require("../../../database");
const bcrypt = require('bcrypt');
const jwt = require ('jsonwebtoken');

exports.loginUser = async (req, res) => {
	const { email, password } = req.body;
  
	if (!email || !password) {
	  return res.status(400).json({ error: "Email and password are required." });
	}

	try {
	  const user = await db.getRecord("User", { email });
	  if (!user) {
		//Dev comment, remove in push
		return res.status(401).json({ error: "No user found with this email." }); 
	  }
  
	  const isPasswordValid = await bcrypt.compare(password, user.password);
	  if (!isPasswordValid) {
		//Dev comment, remove in push
		return res.status(401).json({ error: "Passwords do not match." }); // Generic error
	  }

	  const token = jwt.sign({ id: user.id, email: user.email }, 'your_secret_key', {
		expiresIn: '1h',
	  });
  
	  // Maybe respond with token?? Need to figure out with Lance tomorrow
	  res.status(200).json({
		message: "Login successful.",
		user: { id: user.id, email: user.email },
		token,
	  });
	} catch (error) {
	  console.error("Error during login:", error);
	  res.status(500).json({ error: "An error occurred during login." });
	}
  };

exports.createUser = async (req, res) => {
	console.log("Running...")
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
		res.status(200).json(record);
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
