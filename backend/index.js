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

app.post("/create", async (req, res) => {
  const { model, data } = req.body;

  // Validate the model
  if (model !== "User" || model !== "Item" || model !== "UserItem") {
    return res.status(400).json({ error: "Invalid model name" });
  }

  try {
    const record = await db.createRecord(model, data);
    res.status(201).json(record);
  } catch (error) {
    res.status(500).json({ error: "Error creating record" });
  }
});

app.post("/delete", async (req, res) => {
  const { model, data } = req.body;

  // Validate the model
  if (model !== "Post") {
    return res.status(400).json({ error: "Invalid model name" });
  }

  try {
    const record = await db.deleteRecord(model, data);
    res.status(201).json(record);
  } catch (error) {
    res.status(500).json({ error: "Error deleting record" });
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
