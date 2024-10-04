/*
//Holding these until I find where I put them, required for linking to Firebase
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA86tDTFZ3MlfOnkOIVC5-rEJv3eIKKe8Y",
  authDomain: "bargainbuddy-99abb.firebaseapp.com",
  projectId: "bargainbuddy-99abb",
  storageBucket: "bargainbuddy-99abb.appspot.com",
  messagingSenderId: "735437299454",
  appId: "1:735437299454:web:f37a51ceeeef48a291cfaf",
  measurementId: "G-LQKS57DWDE"
};
*/


// Initialize Firebase


// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);


const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const Database = require("./database");

const ItemSearchService = require('./microServices/itemSearchService.js');



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

// User routes (Needs email and password)
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

app.post("/connectUserItem", async (req, res) => {
	const email = req.body.email;
	const user = await db.getRecord("User", { email });
	if (!user) {
		return res.status(400).json({ error: "User does not exist" });
	}
	const name = req.body.name;
	const modelNumber = req.body.modelNumber;
	const item = await db.getRecord("Item", { name, modelNumber });
	if (!item) {
		return res.status(400).json({ error: "Item does not exist" });
	}
	try {
		const record = await db.createRecord("UserItem", req.body);
		res.status(201).json(record);
	} catch (error) {
		res.status(500).json({ error: "Error creating record" });
	}
});

app.post("/disconnectUserItem", async (req, res) => {
	const email = req.body.email;
	const user = await db.getRecord("User", { email });
	if (!user) {
		return res.status(400).json({ error: "User does not exist" });
	}
	const name = req.body.name;
	const modelNumber = req.body.modelNumber;
	const item = await db.getRecord("Item", { name, modelNumber });
	if (!item) {
		return res.status(400).json({ error: "Item does not exist" });
	}
	try {
		const record = await db.deleteRecord("UserItem", req.body);
		res.status(201).json(record);
	} catch (error) {
		res.status(500).json({ error: "Error deleting record" });
	}
});

app.post("createPriceLog", async (req, res) => {
	const name = req.body.itemId;
	const store = req.body.store;
	const price = req.body.price;
	const item = await db.getRecord("Item", { itemId });
	if (!item) {
		return res.status(400).json({ error: "Item does not exist" });
	}
	try {
		const record = await db.createRecord("Price", req.body);
		res.status(201).json(record);
	} catch (error) {
		res.status(500).json({ error: "Error creating record" });
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

  socket.on("modelNumber", (data) => {
    console.log("ModelNumber event");
  });
});

server.listen(port, () => {
	console.log("Server is listening. ");
});
