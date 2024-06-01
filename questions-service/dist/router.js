"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.questionsRouter = void 0;
// defines routes and corresponding handlers for microservice
const express_1 = __importDefault(require("express"));
const service_1 = require("./service");
exports.questionsRouter = express_1.default.Router();
exports.questionsRouter.get("/name", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const name = req.query.name;
        const questionByName = yield (0, service_1.getQuestionByName)(name);
        return res.status(200).json(questionByName);
    }
    catch (error) {
        return res.status(500).json(error.message);
    }
}));
exports.questionsRouter.get("/random/difficulty", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const difficulty = req.query.difficulty;
        const randomQuestionByDifficulty = yield (0, service_1.getRandomQuestionByDifficulty)(difficulty);
        return res.status(200).json(randomQuestionByDifficulty);
    }
    catch (error) {
        return res.status(500).json(error.message);
    }
}));
exports.questionsRouter.get("/random/tag", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tag = req.query.tag;
        const randomQuestionByTag = yield (0, service_1.getRandomQuestionByTag)(tag);
        return res.status(200).json(randomQuestionByTag);
    }
    catch (error) {
        return res.status(500).json(error.message);
    }
}));
