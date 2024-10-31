"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSchema = void 0;
var zod_1 = require("zod");
var userSchema = zod_1.z.object({
    name: zod_1.z.string(),
    username: zod_1.z.string(),
    password: zod_1.z.string(),
});
exports.userSchema = userSchema;
