require('dotenv').config();
const jwt = require("jsonwebtoken")
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

const { getUserItems } = require(".//api/endpoints/user/userController");
const { getPrices, addPrice } = require(".//api/endpoints/price/priceController");

const app = express();
const port = 3001;
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});


const generateToken = (email) => {
  return jwt.sign({ email }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
};

const loginUser = async ({email, password}) => {
  try{
    console.log("Logging in user:". email);

    const user = await db.getRecord("user", { email });
    if (!user){
      throw new Error("No account associated with email")
    }
    
    if (password != user.password){
      throw new Error("Password incorrect")
    }

    const token = generateToken(email);
    return token;
  }
  catch(error){
    console.error("Error during login:", error);
  }
};
 
// Rewritten to not rely on HTTP res object
const createUser = async ({ email, password, username}) => {
  try {
    console.log("Creating user with email:", email);

    // Check if the user already exists in the database
    const user = await db.getRecord("user", { email });
    if (user) {
      throw new Error("Email already exists");
    }

    // Additional validation checks for email and password
    if (!email.includes("@") || !email.includes(".")) {
      throw new Error("Email is not valid");
    }

    if (password.length < 8) {
      throw new Error("Password is too short");
    }

    if (!password.match(/[A-Z]/)) {
      throw new Error("Password does not contain a capital letter");
    }

    // Create the user in the database (assuming password is plain text for now)
    const newUser = await db.createRecord("user", { email, password, username});

    console.log("User created successfully:", newUser);
    return newUser; // Return the newly created user or relevant response

  } catch (error) {
    console.error("Error during user creation:", error.message);
    throw error; // Rethrow error if needed, or handle accordingly
  }
};


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
		product = await productSearch.searchProduct(data.query, "modelnumber"); //change "modelNumber" to searchType
		// prisma.add(product, userToken)

		let betterPrice = 0;
		if(product[1]) { //found price from walmart and bestbuy
			if (product[0].price < product[1].price) {
				betterPrice = 0;
			} else {
				betterPrice = 1;
			}

			const item_body = {
				name: product[betterPrice].name,
				modelNumber: product[betterPrice].modelNumber,
				currentBestPrice: product[betterPrice].price,
				itemImg: product[betterPrice].image,
				currentStore: product[betterPrice].store
			};

			const userItem_body = {
				email: "zrcoffey@mun.ca",
				modelNumber: data.modelNumber,
			};

			await createItem({ body: item_body }, { status: () => ({ json: () => {} }) });
			await connectUserItem({ body: userItem_body }, { status: () => ({ json: () => {} }) });

			itemId_ = await Database.getRecord("Item", {modelNumber: product[betterPrice].modelNumber});

			const price_body_0 = {
				store: product[0].store,
				price: product[0].price,
				itemId: itemId_.id,
			}

			await addPrice({ body: price_body_0 }, { status: () => ({ json: () => {} }) });

			const price_body_1 = {
				store: product[1].store,
				price: product[1].price,
				itemId: itemId_.id
			}

			await addPrice({ body: price_body_1 }, { status: () => ({ json: () => {} }) });

		} else if (product[0]) {
			const item_body = {
				name: product[0].name,
				modelNumber: product[0].modelNumber,
				currentBestPrice: product[0].price,
				itemImg: product[0].image,
				currentStore: product[0].store
			};

			const userItem_body = {
				email: "zrcoffey@mun.ca",
				modelNumber: data.modelNumber,
			};

			await createItem({ body: item_body }, { status: () => ({ json: () => {} }) });
			await connectUserItem({ body: userItem_body }, { status: () => ({ json: () => {} }) });

			itemId_ = await Database.getRecord("Item", {modelNumber: product[0].modelNumber});

			const price_body_0 = {
				store: product[0].store,
				price: product[0].price,
				itemId: itemId_.id
			}

			await addPrice({ body: price_body_0 }, { status: () => ({ json: () => {} }) });
		}
		else {
			console.warn("Product not found.")
		}
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

  socket.on("createUser", ({email, password, username}) => {
    console.log('hello');
    createUser({email, password, username});
  })
  
  socket.on("loginUser", ({email, password}) => {
    console.log("Socket received log-in request");
    loginUser({email, password});
  })

  socket.on("loginUser", ({email, password}) => {
    console.log("Socket received log-in request");
    const token = loginUser({email, password});
    if (token){
      try{
        console.log("User found, and logged in")
        socket.emit("loginResponse", {
        message: "Log-in attempt successful.",
        token
      })
      }
      catch(error)
      {
        console.log("Error logging in user.");
        socket.emit("loginResponse", {error: "An error has occurred during login."});
      }
    }
  })

//   socket.on("modelNumber", (data) => {
//     console.log("ModelNumber event");
//   });
  socket.on("getPrices", async (data) => {
    try {
      const req = { body: data }; // Mock the request object
      const res = {
        status: (statusCode) => ({
          json: (response) => {
            socket.emit("priceDataResponse", {
              statusCode,
              productId: data.id, // Pass back the product ID
              prices: response.Prices || [],
            });
          },
        }),
        json: (response) => {
          socket.emit("priceDataResponse", {
            statusCode: 200,
            productId: data.id, // Pass back the product ID
            prices: response.Prices || [],
          });
        },
      };

      await getPrices(req, res); // Call the `getPrices` function
    } catch (error) {
      console.error(`Error fetching prices for product ID ${data.id}:`, error);
      socket.emit("priceDataResponse", {
        statusCode: 500,
        productId: data.id,
        prices: [],
      });
    }
  });
});

server.listen(port, () => {
  console.log("Server is listening.");
});
