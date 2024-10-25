const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const cors = require("cors");
const Database = require("./database");
const userRoutes = require("./api/endpoints/user/userRoutes");
const itemRoutes = require("./api/endpoints/item/itemRoutes");
const priceRoutes = require("./api/endpoints/price/priceRoutes");
const trendRoutes = require("./api/endpoints/trend/trendRoutes");
const BestBuyService = require("./microServices/BestBuyService"); // Corrected path

const app = express();
const port = 3001;
const server = http.createServer(app);
const io = socketIO(server, {
	cors: {
		origin: "http://localhost:3000",
		methods: ["GET", "POST"],
	},
});

const db = Database;

const bestBuyApiRef = new BestBuyService();

// Enable CORS for all routes
app.use(cors());

app.use(express.json());
app.use(userRoutes);
app.use(itemRoutes);
app.use(priceRoutes);
app.use(trendRoutes);

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

	socket.on("addToWishlist", (data) => {
		// console.log(data.modelNumber);
		bestBuyApiRef.searchBestBuy(data.modelNumber);
	});

	socket.on("modelNumber", (data) => {
		console.log("ModelNumber event");
	});
});

server.listen(port, () => {
	console.log("Server is listening.");
});
