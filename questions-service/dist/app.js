"use strict";
// connecting to server and database
// define microservice routes in another file to define the api endpoints
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// entry point of microservice which sets up web server, configures middleware, and defines routes
// listens on a port for incoming HTTP requests
// uses the routing logic from router.ts to handle requests made
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const router_1 = require("./router");
const cookieParser = require('cookie-parser');
const app = (0, express_1.default)();
app.use((0, cors_1.default)()); // Restricts API request from one domain to another domain
app.use(express_1.default.json()); // Parses incoming JSON data from HTTP requests
app.use(cookieParser());
app.use("/", router_1.questionsRouter); // Connects to the Questions Router
const PORT = Number(process.env.PORT) || 8000;
const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
