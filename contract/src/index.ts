import { initContract } from "@ts-rest/core";
import { z } from "zod";
import { transactionSchema } from "./entities/transaction";
import { userSchema } from "./entities/user";

const c = initContract();
const API_VERSION = "v1";

const successSchema = z.object({
  message: z.string(),
  data: z.any().optional(),
});
const successNoRespSchema = z.object({});

const badRequestSchema = z.object({
  message: z.string(),
  code: z.string(),
});

export const contract = c.router(
  {
    expense: {
      getMonthExpansesFromApi: {
        method: "GET",
        path: "/expanse/api",
        responses: {
          200: z.object({
            message: z.string(),
          }),
        },
        description: "fetch month expanses from pluggy SKD",
      },
      findAll: {
        method: "GET",
        path: "/expanse/:month",
        pathParams: z.object({
          month: z.string().refine((arg) => /^(0[1-9]|1[0-2])$/.test(arg)),
        }),
        responses: {
          200: z.object({
            message: z.string(),
            data: transactionSchema.array(),
          }),
        },
        description:
          "fetch month expanses from specific month (retrive from own DB)",
      },
    },
    user: {
      getUserProfile: {
        method: "GET",
        pathParams: z.object({
          id: z.string(),
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
        body: userSchema,
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
        body: userSchema.omit({ name: true }),
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
        body: z.object({}),
        responses: {
          200: successSchema,
        },
      },
    },
  },
  {
    pathPrefix: `/api/${API_VERSION}`,
    strictStatusCode: true,
  },
);
