const express = require("express");
const http = require("http");
const socketIO = require("socket.io");

const app = express();
const port = 3001;

const server = http.createServer(app);

const io = socketIO(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

//Middleware to parse JSON requests
app.use(express.json());

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
  console.log("Server is listening.");
});
