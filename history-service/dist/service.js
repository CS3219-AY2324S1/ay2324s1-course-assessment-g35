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
exports.createHistoryRecord = exports.getAllHistory = exports.findHistoryByUserId = void 0;
const db_server_1 = __importDefault(require("./utils/db.server"));
const findHistoryByUserId = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_server_1.default.history.findMany({
        where: {
            OR: [{ user1: userId }, { user2: userId }],
        },
    });
});
exports.findHistoryByUserId = findHistoryByUserId;
const getAllHistory = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_server_1.default.history.findMany({});
});
exports.getAllHistory = getAllHistory;
const createHistoryRecord = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const newRecord = yield db_server_1.default.history.create({
        data: data,
    });
    return newRecord;
});
exports.createHistoryRecord = createHistoryRecord;
