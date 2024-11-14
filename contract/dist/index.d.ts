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
            description: "fetch month expanses from specific month (retrive from own DB)";
            pathParams: z.ZodObject<{
                month: z.ZodEffects<z.ZodString, string, string>;
            }, "strip", z.ZodTypeAny, {
                month: string;
            }, {
                month: string;
            }>;
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
                        id: string;
                        createdAt: string;
                        updatedAt: string;
                        description: string;
                        descriptionRaw: string;
                        currencyCode: "BRL" | "US";
                        status: string;
                        type: "DEBIT" | "CREDIT";
                        amount: number;
                        category: string;
                        categoryId: string;
                        accountId: string;
                        operationType: "DEBIT" | "CREDIT" | "PIX";
                    }, {
                        id: string;
                        createdAt: string;
                        updatedAt: string;
                        description: string;
                        descriptionRaw: string;
                        currencyCode: "BRL" | "US";
                        status: string;
                        type: "DEBIT" | "CREDIT";
                        amount: number;
                        category: string;
                        categoryId: string;
                        accountId: string;
                        operationType: "DEBIT" | "CREDIT" | "PIX";
                    }>, "many">;
                }, "strip", z.ZodTypeAny, {
                    message: string;
                    data: {
                        id: string;
                        createdAt: string;
                        updatedAt: string;
                        description: string;
                        descriptionRaw: string;
                        currencyCode: "BRL" | "US";
                        status: string;
                        type: "DEBIT" | "CREDIT";
                        amount: number;
                        category: string;
                        categoryId: string;
                        accountId: string;
                        operationType: "DEBIT" | "CREDIT" | "PIX";
                    }[];
                }, {
                    message: string;
                    data: {
                        id: string;
                        createdAt: string;
                        updatedAt: string;
                        description: string;
                        descriptionRaw: string;
                        currencyCode: "BRL" | "US";
                        status: string;
                        type: "DEBIT" | "CREDIT";
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
    user: {
        getUserProfile: {
            pathParams: z.ZodObject<{
                id: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                id: string;
            }, {
                id: string;
            }>;
            method: "GET";
            path: "/api/v1/user/:id";
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
                404: z.ZodObject<{
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
        refresh: {
            method: "POST";
            body: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
            path: "/api/v1/refresh";
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
            };
        };
    };
};
