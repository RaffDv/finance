"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contract = void 0;
var core_1 = require("@ts-rest/core");
var zod_1 = require("zod");
var transaction_1 = require("./entities/transaction");
var user_1 = require("./entities/user");
var c = (0, core_1.initContract)();
var API_VERSION = "v1";
var successSchema = zod_1.z.object({
    message: zod_1.z.string(),
    data: zod_1.z.any().optional(),
});
var successNoRespSchema = zod_1.z.object({});
var badRequestSchema = zod_1.z.object({
    message: zod_1.z.string(),
    code: zod_1.z.string(),
});
exports.contract = c.router({
    expense: {
        getMonthExpansesFromApi: {
            method: "GET",
            path: "/expanse/api",
            responses: {
                200: zod_1.z.object({
                    message: zod_1.z.string(),
                }),
            },
            description: "fetch month expanses from pluggy SKD",
        },
        findAll: {
            method: "GET",
            path: "/expanse/:month",
            pathParams: zod_1.z.object({
                month: zod_1.z.string().refine(function (arg) { return /^(0[1-9]|1[0-2])$/.test(arg); }),
            }),
            responses: {
                200: zod_1.z.object({
                    message: zod_1.z.string(),
                    data: transaction_1.transactionSchema.array(),
                }),
            },
            description: "fetch month expanses from specific month (retrive from own DB)",
        },
    },
    user: {
        getUserProfile: {
            method: "GET",
            pathParams: zod_1.z.object({
                id: zod_1.z.string(),
            }),
            path: "/user/:id",
            responses: {
                200: successSchema,
                404: badRequestSchema,
            },
        },
    },
    auth: {
        register: {
            method: "POST",
            path: "/register",
            body: user_1.userSchema,
            responses: {
                201: successSchema,
                400: badRequestSchema,
                409: badRequestSchema,
                500: badRequestSchema,
            },
            description: "register an user on app",
        },
        login: {
            method: "POST",
            path: "/login",
            body: user_1.userSchema.omit({ name: true }),
            responses: {
                200: successSchema,
                400: badRequestSchema,
                401: badRequestSchema,
                500: badRequestSchema,
            },
        },
        refresh: {
            method: "POST",
            path: "/refresh",
            body: zod_1.z.object({}),
            responses: {
                200: successSchema,
            },
        },
    },
}, {
    pathPrefix: "/api/".concat(API_VERSION),
    strictStatusCode: true,
});
