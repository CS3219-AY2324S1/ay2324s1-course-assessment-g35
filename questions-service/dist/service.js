"use strict";
// actual business logic for microservice - defines functions to handle specific operations
// interacts with database or other storage systems
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
exports.getRandomQuestionByTag = exports.getRandomQuestionByDifficulty = exports.getQuestionByName = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const questionModel_1 = require("./models/questionModel");
const mongoURI = "mongodb://localhost:27017/CS3219";
mongoose_1.default.connect(mongoURI, {});
const db = mongoose_1.default.connection;
const getQuestionByName = (name) => __awaiter(void 0, void 0, void 0, function* () {
    return yield questionModel_1.Question.find({ title: { $eq: name } });
});
exports.getQuestionByName = getQuestionByName;
const getRandomQuestionByDifficulty = (difficulty) => __awaiter(void 0, void 0, void 0, function* () {
    return yield questionModel_1.Question.aggregate([
        { $match: { difficulty: difficulty } },
        { $sample: { size: 1 } },
    ]);
});
exports.getRandomQuestionByDifficulty = getRandomQuestionByDifficulty;
const getRandomQuestionByTag = (tag) => __awaiter(void 0, void 0, void 0, function* () {
    return yield questionModel_1.Question.aggregate([
        { $match: { tags: tag } },
        { $sample: { size: 1 } },
    ]);
});
exports.getRandomQuestionByTag = getRandomQuestionByTag;
