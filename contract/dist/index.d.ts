import { z } from "zod";
export declare const contract: {
    expense: {
        getMonthExpansesFromApi: {
            description: "fetch month expanses from pluggy SKD";
            method: "GET";
            path: "/api/v1/expanse/api";
            responses: {
                200: z.ZodObject<{
                    message: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    message: string;
                }, {
                    message: string;
                }>;
            };
        };
        findAll: {
            pathParams: z.ZodObject<{
                month: z.ZodEffects<z.ZodString, string, string>;
            }, "strip", z.ZodTypeAny, {
                month: string;
            }, {
                month: string;
            }>;
            description: "fetch month expanses from specific month (retrive from own DB)";
            method: "GET";
            path: "/api/v1/expanse/:month";
            responses: {
                200: z.ZodObject<{
                    message: z.ZodString;
                    data: z.ZodArray<z.ZodObject<{
                        id: z.ZodString;
                        createdAt: z.ZodString;
                        updatedAt: z.ZodString;
                        description: z.ZodString;
                        descriptionRaw: z.ZodString;
                        currencyCode: z.ZodEnum<["BRL", "US"]>;
                        amount: z.ZodNumber;
                        category: z.ZodString;
                        categoryId: z.ZodString;
                        accountId: z.ZodString;
                        status: z.ZodString;
                        type: z.ZodEnum<["DEBIT", "CREDIT"]>;
                        operationType: z.ZodEnum<["PIX", "DEBIT", "CREDIT"]>;
                    }, "strip", z.ZodTypeAny, {
                        description: string;
                        type: "DEBIT" | "CREDIT";
                        status: string;
                        id: string;
                        createdAt: string;
                        updatedAt: string;
                        descriptionRaw: string;
                        currencyCode: "BRL" | "US";
                        amount: number;
                        category: string;
                        categoryId: string;
                        accountId: string;
                        operationType: "DEBIT" | "CREDIT" | "PIX";
                    }, {
                        description: string;
                        type: "DEBIT" | "CREDIT";
                        status: string;
                        id: string;
                        createdAt: string;
                        updatedAt: string;
                        descriptionRaw: string;
                        currencyCode: "BRL" | "US";
                        amount: number;
                        category: string;
                        categoryId: string;
                        accountId: string;
                        operationType: "DEBIT" | "CREDIT" | "PIX";
                    }>, "many">;
                }, "strip", z.ZodTypeAny, {
                    message: string;
                    data: {
                        description: string;
                        type: "DEBIT" | "CREDIT";
                        status: string;
                        id: string;
                        createdAt: string;
                        updatedAt: string;
                        descriptionRaw: string;
                        currencyCode: "BRL" | "US";
                        amount: number;
                        category: string;
                        categoryId: string;
                        accountId: string;
                        operationType: "DEBIT" | "CREDIT" | "PIX";
                    }[];
                }, {
                    message: string;
                    data: {
                        description: string;
                        type: "DEBIT" | "CREDIT";
                        status: string;
                        id: string;
                        createdAt: string;
                        updatedAt: string;
                        descriptionRaw: string;
                        currencyCode: "BRL" | "US";
                        amount: number;
                        category: string;
                        categoryId: string;
                        accountId: string;
                        operationType: "DEBIT" | "CREDIT" | "PIX";
                    }[];
                }>;
            };
        };
    };
    user: {};
    auth: {
        register: {
            description: "register an user on app";
            method: "POST";
            body: z.ZodObject<{
                name: z.ZodString;
                username: z.ZodString;
                password: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                name: string;
                username: string;
                password: string;
            }, {
                name: string;
                username: string;
                password: string;
            }>;
            path: "/api/v1/register";
            responses: {
                201: z.ZodObject<{
                    message: z.ZodString;
                    data: z.ZodOptional<z.ZodAny>;
                }, "strip", z.ZodTypeAny, {
                    message: string;
                    data?: any;
                }, {
                    message: string;
                    data?: any;
                }>;
                400: z.ZodObject<{
                    message: z.ZodString;
                    code: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    code: string;
                    message: string;
                }, {
                    code: string;
                    message: string;
                }>;
                409: z.ZodObject<{
                    message: z.ZodString;
                    code: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    code: string;
                    message: string;
                }, {
                    code: string;
                    message: string;
                }>;
                500: z.ZodObject<{
                    message: z.ZodString;
                    code: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    code: string;
                    message: string;
                }, {
                    code: string;
                    message: string;
                }>;
            };
        };
        login: {
            method: "POST";
            body: z.ZodObject<Omit<{
                name: z.ZodString;
                username: z.ZodString;
                password: z.ZodString;
            }, "name">, "strip", z.ZodTypeAny, {
                username: string;
                password: string;
            }, {
                username: string;
                password: string;
            }>;
            path: "/api/v1/login";
            responses: {
                200: z.ZodObject<{
                    message: z.ZodString;
                    data: z.ZodOptional<z.ZodAny>;
                }, "strip", z.ZodTypeAny, {
                    message: string;
                    data?: any;
                }, {
                    message: string;
                    data?: any;
                }>;
                400: z.ZodObject<{
                    message: z.ZodString;
                    code: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    code: string;
                    message: string;
                }, {
                    code: string;
                    message: string;
                }>;
                401: z.ZodObject<{
                    message: z.ZodString;
                    code: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    code: string;
                    message: string;
                }, {
                    code: string;
                    message: string;
                }>;
                500: z.ZodObject<{
                    message: z.ZodString;
                    code: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    code: string;
                    message: string;
                }, {
                    code: string;
                    message: string;
                }>;
            };
        };
    };
};
