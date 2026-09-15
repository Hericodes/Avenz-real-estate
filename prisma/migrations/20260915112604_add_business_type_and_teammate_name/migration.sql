/*
  Warnings:

  - Added the required column `name` to the `TeammateSettings` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Business" ADD COLUMN     "businessType" TEXT;

-- AlterTable
ALTER TABLE "TeammateSettings" ADD COLUMN     "name" TEXT NOT NULL;
