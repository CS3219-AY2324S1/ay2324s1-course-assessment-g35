"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = require("dotenv");
const express_1 = __importDefault(require("express"));
const http_errors_1 = __importDefault(require("http-errors"));
const router_1 = require("./router");
const cookieParser = require("cookie-parser");
(0, dotenv_1.config)();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(cookieParser());
app.use("/", router_1.historyRouter);
// Catch invalid routes and create a 404 error
app.use((req, res, next) => {
    next(new http_errors_1.default.NotFound());
});
// Error handler middleware
const errorhandler = (err, req, res, next) => {
    res.status(500).send(err.message);
};
app.use(errorhandler);
const PORT = Number(process.env.PORT) || 8000;
const server = app.listen(PORT, () => {
    console.log(`The application is listening on port ${PORT}!`);
});
