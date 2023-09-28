import express from "express";
import { Server, Socket } from "socket.io";
import http from "http";
import {
  initConnectionAndConsumeMatchingRequests,
  processMatchingRequest,
} from "./matching/Consumer.js";
import { initializeProducerConnection } from "./matching/Producer.js";
import cors from "cors";
import produceMessage from "./test/producer.js";
import { consumeMessage } from "./test/consumer.js";
import amqplib from "amqplib";
import { Queue } from "./queue.js";

const app = express();
const port = 3001;
const server = http.createServer(app);
const queue = new Queue();

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});
app.use(cors());

// Define a connection event for Socket.IO
io.on("connection", (socket) => {
  console.log("A user connected" + socket.id);
  console.log(queue.print());
  // Handle chat messages

  socket.on("queue", async (msg) => {
    console.log(msg);
    // Example usage:
    console.log(queue.size());
    if (queue.size() === 0) {
      //create room with first guy id
      console.log("adding to queue");
      queue.enqueue(socket.id);
      queue.print();
      socket.emit("queue", "you are in queueu");
    } else {
      const firstGuy = queue.dequeue();
      socket.emit("match", "you have matched");
      socket.to(firstGuy).emit("match", "you match with");
      //Emit to second guy
    }
  });

  socket.on("disconnect", async (msg) => {
    queue.remove(socket.id);
    queue.print();
  });

  socket.on("match", async (matchNotification) => {
    console.log("Match notification received:", matchNotification);
    processMatchingRequest(matchNotification);
    socket.emit("match", matchNotification); // Send match notification to the client
    await consumeMessage().then((msg) => {
      console.log("consume", msg);
      socket.emit("match", matchNotification); // Send match notification to the client
    });
  });

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log("A user disconnected", socket.id);
  });

  // socket.on("match", async (msg) => {
  //   console.log("match");
  //   await consumeMessage().then((msg) => {
  //     console.log("consume", msg);
  //     io.emit(msg);
  //   });
  // });

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
