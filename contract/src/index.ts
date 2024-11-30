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
    expense: {},
    user: {},
    auth: {},
  },
  {
    pathPrefix: `/api/${API_VERSION}`,
    strictStatusCode: true,
  },
);
