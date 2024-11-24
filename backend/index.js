const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const cors = require("cors");
const Database = require("./database");
const userRoutes = require("./api/endpoints/user/userRoutes");
const itemRoutes = require("./api/endpoints/item/itemRoutes");
const { connectUserItem } = require("./api/endpoints/user/userController");
const { createItem } = require("./api/endpoints/item/itemController");
const priceRoutes = require("./api/endpoints/price/priceRoutes");
const trendRoutes = require("./api/endpoints/trend/trendRoutes");
const ProductSearch = require("./microServices/ProductSearchService");
const axios = require("axios");

const { getUserItems } = require(".//api/endpoints/user/userController");

const app = express();
const port = 3001;
const server = http.createServer(app);
const io = socketIO(server, {
	cors: {
		origin: "http://localhost:3000",
		methods: ["GET", "POST"],
	},
});

let clientsConnected = 0;

const db = Database;

const productSearch = new ProductSearch();

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
	clientsConnected++;
	console.log(`New client connected ${socket.id}. Total Clients Connected: ${clientsConnected}`);

	socket.on("disconnect", () => {
		clientsConnected--;
		console.log(`Client has disconnected ${socket.id}`);
	});

	socket.on("addToWishlist", async (data) => {
		product = await productSearch.searchProduct(data.modelNumber, "modelNumber");
		// prisma.add(product, userToken)
		const item_body = {
			name: product[0].name,
			modelNumber: data.modelNumber,
			currentBestPrice: product[0].price,
			itemImg: product[0].image,
		};

		const userItem_body = {
			email: "zrcoffey@mun.ca",
			modelNumber: data.modelNumber,
		};
		await createItem({ body: item_body }, { status: () => ({ json: () => {} }) });
		await connectUserItem({ body: userItem_body }, { status: () => ({ json: () => {} }) });
	});

	socket.on("getUserItems", async (data) => {
		try {
			const req = { body: data };
			const res = {
				status: (statusCode) => ({
					json: (response) => {
						socket.emit("userItemsResponse", { statusCode, data: response });
					},
				}),
				json: (response) => {
					socket.emit("userItemsResponse", { statusCode: 200, data: response });
				},
			};

			await getUserItems(req, res);
		} catch (error) {
			console.error("Socket Error:", error);
			socket.emit("userItemsResponse", {
				statusCode: 500,
				data: { error: "An unexpected error occurred." },
			});
		}
	});
});

server.listen(port, () => {
	console.log("Server is listening.");
});
