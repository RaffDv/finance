"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.transactionSchema = void 0;
var zod_1 = __importDefault(require("zod"));
var transactionSchema = zod_1.default.object({
    id: zod_1.default.string(),
    createdAt: zod_1.default.string().datetime(),
    updatedAt: zod_1.default.string().datetime(),
    description: zod_1.default.string(),
    descriptionRaw: zod_1.default.string(),
    currencyCode: zod_1.default.enum(["BRL", "US"]),
    amount: zod_1.default.number(),
    category: zod_1.default.string(),
    categoryId: zod_1.default.string(),
    accountId: zod_1.default.string(),
    status: zod_1.default.string(),
    type: zod_1.default.enum(["DEBIT", "CREDIT"]),
    operationType: zod_1.default.enum(["PIX", "DEBIT", "CREDIT"]),
});
exports.transactionSchema = transactionSchema;
