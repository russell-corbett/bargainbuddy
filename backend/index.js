require('dotenv').config();
const jwt = require("jwt")
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
const users = require("./api/endpoints/user/userController");

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
  clientsConnected++;
  console.log(
    `New client connected ${socket.id}. Total Clients Connected: ${clientsConnected}`
  );

  socket.on("disconnect", () => {
    clientsConnected--;
    console.log(`Client has disconnected ${socket.id}`);
  });

  socket.on("addToWishlist", (data) => {
    bestBuyApiRef.searchBestBuy(data.modelNumber);
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
});

server.listen(port, () => {
  console.log("Server is listening.");
});
