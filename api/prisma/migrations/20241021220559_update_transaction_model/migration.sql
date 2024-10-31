/*
  Warnings:

  - You are about to drop the column `amoun` on the `Transaction` table. All the data in the column will be lost.
  - Added the required column `amount` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "amoun",
ADD COLUMN     "amount" DOUBLE PRECISION NOT NULL;
