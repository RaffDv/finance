import z from "zod";

const transactionSchema = z.object({
  id: z.string(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  description: z.string(),
  descriptionRaw: z.string(),
  currencyCode: z.enum(["BRL", "US"]),
  amount: z.number(),
  category: z.string(),
  categoryId: z.string(),
  accountId: z.string(),
  status: z.string(),
  type: z.enum(["DEBIT", "CREDIT"]),
  operationType: z.enum(["PIX", "DEBIT", "CREDIT"]),
});

type transactionType = z.infer<typeof transactionSchema>;

export { transactionSchema, type transactionType };
