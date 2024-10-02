const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const Database = require("./database");

const app = express();
const port = 3001;
const server = http.createServer(app);
const io = socketIO(server, {
	cors: {
		origin: "http://localhost:3000",
		methods: ["GET", "POST"],
	},
});

const db = new Database();

app.use(express.json());

app.post("/createUser", async (req, res) => {
  //Check to see if the email is unique
  const email = req.body.email;
  const user = await db.getRecord("User", { email });
  if (user) {
    return res.status(400).json({ error: "Email already exists" });
  }
  //check to see if the email is valid
  if (!email.includes("@") || !email.includes(".")) {
    return res.status(400).json({ error: "Email is not valid" });
  }
  //check to see if the password is secure
  const password = req.body.password;
  if (password.length < 8) {
    return res.status(400).json({ error: "Password is too short" });
  }
  if (!password.match(/[A-Z]/)) {
    return res.status(400).json({ error: "Password does not contain a capital letter" });
  }
	try {
		const record = await db.createRecord("User", req.body);
		res.status(201).json(record);
	} catch (error) {
		res.status(500).json({ error: "Error creating record" });
	}
});

app.post("/updateUser", async (req, res) => {
	const email = req.body.email;
	const user = await db.getRecord("User", { email });
	if (!user) {
		return res.status(400).json({ error: "Account does not exist" });
	}
	//check to see if the email is valid
	if (!email.includes("@") || !email.includes(".")) {
		return res.status(400).json({ error: "Email is not valid" });
	}

	//check to see if the password is secure
	const password = req.body.password;
	if (password.length < 8) {
		return res.status(400).json({ error: "Password is too short" });
	}
	if (!password.match(/[A-Z]/)) {
		return res.status(400).json({ error: "Password does not contain a capital letter" });
	}
	try {
		const record = await db.updateRecord("User", { email }, req.body);
		res.status(201).json(record);
	} catch (error) {
		res.status(500).json({ error: "Error updating record" });
	}
});

app.post("/deleteUser", async (req, res) => {
  const email = req.body.email;
  const user = await db.getRecord("User", { email });
  if (!user) {
    return res.status(400).json({ error: "Account does not exist" });
  }

	try {
		const record = await db.deleteRecord("User", req.body);
		res.status(201).json(record);
	} catch (error) {
		res.status(500).json({ error: "Error deleting record" });
	}
});

// Item routes (Needs name and model number)
app.post("/createItem", async (req, res) => {
	const name = req.body.name;
	const modelNumber = req.body.modelNumber;
	const item = await db.getRecord("Item", { name, modelNumber });
	if (item) {
		return res.status(400).json({ error: "Item already exists" });
	}
	try {
		const record = await db.createRecord("Item", req.body);
		res.status(201).json(record);
	} catch (error) {
		res.status(500).json({ error: "Error creating record" });
	}
});

app.post("/updateItem", async (req, res) => {
	const name = req.body.name;
	const modelNumber = req.body.modelNumber;
	const item = await db.getRecord("Item", { name, modelNumber });
	if (!item) {
		return res.status(400).json({ error: "Item does not exist" });
	}
	try {
		const record = await db.updateRecord("Item", { name, modelNumber }, req.body);
		res.status(201).json(record);
	} catch (error) {
		res.status(500).json({ error: "Error updating record" });
	}
});

// Close the database connection on server shutdown
process.on("SIGINT", async () => {
	await db.close();
	server.close(() => {
		console.log("Server closed");
		process.exit(0);
	});
});

app.get("/", (req, res) => {
	res.send("Hello World!");
});

io.on("connection", (socket) => {
	console.log(`New client connected ${socket.id}`);

	socket.on("disconnect", () => {
		console.log(`Client has disconnected ${socket.id}`);
	});
});

server.listen(port, () => {
	console.log("Server is listening. ");
});
