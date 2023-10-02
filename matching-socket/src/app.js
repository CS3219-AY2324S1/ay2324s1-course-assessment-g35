import express from "express";
import { Server, Socket } from "socket.io";
import http from "http";
import cors from "cors";
import { Queue } from "./queue.js";
import authenticateSocket from "./middleware/authenticateSocket.js";

const app = express();
const port = 3001;
const server = http.createServer(app);
const easyQueue = new Queue();
const mediumQueue = new Queue();
const hardQueue = new Queue();

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});
app.use(cors());

io.use(authenticateSocket); // Use the authentication middleware

// Define a connection event for Socket.IO
io.on("connection", (socket) => {
  console.log(`Socket connected with user: ${socket.decoded.username}`);
  // Handle chat messages
  socket.on("queue", async (msg) => {
    let queue = easyQueue;
    if (msg.difficulty == "Easy") {
      queue = easyQueue;
    } else if (msg.difficulty == "Medium") {
      queue = mediumQueue;
    } else {
      queue = hardQueue;
    }
    if (queue.size() === 0) {
      //create room with first guy id
      const obj = {
        id: socket.id,
        name: "test",
      };
      queue.enqueue(socket.id);
      queue.print();
      socket.emit("queue", "you are in queueu");
    } else {
      const firstGuy = queue.dequeue();
      socket.emit("match", "you have matched");
      socket.to(firstGuy).emit("match", "you match with");
    }
  });

  socket.on("disconnect", async (msg) => {
    // queue.remove(socket.id);
  });

  // Handle user cancel matching
  socket.on("leave", (msg) => {
    if (msg.difficulty == "Easy") {
      easyQueue.remove(socket.id);
    } else if (msg.difficulty == "Medium") {
      mediumQueue.remove(socket.id);
    } else {
      hardQueue.remove(socket.id);
    }
    console.log("A user disconnected", socket.id);
  });
});

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
