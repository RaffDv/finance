-- CreateEnum
CREATE TYPE "PaymentTypes" AS ENUM ('PIX', 'DEBIT', 'CREDIT');

-- CreateEnum
CREATE TYPE "Currencies" AS ENUM ('BRL', 'US');

-- CreateTable
CREATE TABLE "Transaction" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "description" TEXT NOT NULL,
    "descriptionRaw" TEXT NOT NULL,
    "currencyCode" "Currencies" NOT NULL,
    "amoun" DOUBLE PRECISION NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "category" TEXT NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "accountId" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "type" "PaymentTypes" NOT NULL,
    "operationType" "PaymentTypes" NOT NULL,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);
